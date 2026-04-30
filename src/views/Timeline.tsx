import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  UserPlus, 
  UserCheck, 
  Megaphone, 
  Vote, 
  PieChart, 
  ArrowRight, 
  PlayCircle,
  Lock,
  Edit3,
  Search
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Timeline() {
  const navigate = useNavigate();
  return (
    <div className="w-full flex flex-col gap-12">
      {/* Header Section */}
      <section className="flex flex-col gap-6">
        <div>
          <h1 className="text-6xl font-black italic tracking-tighter mb-4">
            Election Timeline
          </h1>
          <p className="text-xl text-on-surface-variant max-w-2xl leading-relaxed font-medium">
            Track your progress and understand the phases of the upcoming election cycle. 
            Stay informed and prepared for each crucial step.
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="bento-card bg-accent-yellow p-6 flex items-center gap-6 w-fit group cursor-pointer">
          <div className="relative w-16 h-16 flex items-center justify-center shrink-0">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path 
                className="text-black/5" 
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                fill="none" stroke="currentColor" strokeWidth="4" 
              />
              <motion.path 
                initial={{ strokeDasharray: "0, 100" }}
                animate={{ strokeDasharray: "20, 100" }}
                className="text-black" 
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                fill="none" stroke="currentColor" strokeWidth="4" 
              />
            </svg>
            <span className="absolute font-black text-black text-sm italic">84%</span>
          </div>
          <div>
            <h3 className="text-xl font-black italic text-black">Project Velocity</h3>
            <p className="text-xs font-bold text-black/60 uppercase tracking-widest">Active Progress</p>
          </div>
        </div>
      </section>

      {/* Timeline Grid */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-6 relative">
        {/* Phase 1: Active */}
        <div className="md:col-span-12 relative z-10">
          <motion.div 
            whileHover={{ scale: 1.005 }}
            className="bento-card-lg bg-white overflow-hidden"
          >
            <div className="h-4 bg-secondary w-full border-b-2 border-black"></div>
            <div className="p-10 flex flex-col md:flex-row gap-12 items-center md:items-start text-center md:text-left">
              <div className="w-32 h-32 rounded-3xl bg-secondary border-2 border-black shadow-bento flex items-center justify-center shrink-0">
                <UserCheck className="w-14 h-14 text-white" />
              </div>
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 bg-accent-green px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border-2 border-black mb-6 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  <PlayCircle className="w-4 h-4 animate-pulse" />
                  Active Phase
                </div>
                <h3 className="text-5xl font-black italic tracking-tighter mb-6">Voter Registration</h3>
                <p className="text-on-surface-variant text-lg mb-10 max-w-2xl leading-relaxed font-medium">
                  Ensure your voice is heard. Register to vote, check your current registration status, 
                  or update your address information before the deadline.
                </p>
                <button 
                  onClick={() => navigate('/registration')}
                  className="bento-button text-base px-12 py-4 flex items-center gap-3 mx-auto md:mx-0"
                >
                  Start Registration <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Phase 2: Upcoming */}
        <TimelineCard 
          phase="Phase 2"
          icon={UserPlus}
          title="Candidate Nomination"
          description="Review the requirements and process for declaring candidacy for upcoming open positions."
          colSpan="md:col-span-6"
          accent="bg-accent-purple"
        />

        {/* Phase 3: Upcoming */}
        <TimelineCard 
          phase="Phase 3"
          icon={Megaphone}
          title="Campaigning"
          description="Understand campaign finance regulations, advertising rules, and event scheduling guidelines."
          colSpan="md:col-span-6"
          accent="bg-accent-green"
        />

        {/* Phase 4: Long Card */}
        <div className="md:col-span-8 group">
          <motion.div 
            className="bento-card bg-white p-8 flex items-center gap-8 relative overflow-hidden h-full"
          >
            <div className="w-20 h-20 rounded-2xl bg-slate-100 flex items-center justify-center shrink-0 border-2 border-black shadow-bento">
              <Vote className="w-10 h-10 text-on-surface-variant" />
            </div>
            <div className="flex-1">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Phase 4</p>
              <h4 className="text-3xl font-black italic mb-2 group-hover:underline transition-all">Election Day</h4>
              <p className="text-on-surface-variant font-medium">Find your polling station, view sample ballots, and understand voting procedures.</p>
            </div>
          </motion.div>
        </div>

        {/* Phase 5: Square Card */}
        <div className="md:col-span-4 group">
          <motion.div 
            className="bento-card bg-accent-yellow p-8 flex flex-col justify-center items-center text-center gap-4 h-full"
          >
            <div className="w-20 h-20 rounded-2xl bg-white border-2 border-black flex items-center justify-center shadow-bento">
              <PieChart className="w-10 h-10 text-black" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-black/50 mb-2">Phase 5</p>
              <h4 className="text-2xl font-black italic leading-tight">Counting & Results</h4>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Support Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bento-card bg-black text-white p-12 relative overflow-hidden group">
          <div className="relative z-10 max-w-md">
            <h2 className="text-4xl font-black italic mb-6 leading-tight">Need to update your info?</h2>
            <p className="text-white/70 mb-10 text-lg font-medium">Even though registration is closed, you can still update your address or name for future elections.</p>
            <button className="bg-white text-black bento-button px-10 py-4 shadow-none hover:shadow-none hover:bg-slate-100">
              Update Details
            </button>
          </div>
          <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-accent-green/20 rounded-full blur-3xl opacity-50"></div>
          <Edit3 className="absolute bottom-10 right-10 w-24 h-24 text-white/5 transform rotate-12" />
        </div>
        
        <div className="bento-card bg-white p-8 flex flex-col justify-between group">
          <div>
            <div className="w-16 h-16 bg-accent-green border-2 border-black rounded-2xl flex items-center justify-center mb-8 shadow-bento">
              <MapPin className="w-8 h-8 text-black" />
            </div>
            <h3 className="text-3xl font-black italic mb-4 leading-tight">Polling Place</h3>
            <p className="text-on-surface-variant font-medium">Locate your nearest voting center before Election Day.</p>
          </div>
          <button className="flex items-center gap-2 text-black font-black uppercase tracking-widest text-xs mt-10 group-hover:gap-4 transition-all hover:underline">
            Search Map <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      </section>
    </div>
  );
}

function TimelineCard({ phase, icon: Icon, title, description, colSpan, accent }: any) {
  return (
    <div className={`${colSpan} group`}>
      <motion.div 
        className={`bento-card ${accent || 'bg-white'} p-8 flex flex-col gap-8 relative h-full`}
      >
        <div className="flex justify-between items-start">
          <div className="w-14 h-14 rounded-2xl bg-white border-2 border-black flex items-center justify-center shadow-bento">
            <Icon className="w-7 h-7 text-black" />
          </div>
          <p className="text-[10px] font-black uppercase tracking-widest text-black/40">{phase}</p>
        </div>
        <div>
          <h4 className="text-3xl font-black italic mb-4 leading-tight">
            {title}
          </h4>
          <p className="text-on-surface-variant font-medium leading-relaxed">
            {description}
          </p>
        </div>
        <div className="mt-4 pt-6 border-t-2 border-black/10 flex items-center text-black font-black uppercase tracking-widest text-xs hover:underline cursor-pointer group-hover:gap-2 transition-all">
          Learn More <ArrowRight className="w-4 h-4 ml-2" />
        </div>
      </motion.div>
    </div>
  );
}

function MapPin(props: any) {
  return (
    <svg 
      {...props}
      xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
    </svg>
  );
}
