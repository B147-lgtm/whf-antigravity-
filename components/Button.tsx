
import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  // Allow the onClick handler to receive the React MouseEvent
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  type?: 'button' | 'submit';
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', onClick, className = '', type = 'button' }) => {
  const baseStyles = 'px-10 py-4 text-[10px] font-bold transition-all duration-500 tracking-[0.3em] uppercase relative overflow-hidden group rounded-full';
  
  const variants = {
    primary: 'bg-[#1A2F1F] text-white hover:bg-black shadow-lg',
    secondary: 'bg-[#D4AF37] text-white hover:bg-[#B8860B] shadow-md',
    outline: 'border border-[#1A2F1F]/20 text-[#1A2F1F] hover:border-[#1A2F1F] bg-transparent',
  };

  return (
    <button type={type} onClick={onClick} className={`${baseStyles} ${variants[variant]} ${className}`}>
      <span className="relative z-10">{children}</span>
      <div className="absolute inset-0 w-0 bg-white/5 transition-all duration-300 group-hover:w-full"></div>
    </button>
  );
};

export default Button;
