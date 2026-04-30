import { Globe, ArrowRight, MapPin, Route, MessageSquare } from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';

export default function Onboarding() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center py-16 gap-16">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center w-full max-w-4xl"
      >
        <h1 className="text-[5rem] font-black italic tracking-tighter leading-none mb-8">
          Clear Path to <span className="text-secondary">Voter Action</span>
        </h1>
        <p className="text-2xl text-on-surface-variant max-w-2xl mx-auto leading-tight font-medium italic underline decoration-secondary decoration-4 underline-offset-4">
          Navigate complexities with confidence. tailored guidance and verified resources.
        </p>
      </motion.div>

      {/* Region Selection Form */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bento-card-lg bg-white p-10 max-w-xl w-full"
      >
        <div className="h-4 bg-accent-yellow w-full border-b-2 border-black -mt-10 -mx-10 mb-10"></div>
        <label className="block text-xs font-black uppercase tracking-widest text-black/40 mb-4" htmlFor="region-select">
          Select Your Region
        </label>
        <div className="relative mb-8">
          <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-black w-6 h-6 pointer-events-none" />
          <select 
            id="region-select"
            className="w-full bg-slate-50 border-2 border-black text-black font-black italic rounded-2xl pl-12 pr-12 py-5 focus:ring-0 transition-all appearance-none cursor-pointer text-lg"
            defaultValue=""
          >
            <option disabled value="">Choose a region...</option>
            <option value="us">United States</option>
            <option value="uk">United Kingdom</option>
            <option value="ca">Canada</option>
            <option value="au">Australia</option>
            <option value="eu">European Union</option>
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
            <ArrowRight className="w-6 h-6 rotate-90" />
          </div>
        </div>
        
        <button 
          onClick={() => navigate('/timeline')}
          className="bento-button w-full py-5 text-lg flex items-center justify-center gap-3"
        >
          <span>Get Started</span>
          <ArrowRight className="w-6 h-6" />
        </button>
      </motion.div>

      {/* How It Works Section */}
      <div className="w-full max-w-6xl">
        <h2 className="text-3xl font-black italic text-center mb-12">System Architecture</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <StepCard 
            number="1"
            title="Locate Region"
            description="Tell us where you are voting to load the specific rules, deadlines, and requirements for your jurisdiction."
            icon={MapPin}
            accent="bg-accent-purple"
          />
          <StepCard 
            number="2"
            title="Follow Guide"
            description="Navigate through a clear, step-by-step timeline of the election process, from registration to counting."
            icon={Route}
            accent="bg-accent-green"
          />
          <StepCard 
            number="3"
            title="Get Support"
            description="Use our dedicated assistant to clarify complex terms or find specific official resources quickly."
            icon={MessageSquare}
            accent="bg-accent-yellow"
          />
        </div>
      </div>
    </div>
  );
}

function StepCard({ number, title, description, icon: Icon, accent }: any) {
  return (
    <motion.div 
      className="bento-card bg-white p-8 group flex flex-col items-center text-center h-full"
    >
      <div className={`w-16 h-16 rounded-2xl ${accent} border-2 border-black shadow-bento flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
        <Icon className="w-8 h-8 text-black" />
      </div>
      <div className="mb-4">
        <span className="text-[10px] font-black uppercase tracking-widest text-black/40 block mb-2">Step {number}</span>
        <h3 className="text-2xl font-black italic leading-tight">{title}</h3>
      </div>
      <p className="text-on-surface-variant font-medium leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}
