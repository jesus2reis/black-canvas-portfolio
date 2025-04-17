
import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';

interface NavigationProps {
  title?: string;
  subtitle?: string;
}

const Navigation: React.FC<NavigationProps> = ({ 
  title = "JdR", 
  subtitle = "Brand Designer" 
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMenuOpen && 
          menuRef.current && 
          !menuRef.current.contains(event.target as Node) &&
          buttonRef.current && 
          !buttonRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);
  
  return (
    <nav className="w-full py-4 px-6 flex justify-between items-center border-b border-white/10">
      <div className="flex items-center space-x-1">
        <Link to="/" className="text-xl font-mono">
          {title}
        </Link>
      </div>
      
      <div className="text-center">
        <Link to="/" className="group">
          <div className="text-base font-light transition-transform duration-300 group-hover:scale-105">
            {title === "JdR" ? "Jesús dos Reis" : title}
          </div>
          <div className="text-xs text-muted-foreground">{subtitle}</div>
        </Link>
      </div>
      
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-6">
        <Link to="/" className={`hover:underline ${location.pathname === '/' ? 'text-white' : 'text-muted-foreground'}`}>
          Home
        </Link>
        <Link to="/about" className={`hover:underline ${location.pathname === '/about' ? 'text-white' : 'text-muted-foreground'}`}>
          About
        </Link>
        <Link to="/contact" className={`hover:underline ${location.pathname === '/contact' ? 'text-white' : 'text-muted-foreground'}`}>
          Contact
        </Link>
        <button onClick={toggleTheme} className="p-1 rounded-full hover:bg-muted/50 transition-colors">
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
      
      {/* Mobile Navigation Button */}
      <div className="md:hidden flex items-center space-x-2">
        <button onClick={toggleTheme} className="p-1 mr-2 rounded-full hover:bg-muted/50 transition-colors">
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <button ref={buttonRef} onClick={toggleMenu} className="p-1">
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div ref={menuRef} className="fixed inset-0 bg-black z-50 p-6 flex flex-col items-center justify-center animate-fade-in md:hidden">
          <button onClick={toggleMenu} className="absolute top-4 right-6">
            <X size={20} />
          </button>
          <div className="text-2xl space-y-6 text-center">
            <div><Link to="/" onClick={toggleMenu} className="hover:underline">Home</Link></div>
            <div><Link to="/about" onClick={toggleMenu} className="hover:underline">About</Link></div>
            <div><Link to="/contact" onClick={toggleMenu} className="hover:underline">Contact</Link></div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
