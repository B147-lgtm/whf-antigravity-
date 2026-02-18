
import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location]);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/estate', label: 'The Estate' },
    { path: '/location', label: 'Location' },
    { path: '/enquiry', label: 'Inquiry' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${
      scrolled ? 'bg-white/95 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-8'
    }`}>
      <div className="max-w-[1800px] mx-auto px-8 md:px-16">
        <div className="flex justify-between items-center">
          <NavLink to="/" className="flex items-center gap-4 group transition-all duration-500">
            <div className={`relative overflow-hidden rounded-full transition-all duration-700 border-[#D4AF37]/20 ${
              scrolled ? 'h-10 w-10 border' : 'h-16 w-16 md:h-20 md:w-20 border-2'
            }`}>
              <img 
                src="https://images.unsplash.com/photo-1505533321630-975218a5f66f?auto=format&fit=crop&q=80&w=200&h=200" 
                alt="Wood Heaven Farms Logo" 
                className="w-full h-full object-cover grayscale brightness-125 contrast-125 group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-[#1A2F1F]/40 mix-blend-multiply"></div>
              <div className="absolute inset-0 border-[1px] border-[#D4AF37]/40 rounded-full"></div>
            </div>
            
            <div className={`hidden lg:flex flex-col transition-opacity duration-500 ${
              scrolled || location.pathname !== '/' ? 'opacity-100' : 'opacity-0'
            }`}>
              <span className="text-[10px] font-serif font-bold tracking-[0.2em] text-[#1A2F1F] uppercase">Wood Heaven</span>
              <span className="text-[8px] tracking-[0.4em] text-[#D4AF37] uppercase -mt-1">Farms</span>
            </div>
          </NavLink>

          <div className="hidden md:flex items-center space-x-12">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `text-[10px] uppercase tracking-[0.4em] font-bold transition-all ${
                    isActive 
                      ? 'text-[#D4AF37]' 
                      : (scrolled || location.pathname !== '/' ? 'text-[#1A2F1F]/60 hover:text-[#1A2F1F]' : 'text-white/60 hover:text-white')
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          <button
            className={`md:hidden p-2 transition-colors ${
              scrolled || location.pathname !== '/' ? 'text-[#1A2F1F]' : 'text-white'
            }`}
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="w-6 h-4 flex flex-col justify-between items-end">
              <span className={`h-[1px] bg-current transition-all ${isOpen ? 'w-6 translate-y-2 rotate-45' : 'w-6'}`}></span>
              <span className={`h-[1px] bg-current transition-all ${isOpen ? 'opacity-0' : 'w-4'}`}></span>
              <span className={`h-[1px] bg-current transition-all ${isOpen ? 'w-6 -translate-y-[7px] -rotate-45' : 'w-2'}`}></span>
            </div>
          </button>
        </div>
      </div>

      <div
        className={`fixed inset-0 bg-[#1A2F1F] z-[60] transition-all duration-700 ease-[cubic-bezier(0.77,0,0.175,1)] ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full p-16 pt-32">
          <button onClick={() => setIsOpen(false)} className="absolute top-8 right-8 text-white/40 uppercase tracking-[0.4em] text-[10px]">Close</button>
          <div className="flex flex-col space-y-8">
            {navLinks.map((link, idx) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `text-4xl font-serif transition-all ${
                    isActive ? 'text-[#D4AF37] pl-8' : 'text-white/40 hover:text-white hover:pl-8'
                  }`
                }
              >
                <span className="text-xs font-sans tracking-widest mr-4 opacity-30">0{idx + 1}</span>
                {link.label}
              </NavLink>
            ))}
          </div>
          <div className="mt-auto border-t border-white/5 pt-12">
            <p className="text-[10px] text-white/30 uppercase tracking-[0.5em] mb-4">Inquiries</p>
            <p className="text-white text-lg font-serif italic">+91 88520 21119</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
