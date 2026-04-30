import { useState, useEffect } from 'react';
import { 
  collection, 
  query, 
  where, 
  orderBy, 
  onSnapshot, 
  addDoc, 
  serverTimestamp,
  deleteDoc,
  doc
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { useAuth } from '../context/AuthContext';
import { MessageSquare, Send, Trash2, User as UserIcon, Clock, CornerDownRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Comment {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  text: string;
  createdAt: any;
  sectionId: string;
  parentId?: string | null;
}

export default function Comments({ sectionId }: { sectionId: string }) {
  const { user, signInWithGoogle } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [replyTo, setReplyTo] = useState<Comment | null>(null);

  useEffect(() => {
    const q = query(
      collection(db, 'comments'),
      where('sectionId', '==', sectionId),
      orderBy('createdAt', 'asc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Comment[];
      setComments(docs);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'comments');
    });

    return () => unsubscribe();
  }, [sectionId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !newComment.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'comments'), {
        authorId: user.uid,
        authorName: user.displayName || 'Anonymous',
        authorAvatar: user.photoURL || '',
        text: newComment.trim(),
        createdAt: serverTimestamp(),
        sectionId,
        parentId: replyTo?.id || null
      });
      setNewComment('');
      setReplyTo(null);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'comments');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (commentId: string) => {
    if (!confirm('Are you sure you want to delete this comment?')) return;
    try {
      await deleteDoc(doc(db, 'comments', commentId));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `comments/${commentId}`);
    }
  };

  const topLevelComments = comments.filter(c => !c.parentId);
  const getReplies = (parentId: string) => comments.filter(c => c.parentId === parentId);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-accent-purple border-2 border-black shadow-bento flex items-center justify-center">
            <MessageSquare className="w-6 h-6 text-black" />
          </div>
          <h3 className="text-2xl font-black italic">Discussion</h3>
        </div>
        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{comments.length} Comments</span>
      </div>

      {!user ? (
        <div className="bento-card bg-slate-50 p-8 text-center">
          <p className="text-sm font-bold mb-4">You must be signed in to join the discussion.</p>
          <button onClick={signInWithGoogle} className="bento-button mx-auto">
            Sign In with Google
          </button>
        </div>
      ) : !user.emailVerified ? (
        <div className="bento-card bg-accent-yellow/30 p-8 text-center border-dashed">
          <p className="text-sm font-bold mb-2">Email Verification Required</p>
          <p className="text-xs text-slate-500 mb-4">Please verify your email address to join the conversation and prevent community spam.</p>
          <button disabled className="bento-button-outline opacity-50 cursor-not-allowed">
            Account Not Verified
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="relative flex flex-col gap-3">
          {replyTo && (
            <div className="flex items-center justify-between bg-accent-purple/10 border-2 border-black p-3 rounded-xl mb-1">
              <div className="flex items-center gap-2 text-xs font-bold truncate">
                <CornerDownRight className="w-4 h-4" />
                Replying to <span className="italic">@{replyTo.authorName}</span>
              </div>
              <button 
                type="button"
                onClick={() => setReplyTo(null)}
                className="p-1 hover:bg-black/5 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
          <div className="relative">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder={replyTo ? `Write a reply...` : "Share your thoughts or questions..."}
              className="w-full bg-slate-50 border-2 border-black rounded-3xl p-6 pr-16 min-h-[120px] focus:ring-0 text-sm font-bold placeholder:text-slate-400 transition-all focus:bg-white resize-none"
            />
            <button 
              type="submit"
              disabled={!newComment.trim() || isSubmitting}
              className="absolute bottom-4 right-4 bg-black text-white p-3 rounded-2xl shadow-bento hover:scale-95 disabled:opacity-50 disabled:scale-100 disabled:shadow-none transition-all"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </form>
      )}

      <div className="space-y-6">
        <AnimatePresence initial={false}>
          {topLevelComments.length > 0 ? (
            topLevelComments.map((comment) => (
              <div key={comment.id} className="flex flex-col gap-4">
                <CommentCard 
                  comment={comment} 
                  onReply={() => setReplyTo(comment)} 
                  onDelete={() => handleDelete(comment.id)}
                  isUser={user?.uid === comment.authorId}
                />
                
                {/* Replies */}
                <div className="pl-8 sm:pl-12 space-y-4">
                  {getReplies(comment.id).map(reply => (
                    <CommentCard 
                      key={reply.id} 
                      comment={reply}
                      onDelete={() => handleDelete(reply.id)}
                      isUser={user?.uid === reply.authorId}
                      isReply
                    />
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="py-12 text-center text-slate-400">
              <p className="text-xs font-black uppercase tracking-widest">No comments yet. Be the first!</p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function CommentCard({ comment, onReply, onDelete, isUser, isReply = false }: any) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={`bento-card bg-white p-5 relative overflow-hidden ${isReply ? 'border-dashed' : ''}`}
    >
      <div className="flex gap-4 items-start">
        {comment.authorAvatar ? (
          <img src={comment.authorAvatar} alt="" className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl border-2 border-black shadow-bento shrink-0" referrerPolicy="no-referrer" />
        ) : (
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-slate-100 border-2 border-black shadow-bento flex items-center justify-center shrink-0">
            <UserIcon className="w-4 h-4 sm:w-5 sm:h-5 text-slate-300" />
          </div>
        )}
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h4 className="font-black italic text-xs sm:text-sm truncate">{comment.authorName}</h4>
            <div className="flex items-center gap-2">
              {onReply && (
                <button 
                  onClick={onReply}
                  className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-black transition-colors"
                >
                  Reply
                </button>
              )}
              {isUser && (
                <button 
                  onClick={onDelete}
                  className="p-1.5 text-slate-300 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
          <p className="text-xs sm:text-sm font-medium text-on-surface-variant leading-relaxed break-words">
            {comment.text}
          </p>
          <div className="mt-3 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-300">
            <Clock className="w-3 h-3" />
            {comment.createdAt?.toDate ? comment.createdAt.toDate().toLocaleDateString() : 'Just now'}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
