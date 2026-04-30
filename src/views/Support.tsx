import { useState } from 'react';
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
  ArrowRight
} from 'lucide-react';

export default function Support() {
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      type: 'bot', 
      text: "Hello! I'm the DemocracyAssist AI. I can help you with voter registration, polling locations, ballot tracking, and using the dashboard. How can I assist you today?" 
    },
    { 
      id: 2, 
      type: 'user', 
      text: "How do I register?" 
    },
    { 
      id: 3, 
      type: 'bot', 
      isSimplified: true,
      text: "Registering is easy. You can do it online or in person.\n\n1. Check if you are eligible (usually 18+ and a citizen).\n2. Gather your ID.\n3. Fill out the form on our official portal." 
    }
  ]);

  const [input, setInput] = useState("");

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
          </div>

          {/* Chat Canvas */}
          <div className="flex-1 overflow-y-auto p-8 flex flex-col gap-8 bg-slate-50 no-scrollbar">
            {messages.map((msg) => (
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
                    <div className="whitespace-pre-line">{msg.text}</div>
                    {msg.isSimplified && (
                      <div className="mt-6 pt-6 border-t-2 border-black/10 flex flex-col gap-3">
                        <button className="text-black hover:underline flex items-center gap-2 text-xs font-black uppercase tracking-widest">
                          Registration Portal <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-6 border-t-2 border-black bg-white">
            <div className="relative flex items-center">
              <input 
                className="w-full bg-slate-100 border-2 border-black rounded-2xl pl-6 pr-16 py-4 text-sm font-bold focus:outline-none focus:ring-0 transition-all"
                placeholder="Type your question here..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button 
                className="absolute right-2 bg-black text-white p-3 rounded-xl hover:scale-95 transition-transform"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            <div className="flex gap-2 mt-6 overflow-x-auto no-scrollbar pb-1">
              <Chip label="Verify ballot" />
              <Chip label="Reset password" />
              <Chip label="Export list" />
            </div>
          </div>
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

function Chip({ label }: { label: string }) {
  return (
    <button className="text-[10px] bento-button px-4 py-2 shadow-none hover:shadow-none hover:bg-slate-800">
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


