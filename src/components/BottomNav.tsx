
import React from 'react';
import { Home, Search, Library, Settings } from "lucide-react";
import { Link, useLocation } from 'react-router-dom';

const BottomNav: React.FC = () => {
  const location = useLocation();
  const pathname = location.pathname;

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-secondary/80 backdrop-blur-lg shadow-lg z-30">
      <div className="flex justify-around items-center p-3">
        <Link to="/" className={`flex flex-col items-center ${isActive('/') ? 'text-music-magenta active-nav-item' : 'text-muted-foreground'}`}>
          <Home size={20} />
          <span className="text-xs mt-1">Home</span>
        </Link>
        
        <Link to="/search" className={`flex flex-col items-center ${isActive('/search') ? 'text-music-magenta active-nav-item' : 'text-muted-foreground'}`}>
          <Search size={20} />
          <span className="text-xs mt-1">Search</span>
        </Link>
        
        <Link to="/library" className={`flex flex-col items-center ${isActive('/library') ? 'text-music-magenta active-nav-item' : 'text-muted-foreground'}`}>
          <Library size={20} />
          <span className="text-xs mt-1">Library</span>
        </Link>
        
        <Link to="/settings" className={`flex flex-col items-center ${isActive('/settings') ? 'text-music-magenta active-nav-item' : 'text-muted-foreground'}`}>
          <Settings size={20} />
          <span className="text-xs mt-1">Settings</span>
        </Link>
      </div>
    </div>
  );
};

export default BottomNav;
