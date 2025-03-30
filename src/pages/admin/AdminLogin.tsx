
import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Music, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

const AdminLogin: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();

  // If already logged in as admin, redirect to admin dashboard
  if (isAuthenticated && isAdmin) {
    return <Navigate to="/admin" replace />;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const success = await login(username, password);
      if (success) {
        navigate('/admin');
      }
    } catch (error) {
      toast({
        title: "Login failed",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Music className="h-12 w-12 text-music-magenta" />
          </div>
          <CardTitle className="text-2xl">DRJ MUGICS Admin</CardTitle>
          <CardDescription>Login to access the admin dashboard</CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-medium">Username</label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">Password</label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <span className="flex items-center">
                  <span className="animate-spin mr-2">⏳</span> Logging in...
                </span>
              ) : (
                <span className="flex items-center">
                  <Lock className="mr-2 h-4 w-4" /> Login
                </span>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default AdminLogin;
