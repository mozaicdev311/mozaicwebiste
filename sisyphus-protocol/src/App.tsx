import { useState, useEffect } from 'react';
import HeroAsciiOne from './components/HeroAsciiOne';
import MainContent from './components/MainContent';
import { ArrowRight, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <div className="min-h-screen bg-[#050505] text-[#fcfcfc] font-sans selection:bg-[#fcfcfc] selection:text-[#050505] overflow-x-hidden">
      {/* NAVIGATION */}
      <nav className="absolute top-0 left-0 w-full z-50 px-6 md:px-[5%] py-6 flex justify-between items-center border-b border-white/10 bg-black/20 backdrop-blur-md">
        <div className="font-semibold text-[1.25rem] tracking-[0.2em] text-white z-50 relative">MOZAIC</div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center">
          <a href="#" className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/50 hover:text-white transition-colors">Work</a>
          <a href="#" className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/50 hover:text-white transition-colors">Services</a>
          <a href="#" className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/50 hover:text-white transition-colors">About</a>
          <a href="#" className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/50 hover:text-white transition-colors">Contact</a>
          <a href="#" className="font-mono text-[10px] uppercase tracking-[0.2em] text-white flex items-center gap-2 border border-white/20 px-4 py-2 hover:bg-white hover:text-black transition-colors group">
            [ LET'S BUILD ] <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-white z-50 relative p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ clipPath: 'inset(0 0 100% 0)' }}
              animate={{ clipPath: 'inset(0 0 0% 0)' }}
              exit={{ clipPath: 'inset(100% 0 0% 0)' }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-0 bg-black z-40 flex flex-col items-center justify-center gap-8"
            >
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,transparent_70%)] pointer-events-none" />
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="absolute top-0 left-0 w-full h-[1px] bg-white/10" 
              />
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="absolute bottom-0 left-0 w-full h-[1px] bg-white/10" 
              />
              
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30 absolute top-24 left-6"
              >
                [ SYS.NAV_MENU ]
              </motion.div>
              
              <div className="flex flex-col items-center gap-8 relative z-10 w-full px-6">
                {['Work', 'Services', 'About', 'Contact'].map((item, i) => (
                  <motion.a 
                    key={i} 
                    href="#" 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    className="font-mono text-2xl uppercase tracking-[0.3em] text-white/70 hover:text-white transition-colors relative group w-full text-center border-b border-white/5 pb-4" 
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="opacity-0 group-hover:opacity-100 absolute left-0 text-white/30 transition-opacity">&gt;</span>
                    {item}
                  </motion.a>
                ))}
                <motion.a 
                  href="#" 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="font-mono text-xs uppercase tracking-[0.2em] text-black bg-white flex items-center justify-center gap-2 px-6 py-4 mt-4 hover:bg-white/90 transition-colors w-full" 
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  [ LET'S BUILD ] <ArrowRight size={14} />
                </motion.a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <HeroAsciiOne videoSrc="/Generated Video March 20, 2026 - 9_33PM.mp4" />
      
      <MainContent />
    </div>
  );
}
