
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'active';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center font-semibold transition-all duration-300 rounded-2xl focus:outline-none disabled:opacity-50 active:scale-95";
  
  const variants = {
    primary: "bg-[#4a2c1a] text-amber-50 hover:bg-[#5d3a24] shadow-[0_4px_0_0_#2d1b0b] hover:shadow-[0_2px_0_0_#2d1b0b] hover:translate-y-[2px] active:shadow-none active:translate-y-[4px]",
    secondary: "bg-white text-[#4a2c1a] hover:bg-stone-50 border border-stone-200 shadow-sm",
    outline: "border-2 border-[#4a2c1a] text-[#4a2c1a] hover:bg-[#4a2c1a] hover:text-white",
    ghost: "text-stone-500 hover:text-[#4a2c1a] hover:bg-white/50",
    active: "bg-amber-100 text-[#4a2c1a] shadow-inner",
  };

  const sizes = {
    sm: "px-4 py-2 text-xs uppercase tracking-widest",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
