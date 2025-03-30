
import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { Music, Upload, LayoutDashboard, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const AdminLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="w-64 bg-secondary/30 p-4 flex flex-col">
        <div className="flex items-center mb-8 p-2">
          <Music className="h-8 w-8 text-music-magenta mr-2" />
          <h1 className="text-xl font-bold">DRJ MUGICS Admin</h1>
        </div>
        
        <nav className="flex-1">
          <ul className="space-y-2">
            <li>
              <Link to="/admin" className="flex items-center p-2 rounded-md hover:bg-secondary/50 transition-colors">
                <LayoutDashboard className="mr-3 h-5 w-5" />
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/upload" className="flex items-center p-2 rounded-md hover:bg-secondary/50 transition-colors">
                <Upload className="mr-3 h-5 w-5" />
                <span>Upload Music</span>
              </Link>
            </li>
          </ul>
        </nav>
        
        <div className="mt-auto pt-4 border-t border-secondary">
          <div className="mb-4 px-2">
            <p className="text-sm text-muted-foreground">Signed in as</p>
            <p className="font-medium">{user?.username}</p>
          </div>
          <Button variant="outline" className="w-full flex items-center justify-center" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
      
      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <header className="bg-background/80 backdrop-blur-sm border-b p-4">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        </header>
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
