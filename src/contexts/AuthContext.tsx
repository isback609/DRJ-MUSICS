
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from '@/hooks/use-toast';

type UserRole = 'admin' | 'user';

type User = {
  id: string;
  username: string;
  role: UserRole;
  email?: string;
  photoURL?: string;
  provider?: string;
};

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  loginWithProvider: (provider: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// This would be replaced with actual admin credentials in a real app
// IMPORTANT: In a production app, you would never store credentials in the frontend
// This is just for demo purposes. Use a proper authentication service instead.
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'admin123';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated on component mount
    const storedUser = localStorage.getItem('drjmugics_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem('drjmugics_user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    // Simple authentication logic for admin
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      const adminUser: User = {
        id: '1',
        username,
        role: 'admin',
      };
      setUser(adminUser);
      localStorage.setItem('drjmugics_user', JSON.stringify(adminUser));
      toast({
        title: "Login successful",
        description: "Welcome to the admin dashboard",
      });
      return true;
    }
    
    toast({
      title: "Login failed",
      description: "Invalid username or password",
      variant: "destructive"
    });
    return false;
  };

  const loginWithProvider = async (provider: string): Promise<boolean> => {
    // In a real app, this would connect to a real authentication provider
    // For demo, we'll create a mock user
    const mockProviderUser: User = {
      id: Math.random().toString(36).substring(2, 9),
      username: `user_${Math.random().toString(36).substring(2, 7)}`,
      role: 'user',
      provider,
      photoURL: `https://api.dicebear.com/7.x/avataaars/svg?seed=${Math.random().toString(36).substring(2, 7)}`,
      email: `user_${Math.random().toString(36).substring(2, 7)}@example.com`,
    };

    setUser(mockProviderUser);
    localStorage.setItem('drjmugics_user', JSON.stringify(mockProviderUser));
    
    toast({
      title: "Login successful",
      description: `Welcome to DRJ MUGICS!`,
    });
    
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('drjmugics_user');
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isAuthenticated: !!user, 
        isAdmin: user?.role === 'admin',
        login, 
        loginWithProvider,
        logout,
        loading 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
