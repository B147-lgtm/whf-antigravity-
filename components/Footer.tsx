
import React from 'react';
import { NavLink } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1A2F1F] text-white py-24 px-8">
      <div className="max-w-[1800px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-16">
        <div>
          <h3 className="text-3xl font-editorial mb-8 text-[#D4AF37]">Wood Heaven Farms</h3>
          <p className="text-gray-400 text-sm leading-relaxed max-w-xs font-light">
            Jaipur’s most exclusive luxury estate for staycations, private events, and elegant celebrations.
          </p>
        </div>
        
        <div>
          <h4 className="text-[10px] uppercase tracking-[0.5em] text-[#D4AF37] mb-8 font-bold">Navigation</h4>
          <div className="flex flex-col gap-4">
            <NavLink to="/" className="text-sm font-light text-gray-400 hover:text-white transition-colors">Home</NavLink>
            <NavLink to="/gallery" className="text-sm font-light text-gray-400 hover:text-white transition-colors">Gallery</NavLink>
            <NavLink to="/estate" className="text-sm font-light text-gray-400 hover:text-white transition-colors">The Estate Guide</NavLink>
            <NavLink to="/location" className="text-sm font-light text-gray-400 hover:text-white transition-colors">Location</NavLink>
            <NavLink to="/enquiry" className="text-sm font-light text-gray-400 hover:text-white transition-colors">Enquiry</NavLink>
          </div>
        </div>

        <div>
          <h4 className="text-[10px] uppercase tracking-[0.5em] text-[#D4AF37] mb-8 font-bold">Contact</h4>
          <div className="space-y-4">
            <p className="text-sm font-light text-gray-400 leading-relaxed">
              621, 622, Green Triveni, Opposite Ashiana Greens,<br /> 
              Sikar Road, Jaipur, Rajasthan, 302013
            </p>
            <p className="text-sm font-bold text-white tracking-widest">+91 88520 21119</p>
            <p className="text-sm font-light text-gray-400">woodheavenfarms@gmail.com</p>
          </div>
        </div>
      </div>
      <div className="max-w-[1800px] mx-auto border-t border-white/5 mt-24 pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
        <p className="text-[9px] text-gray-600 uppercase tracking-[0.4em]">
          © {new Date().getFullYear()} Wood Heaven Farms. All Rights Reserved.
        </p>
        <div className="flex gap-8">
           <a href="https://www.instagram.com/woodheavenfarms/" target="_blank" rel="noopener noreferrer" className="text-[9px] uppercase tracking-[0.4em] text-gray-600 hover:text-[#D4AF37] transition-colors">Instagram</a>
           <a href="https://wa.me/918852021119" target="_blank" rel="noopener noreferrer" className="text-[9px] uppercase tracking-[0.4em] text-gray-600 hover:text-[#D4AF37] transition-colors">WhatsApp</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
