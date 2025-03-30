import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { LogIn, User, LogOut } from "lucide-react";

const Index = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <main className="flex-1 overflow-auto pb-24">
        {/* Header section */}
        <section className="relative">
          <div className="bg-gradient-to-b from-music-magenta/20 to-background p-6 pt-12">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold">DRJ MUGICS</h1>
              
              {isAuthenticated ? (
                <div className="flex items-center gap-2">
                  {user?.photoURL ? (
                    <img 
                      src={user.photoURL} 
                      alt="Profile" 
                      className="w-8 h-8 rounded-full border-2 border-music-magenta"
                    />
                  ) : (
                    <User className="w-8 h-8 p-1.5 rounded-full bg-music-magenta/20 text-music-magenta" />
                  )}
                  <div className="hidden md:block">
                    <p className="text-sm font-semibold">{user?.username}</p>
                    <Button 
                      variant="link" 
                      size="sm" 
                      className="p-0 h-auto text-xs text-muted-foreground"
                      onClick={() => logout()}
                    >
                      <LogOut className="w-3 h-3 mr-1" />
                      Sign Out
                    </Button>
                  </div>
                </div>
              ) : (
                <Button onClick={() => navigate("/login")} variant="outline" size="sm">
                  <LogIn className="mr-2 h-4 w-4" /> Sign In
                </Button>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
