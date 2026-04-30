import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bot, 
  Send, 
  Search, 
  User, 
  CheckCircle2, 
  ChevronRight, 
  Expand, 
  BookOpen, 
  Video, 
  ExternalLink,
  ShieldCheck,
  Calendar,
  Contact2,
  ChevronDown,
  ArrowRight,
  Loader2
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { useUI } from '../context/UIContext';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

export default function Support() {
  const { isSimplifiedMode } = useUI();
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      type: 'bot', 
      text: "Hello! I'm the DemocracyAssist AI. I can help you with voter registration, polling locations, ballot tracking, and using the dashboard. How can I assist you today?" 
    }
  ]);

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async (text: string = input) => {
    if (!text.trim() || isLoading) return;

    const userMessage = { id: Date.now(), type: 'user', text };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          { role: 'user', parts: [{ text: text }] }
        ],
        config: {
          systemInstruction: `
            You are DemocracyAssist AI, a helpful companion for the 2024 Election Cycle.
            Your goal is to provide clear, reliable, and accessible information about:
            - Voter registration (eligibility, methods, IDs)
            - Election timelines and deadlines
            - Nomination processes
            - Campaigning rules
            - Voting methods (absentee, early, day-of)
            - Counting and results transparency

            ${isSimplifiedMode ? 'The user is in "Focus Mode". Provide EXTREMELY simplified, easy-to-read, and encouraging responses. Use 3rd grade vocabulary level. Bold key terms.' : 'Provide professional, authoritative, and detailed responses.'}

            Keep responses concise. If you don't know something about a specific local law, direct them to verify with their local board of elections.
          `
        }
      });

      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        text: response.text || "I'm sorry, I couldn't process that request.",
        isSimplified: isSimplifiedMode
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        type: 'bot',
        text: "I'm having trouble connecting to my knowledge base. Please try again in a moment."
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col gap-12">
      <div className="max-w-2xl">
        <h1 className="text-6xl font-black italic tracking-tighter mb-4">Support Center</h1>
        <p className="text-xl text-on-surface-variant leading-relaxed font-medium">
          Get help with election processes, registration, and platform navigation. 
          Ask our assistant or browse frequently asked questions.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Chatbot Column */}
        <section className="lg:col-span-7 flex flex-col h-[750px] bento-card-lg bg-white overflow-hidden">
          {/* Chat Header */}
          <div className="p-6 border-b-2 border-black flex justify-between items-center bg-white">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-black shadow-bento flex items-center justify-center">
                <Bot className="w-7 h-7 text-white" />
              </div>
              <div>
                <h2 className="font-black text-lg tracking-tight leading-none italic">Election Assistant</h2>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Ready</span>
                </div>
              </div>
            </div>
            {isSimplifiedMode && (
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest bg-accent-green/30 py-2 px-4 rounded-xl border-2 border-black">
                <ShieldCheck className="w-4 h-4" /> Focus Mode Active
              </div>
            )}
          </div>

          {/* Chat Canvas */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 flex flex-col gap-8 bg-slate-50 no-scrollbar scroll-smooth">
            {messages.map((msg: any) => (
              <div key={msg.id} className={`flex gap-4 max-w-[90%] ${msg.type === 'user' ? 'self-end flex-row-reverse' : ''}`}>
                <div className={`w-10 h-10 rounded-xl border-2 border-black flex items-center justify-center shrink-0 mt-1 shadow-bento ${msg.type === 'bot' ? 'bg-accent-green' : 'bg-accent-purple'}`}>
                  {msg.type === 'bot' ? <Bot className="w-6 h-6 text-black" /> : <User className="w-6 h-6 text-black" />}
                </div>
                
                <div className="flex flex-col gap-2">
                  <div 
                    className={`p-6 bento-card text-sm font-bold leading-relaxed ${
                      msg.type === 'bot' 
                        ? 'bg-white text-black' 
                        : 'bg-black text-white shadow-none'
                    }`}
                  >
                    {msg.isSimplified && (
                      <div className="flex items-center gap-2 mb-4 text-xs font-black uppercase tracking-widest bg-accent-green/50 py-1.5 px-3 rounded-lg border-2 border-black w-fit">
                        Simplified Interface
                      </div>
                    )}
                    <div className="whitespace-pre-line prose prose-sm max-w-none prose-p:my-0">{msg.text}</div>
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-4 max-w-[90%]">
                <div className="w-10 h-10 rounded-xl border-2 border-black bg-accent-green flex items-center justify-center shrink-0 mt-1 shadow-bento">
                  <Bot className="w-6 h-6 text-black" />
                </div>
                <div className="p-6 bento-card bg-white text-black flex items-center gap-3">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-xs font-black uppercase tracking-widest">Assistant is thinking...</span>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            className="p-6 border-t-2 border-black bg-white"
          >
            <div className="relative flex items-center">
              <input 
                className="w-full bg-slate-100 border-2 border-black rounded-2xl pl-6 pr-16 py-4 text-sm font-bold focus:outline-none focus:ring-0 transition-all focus:bg-white"
                placeholder="Type your question here..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
              />
              <button 
                type="submit"
                disabled={isLoading || !input.trim()}
                className="absolute right-2 bg-black text-white p-3 rounded-xl hover:scale-95 transition-transform disabled:opacity-50 disabled:hover:scale-100"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            <div className="flex gap-2 mt-6 overflow-x-auto no-scrollbar pb-1">
              <Chip label="How to register?" onClick={() => handleSend("How do I register to vote?")} />
              <Chip label="Voting deadlines" onClick={() => handleSend("What are the important election deadlines?")} />
              <Chip label="Security info" onClick={() => handleSend("Tell me about voting security and machine safety.")} />
            </div>
          </form>
        </section>

        {/* FAQ Column */}
        <section className="lg:col-span-5 flex flex-col gap-8">
          {/* Search Box */}
          <div className="bg-accent-yellow bento-card p-8">
            <h3 className="text-2xl font-black italic mb-6">Browse FAQs</h3>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-black w-6 h-6" />
              <input 
                className="w-full bg-white border-2 border-black rounded-2xl pl-12 pr-4 py-4 text-sm font-bold focus:ring-0"
                placeholder="Search knowledge base..."
              />
            </div>
          </div>

          {/* Accordion Categories */}
          <div className="flex flex-col gap-4">
            <AccordionItem 
              icon={ShieldCheck} 
              color="bg-accent-green"
              title="Voting Security" 
              open
            >
              <div className="space-y-4 pt-4">
                <FAQCard 
                  title="How is my ballot kept secret?" 
                  excerpt="Your ballot is separated from your identity immediately. Advanced cryptographic protocols ensure..."
                />
                <FAQCard 
                  title="Are machines secure?" 
                  excerpt="Yes, all machines undergo rigorous pre-election testing, are completely air-gapped..."
                />
              </div>
            </AccordionItem>
            <AccordionItem 
              icon={Calendar} 
              color="bg-accent-purple"
              title="Election Deadlines" 
            />
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-2 gap-4">
            <QuickLinkCard icon={BookOpen} label="Manuals" color="bg-white" />
            <QuickLinkCard icon={Video} label="Tutorials" color="bg-white" />
          </div>
        </section>
      </div>
    </div>
  );
}

function Chip({ label, onClick }: { label: string, onClick?: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="text-[10px] bento-button px-4 py-2 shadow-none hover:shadow-none hover:bg-slate-800"
    >
      {label}
    </button>
  );
}

function AccordionItem({ icon: Icon, title, color, children, open = false }: any) {
  const [isOpen, setIsOpen] = useState(open);

  return (
    <div className="bg-white bento-card overflow-hidden group">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-6 flex items-center justify-between hover:bg-slate-50 transition-colors"
      >
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-xl border-2 border-black ${color} flex items-center justify-center shadow-bento`}>
            <Icon className="w-6 h-6 text-black" />
          </div>
          <span className="text-xl font-black italic">{title}</span>
        </div>
        <ChevronDown className={`w-6 h-6 text-black transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-8">
              <div className="h-0.5 bg-black/5 mb-6"></div>
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FAQCard({ title, excerpt }: any) {
  return (
    <div className="p-6 rounded-2xl border-2 border-black bg-slate-50 hover:bg-white transition-colors cursor-pointer group active:translate-y-1">
      <h4 className="text-base font-black italic mb-2 group-hover:underline">{title}</h4>
      <p className="text-sm text-on-surface-variant font-medium leading-relaxed line-clamp-2">{excerpt}</p>
    </div>
  );
}

function QuickLinkCard({ icon: Icon, label, color }: any) {
  return (
    <button className={`${color} bento-card p-8 flex flex-col items-center gap-4 group h-full`}>
      <div className="w-16 h-16 rounded-2xl bg-black text-white flex items-center justify-center shadow-bento transition-transform group-hover:scale-110">
        <Icon className="w-8 h-8" />
      </div>
      <span className="text-xs font-black uppercase tracking-widest">{label}</span>
    </button>
  );
}


