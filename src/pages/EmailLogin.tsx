
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Music, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
});

const EmailLogin: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { loginWithProvider } = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    
    try {
      // In a real app, we would authenticate with a backend
      // For demo purposes, we'll create a user with the email provider
      await loginWithProvider('email');
      navigate('/');
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Please check your credentials and try again",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4 bg-gradient-to-b from-background to-background/80">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute left-4 top-4" 
            onClick={() => navigate('/login')}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          
          <div className="flex justify-center mb-4">
            <Music className="h-12 w-12 text-music-magenta" />
          </div>
          <CardTitle className="text-2xl">Sign in with Email</CardTitle>
          <CardDescription>Enter your email and password to continue</CardDescription>
        </CardHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="your.email@example.com" 
                        {...field} 
                        type="email"
                        autoComplete="email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="••••••••" 
                        {...field} 
                        type="password"
                        autoComplete="current-password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex-col space-y-4">
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
              </Button>
              
              <div className="flex justify-between w-full text-sm">
                <Button 
                  variant="link" 
                  className="p-0 h-auto" 
                  onClick={() => navigate('/forgot-password')}
                >
                  Forgot password?
                </Button>
                <Button 
                  variant="link" 
                  className="p-0 h-auto"
                  onClick={() => navigate('/signup')}
                >
                  Create account
                </Button>
              </div>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default EmailLogin;
