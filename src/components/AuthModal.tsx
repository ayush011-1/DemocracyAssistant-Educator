import { useState } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  updateProfile 
} from 'firebase/auth';
import { auth } from '../lib/firebase';
import { X, Mail, Lock, User, Github } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../context/AuthContext';

export default function AuthModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signInWithGoogle } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isSignUp) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName });
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      onClose();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="auth-title"
            className="w-full max-w-md bg-white bento-card-lg p-8 relative z-10"
          >
            <div className="h-4 bg-accent-yellow -mt-8 -mx-8 mb-8 border-b-2 border-black rounded-t-[30px]"></div>
            
            <button 
              onClick={onClose} 
              aria-label="Close modal"
              className="absolute top-4 right-4 p-2 hover:bg-slate-100 rounded-xl transition-colors focus:ring-2 focus:ring-black outline-none"
            >
              <X className="w-6 h-6" />
            </button>

            <h2 id="auth-title" className="text-4xl font-black italic mb-2">{isSignUp ? 'Join Us' : 'Welcome Back'}</h2>
            <p className="text-sm font-medium text-slate-500 mb-8">
              {isSignUp ? 'Create your profile to join the conversation.' : 'Sign in to access your voter dashboard.'}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 mb-8">
              {isSignUp && (
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Full Name"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    required
                    className="w-full bg-slate-50 border-2 border-black rounded-2xl pl-12 pr-4 py-4 font-bold text-sm focus:ring-0"
                  />
                </div>
              )}
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input 
                  type="email" 
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-slate-50 border-2 border-black rounded-2xl pl-12 pr-4 py-4 font-bold text-sm focus:ring-0"
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input 
                  type="password" 
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-slate-50 border-2 border-black rounded-2xl pl-12 pr-4 py-4 font-bold text-sm focus:ring-0"
                />
              </div>

              {error && <p className="text-xs font-black text-red-500 italic uppercase tracking-widest">{error}</p>}

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bento-button py-4 text-base flex justify-center"
              >
                {loading ? 'Processing...' : (isSignUp ? 'Create Account' : 'Sign In')}
              </button>
            </form>

            <div className="flex items-center gap-4 mb-8">
              <div className="flex-1 h-0.5 bg-black/5"></div>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">or use social</span>
              <div className="flex-1 h-0.5 bg-black/5"></div>
            </div>

            <div className="grid grid-cols-1 gap-3">
              <button 
                onClick={signInWithGoogle}
                className="bento-button-outline w-full py-4 flex items-center justify-center gap-3 text-sm"
              >
                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5" alt="" />
                Continue with Google
              </button>
            </div>

            <p className="mt-8 text-center text-xs font-bold text-slate-400">
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}
              <button 
                onClick={() => setIsSignUp(!isSignUp)}
                className="ml-2 text-black hover:underline"
              >
                {isSignUp ? 'Sign In' : 'Sign Up'}
              </button>
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
