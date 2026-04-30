import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, 
  Info, 
  ArrowLeft, 
  ArrowRight, 
  HelpCircle,
  Clock,
  MapPin,
  Search,
  ChevronRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Comments from '../components/Comments';

export default function Registration() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isSimplified, setIsSimplified] = useState(true);

  return (
    <div className="w-full">
      {/* Progress Bar Top */}
      <div className="w-full h-4 bg-slate-100 border-b-2 border-black overflow-hidden sticky top-0 z-30">
        <motion.div 
          initial={{ width: "0%" }}
          animate={{ width: `${(step / 3) * 100}%` }}
          className="h-full bg-secondary border-r-2 border-black"
        />
      </div>

      <div className="max-w-[1000px] mx-auto px-6 py-12 flex flex-col md:flex-row gap-8">
        {/* Navigation Stepper (Left) */}
        <div className="hidden md:block w-64 shrink-0">
          <div className="sticky top-28 flex flex-col gap-4">
            <div className="bento-card p-6 bg-accent-purple/20">
              <h3 className="text-[10px] font-black text-black/40 uppercase tracking-[0.2em] mb-6">Progress</h3>
              <div className="space-y-8 relative">
                <div className="absolute left-3.5 top-2 bottom-2 w-0.5 bg-black/10"></div>
                <StepIndicator active={step === 1} done={step > 1} number="1" title="Eligibility" />
                <StepIndicator active={step === 2} done={step > 2} number="2" title="Documents" />
                <StepIndicator active={step === 3} done={step > 3} number="3" title="Submission" />
              </div>
            </div>
            <div className="bento-card p-6 bg-accent-green/20">
              <p className="text-[10px] font-black uppercase tracking-widest text-black/40 mb-2">Help</p>
              <button className="flex items-center gap-2 text-xs font-bold hover:underline">
                <HelpCircle className="w-4 h-4" /> Live Support
              </button>
            </div>
          </div>
        </div>

        {/* Content Canvas */}
        <div className="flex-1 flex flex-col gap-12">
          <div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8">
              <h1 className="text-4xl font-black italic tracking-tighter">
                Registration Guide
              </h1>
              
              {/* Simplified Toggle */}
              <div className="flex items-center gap-4 bg-white bento-card px-4 py-2 shadow-bento">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Kid Mode</span>
                <button 
                  onClick={() => setIsSimplified(!isSimplified)}
                  className={`w-12 h-7 rounded-full relative transition-all duration-300 border-2 border-black ${isSimplified ? 'bg-secondary' : 'bg-slate-200'}`}
                >
                  <motion.div 
                    animate={{ x: isSimplified ? 22 : 2 }}
                    className="absolute top-0.5 left-0.5 w-5 h-5 bg-white border-2 border-black rounded-full"
                  />
                </button>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div 
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bento-card-lg bg-white overflow-hidden mb-12"
              >
                <div className="h-4 bg-secondary w-full border-b-2 border-black"></div>
                <div className="p-10">
                  {step === 1 ? (
                    <>
                      <h2 className="text-3xl font-black italic mb-6">Eligibility Requirements</h2>
                      <p className="text-lg text-on-surface-variant leading-relaxed mb-10 font-medium">
                        To register to vote, you must meet a few basic requirements to ensure you are eligible to participate in the upcoming election.
                      </p>

                      <div className="space-y-6">
                        <RequirementItem 
                          title="Citizenship"
                          description="You must be a citizen of the country. If you were born here or have completed the naturalization process, you meet this requirement."
                        />
                        <RequirementItem 
                          title="Age"
                          description="You must be at least 18 years old on or before Election Day."
                        />
                        <RequirementItem 
                          title="Residence Requirements"
                          description="You must live in the state or district where you are registering to vote."
                          hasTooltip
                        />
                      </div>
                    </>
                  ) : (
                    <div className="py-20 text-center">
                      <div className="w-24 h-24 bg-accent-purple border-2 border-black rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-bento">
                        <Clock className="w-12 h-12 text-black" />
                      </div>
                      <h3 className="text-4xl font-black italic mb-4">Documents Needed</h3>
                      <p className="text-on-surface-variant text-lg font-medium mb-10">This section is coming soon. Please gather your state ID or passport.</p>
                      <button onClick={() => setStep(1)} className="text-black font-black uppercase tracking-widest text-xs hover:underline flex items-center justify-center gap-2 mx-auto">
                        <ArrowLeft className="w-4 h-4" /> Go back to Eligibility
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Controls */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 py-10 border-t-2 border-black/5">
              <button 
                onClick={() => navigate('/timeline')}
                className="bento-button-outline w-full sm:w-auto px-10 flex items-center justify-center gap-3"
              >
                <ArrowLeft className="w-5 h-5" /> Back to Timeline
              </button>
              <button 
                onClick={() => step < 3 && setStep(step + 1)}
                className="bento-button w-full sm:w-auto px-10 flex items-center justify-center gap-3"
              >
                Next Step <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="border-t-2 border-black/5 pt-12">
            <Comments sectionId="registration" />
          </div>
        </div>
      </div>
    </div>
  );
}

function StepIndicator({ active, done, number, title }: any) {
  return (
    <div className="flex gap-4 relative z-10 items-center">
      <div className={`
        w-8 h-8 rounded-full border-2 border-black flex items-center justify-center text-xs font-black transition-all
        ${active ? 'bg-black text-white shadow-bento translate-x-1 translate-y-1' : done ? 'bg-accent-green text-black' : 'bg-white text-black/30'}
      `}>
        {done ? <CheckCircle2 className="w-5 h-5" /> : number}
      </div>
      <span className={`text-xs font-black uppercase tracking-widest transition-all ${active ? 'text-black' : 'text-black/30'}`}>
        {title}
      </span>
    </div>
  );
}

function RequirementItem({ title, description, hasTooltip }: any) {
  return (
    <div className="bento-card bg-slate-50 p-6 flex gap-6 items-start group">
      <div className="mt-1 bg-white border-2 border-black p-2 rounded-xl shadow-bento group-hover:scale-110 transition-transform">
        <CheckCircle2 className="w-5 h-5 text-black" />
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-2">
          <h4 className="text-xl font-black italic tracking-tight">{title}</h4>
          {hasTooltip && (
            <div className="relative group/tooltip">
              <Info className="w-4 h-4 text-slate-400 cursor-help" />
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-64 p-6 bento-card bg-white text-xs text-black font-medium opacity-0 group-hover/tooltip:opacity-100 transition-all shadow-bento-lg pointer-events-none z-20">
                You must have lived at your current address for at least 30 days before the election to vote in that specific district.
              </div>
            </div>
          )}
        </div>
        <p className="text-on-surface-variant font-medium leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
