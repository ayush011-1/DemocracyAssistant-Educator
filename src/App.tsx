import { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  Vote, 
  HelpCircle, 
  LayoutDashboard, 
  Users, 
  TrendingUp, 
  BarChart3, 
  Settings, 
  Globe, 
  Bell, 
  MapPin,
  UserCircle2,
  ChevronRight,
  ArrowRight,
  Search,
  MessageSquare,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Views
import Onboarding from './views/Onboarding';
import Timeline from './views/Timeline';
import Registration from './views/Registration';
import PollingLocations from './views/PollingLocations';
import Support from './views/Support';

import { useAuth } from './context/AuthContext';
import { useUI } from './context/UIContext';
import AuthModal from './components/AuthModal';

export default function App() {
  const location = useLocation();
  const { user, logout } = useAuth();
  const { isSimplifiedMode, setIsSimplifiedMode, isHighAccessibility, setIsHighAccessibility } = useUI();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Close sidebar on route change
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);

  // Determine if we are on a "workspace" page (app view) vs landing pages
  const isLanding = ['/', '/onboarding'].includes(location.pathname);

  if (isLanding) {
    return (
      <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-4 sm:p-8">
        <div className="bento-card-lg bg-white p-6 sm:p-12 max-w-2xl w-full text-center relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-48 h-48 bg-blue-50 rounded-full blur-3xl opacity-50"></div>
          <div className="relative z-10">
            <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-bento">
              <Vote className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl sm:text-5xl font-black italic mb-6">DemocracyAssist</h1>
            <p className="text-on-surface-variant text-base sm:text-lg mb-10 leading-relaxed">
              Your intelligent companion for participating in the democratic process.
              Clear, reliable, and accessible.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/registration" className="bento-button text-base px-10 py-5">
                Launch Dashboard
              </Link>
              {!user && (
                <button 
                  onClick={() => setIsAuthModalOpen(true)}
                  className="bento-button-outline text-base px-10 py-5"
                >
                  Join the Community
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-2 sm:p-4 bg-surface min-h-screen flex gap-4 h-screen overflow-hidden">
      {/* Sidebar Navigation */}
      <AnimatePresence>
        {(isSidebarOpen || window.innerWidth >= 1024) && (
          <motion.nav 
            initial={window.innerWidth < 1024 ? { x: -300 } : {}}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className={`
              fixed lg:relative z-50 lg:z-auto w-72 h-[calc(100vh-1rem)] lg:h-full
              bento-card-lg bg-white flex flex-col overflow-hidden shrink-0
            `}
          >
            <div className="p-8 border-b-2 border-black flex items-center justify-between">
              <Link to="/" className="flex items-center gap-3">
                <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center shadow-bento">
                  <Vote className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-xl font-bold tracking-tight">Democracy<span className="text-slate-400 font-normal italic">Assist</span></h1>
              </Link>
              <button 
                onClick={() => setIsSidebarOpen(false)}
                className="lg:hidden p-2 text-black hover:bg-slate-100 rounded-xl"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 p-4 flex flex-col gap-2 overflow-y-auto no-scrollbar">
              <SidebarLink to="/registration" icon={Vote} label="Registration" active={location.pathname === '/registration'} />
              <SidebarLink to="/timeline" icon={Globe} label="Timeline" active={location.pathname === '/timeline'} />
              <SidebarLink to="/nomination" icon={Users} label="Nomination" active={location.pathname === '/nomination'} />
              <SidebarLink to="/campaign" icon={TrendingUp} label="Campaign" active={location.pathname === '/campaign'} />
              <SidebarLink to="/voting" icon={BarChart3} label="Voting" active={location.pathname === '/voting'} />
              <SidebarLink to="/polling" icon={MapPin} label="Polling Stations" active={location.pathname === '/polling'} />
              <SidebarLink to="/counting" icon={LayoutDashboard} label="Counting" active={location.pathname === '/counting'} />
            </div>

            <div className="p-6 border-t-2 border-black flex flex-col gap-4 bg-accent-purple/30">
              <div className="bg-white p-4 rounded-2xl border-2 border-black shadow-bento">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">System Ready</span>
                </div>
                <p className="text-sm font-bold">2024 Election Cycle</p>
              </div>
              <Link to="/support" className="bento-button-outline text-center flex items-center justify-center gap-2">
                <HelpCircle className="w-4 h-4" /> Support
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col gap-2 sm:gap-4 overflow-hidden relative">
        {/* Overlay for mobile sidebar */}
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
            />
          )}
        </AnimatePresence>

        {/* Top Header Card */}
        <header className="h-20 bento-card bg-white p-2 sm:p-4 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-2 sm:gap-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-3 bg-slate-50 border-2 border-black rounded-xl hover:bg-slate-100 transition-colors shadow-bento"
            >
              <Menu className="w-6 h-6" />
            </button>
            {user ? (
              <>
                <img 
                  src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName}`} 
                  alt="" 
                  className="w-10 h-10 rounded-full border-2 border-black shadow-bento shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div className="hidden sm:block">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 leading-none mb-1">Authenticated Citizen</p>
                  <h2 className="text-base font-bold truncate max-w-[150px]">{user.displayName || user.email}</h2>
                </div>
              </>
            ) : (
              <>
                <div className="w-10 h-10 rounded-full bg-slate-100 border-2 border-black shadow-bento flex items-center justify-center shrink-0">
                  <UserCircle2 className="w-6 h-6 text-slate-300" />
                </div>
                <div className="hidden sm:block">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 leading-none mb-1">Guest Mode</p>
                  <h2 className="text-base font-bold">Welcome, Voter</h2>
                </div>
              </>
            )}
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button 
              onClick={() => setIsSimplifiedMode(!isSimplifiedMode)}
              className={`hidden sm:flex items-center gap-2 px-4 py-3 border-2 border-black rounded-xl transition-all shadow-bento active:translate-y-[1px] active:shadow-none ${isSimplifiedMode ? 'bg-accent-green' : 'bg-slate-50'}`}
            >
              <div className={`w-8 h-4 rounded-full border-2 border-black relative transition-colors ${isSimplifiedMode ? 'bg-black' : 'bg-white'}`}>
                <div className={`absolute top-0.5 w-2 h-2 rounded-full border-2 border-black transition-all ${isSimplifiedMode ? 'left-[18px] bg-accent-green' : 'left-0.5 bg-black'}`}></div>
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest">{isSimplifiedMode ? 'Focus On' : 'Standard'}</span>
            </button>
            <button 
              onClick={() => setIsHighAccessibility(!isHighAccessibility)}
              className={`hidden sm:flex items-center gap-2 px-4 py-3 border-2 border-black rounded-xl transition-all shadow-bento active:translate-y-[1px] active:shadow-none ${isHighAccessibility ? 'bg-accent-yellow' : 'bg-slate-50'}`}
              title="Toggle High Accessibility Mode"
              aria-pressed={isHighAccessibility}
            >
              <div className={`w-8 h-4 rounded-full border-2 border-black relative transition-colors ${isHighAccessibility ? 'bg-black' : 'bg-white'}`}>
                <div className={`absolute top-0.5 w-2 h-2 rounded-full border-2 border-black transition-all ${isHighAccessibility ? 'left-[18px] bg-accent-yellow' : 'left-0.5 bg-black'}`}></div>
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest">{isHighAccessibility ? 'Enhanced' : 'Standard UI'}</span>
            </button>
            <button className="hidden sm:block p-3 bg-slate-50 border-2 border-black rounded-xl hover:bg-slate-100 transition-colors shadow-bento active:translate-y-[2px] active:translate-x-[2px] active:shadow-none">
              <Settings className="w-5 h-5" />
            </button>
            {user ? (
              <button 
                onClick={logout}
                className="bento-button px-3 sm:px-6 flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" /> <span className="hidden sm:inline">Sign Out</span>
              </button>
            ) : (
              <button 
                onClick={() => setIsAuthModalOpen(true)}
                className="bento-button"
              >
                Sign In
              </button>
            )}
          </div>
        </header>

        <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />

        {/* Dynamic Content Bento Card */}
        <div className="flex-1 bg-white bento-card-lg overflow-y-auto no-scrollbar p-4 sm:p-8 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <Routes location={location}>
                <Route path="/" element={<Onboarding />} />
                <Route path="/timeline" element={<Timeline />} />
                <Route path="/registration" element={<Registration />} />
                <Route path="/polling" element={<PollingLocations />} />
                <Route path="/support" element={<Support />} />
                <Route path="*" element={<Onboarding />} />
              </Routes>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function SidebarLink({ to, icon: Icon, label, active = false }: { to: string, icon: any, label: string, active?: boolean }) {
  return (
    <Link 
      to={to} 
      className={`flex items-center gap-4 px-4 py-4 rounded-2xl transition-all group border-2 ${
        active 
          ? 'bg-black text-white border-black shadow-bento translate-x-[2px] translate-y-[2px]' 
          : 'text-slate-500 border-transparent hover:border-black hover:bg-slate-50'
      }`}
    >
      <Icon className={`w-5 h-5 ${active ? 'text-white' : 'text-slate-300 group-hover:text-black'}`} />
      <span className="text-xs font-bold uppercase tracking-widest leading-none">{label}</span>
    </Link>
  );
}

function Footer() {
  return (
    <footer className="bg-surface-container-low border-t border-outline-variant/20 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-sm font-semibold text-on-surface-variant">
          © 2024 DemocracyAssist. Built for clarity and reliability.
        </div>
        <div className="flex flex-wrap justify-center gap-6 text-sm text-on-surface-variant">
          <Link to="#" className="hover:text-secondary transition-colors underline-offset-4 hover:underline">Privacy Policy</Link>
          <Link to="#" className="hover:text-secondary transition-colors underline-offset-4 hover:underline">Terms of Service</Link>
          <Link to="#" className="hover:text-secondary transition-colors underline-offset-4 hover:underline">Accessibility</Link>
          <Link to="#" className="hover:text-secondary transition-colors underline-offset-4 hover:underline">Contact Support</Link>
        </div>
      </div>
    </footer>
  );
}
