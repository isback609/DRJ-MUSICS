
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Music, LogIn, Facebook, Twitter, Mail, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/AuthContext';

const Login: React.FC = () => {
  const { loginWithProvider } = useAuth();
  const navigate = useNavigate();

  const handleSocialLogin = (provider: string) => {
    loginWithProvider(provider);
    navigate('/');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4 bg-gradient-to-b from-background to-background/80">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Music className="h-12 w-12 text-music-magenta" />
          </div>
          <CardTitle className="text-2xl">Welcome to DRJ MUGICS</CardTitle>
          <CardDescription>Sign in to enjoy your personalized music experience</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            <Button 
              variant="outline" 
              className="flex items-center justify-center bg-white hover:bg-gray-100 text-black"
              onClick={() => handleSocialLogin('google')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                <path fill="#EA4335" d="M5.26620003,9.76452941 C6.19878754,6.93863203 8.85444915,4.90909091 12,4.90909091 C13.6909091,4.90909091 15.2181818,5.50909091 16.4181818,6.49090909 L19.9090909,3 C17.7818182,1.14545455 15.0545455,0 12,0 C7.27006974,0 3.1977497,2.69829785 1.23999023,6.65002441 L5.26620003,9.76452941 Z"/>
                <path fill="#34A853" d="M16.0407269,18.0125889 C14.9509167,18.7163016 13.5660892,19.0909091 12,19.0909091 C8.86648613,19.0909091 6.21911939,17.076871 5.27698177,14.2678769 L1.23746264,17.3349879 C3.19279051,21.2936293 7.26500293,24 12,24 C14.9328362,24 17.7353462,22.9573905 19.834192,20.9995801 L16.0407269,18.0125889 Z"/>
                <path fill="#4A90E2" d="M19.834192,20.9995801 C22.0291676,18.9520994 23.4545455,15.903663 23.4545455,12 C23.4545455,11.2909091 23.3454545,10.5818182 23.1272727,9.90909091 L12,9.90909091 L12,14.4545455 L18.4363636,14.4545455 C18.1187732,16.013626 17.2662994,17.2212117 16.0407269,18.0125889 L19.834192,20.9995801 Z"/>
                <path fill="#FBBC05" d="M5.27698177,14.2678769 C5.03832634,13.556323 4.90909091,12.7937589 4.90909091,12 C4.90909091,11.2182781 5.03443647,10.4668121 5.26620003,9.76452941 L1.23999023,6.65002441 C0.43658717,8.26043162 0,10.0753848 0,12 C0,13.9195484 0.444780743,15.7301709 1.23746264,17.3349879 L5.27698177,14.2678769 Z"/>
              </svg>
              Continue with Google
            </Button>
            <Button 
              variant="outline" 
              className="flex items-center justify-center bg-[#1877F2] hover:bg-[#1877F2]/90 text-white"
              onClick={() => handleSocialLogin('facebook')}
            >
              <Facebook className="h-5 w-5 mr-2" />
              Continue with Facebook
            </Button>
            <Button 
              variant="outline" 
              className="flex items-center justify-center bg-[#24292F] hover:bg-[#24292F]/90 text-white"
              onClick={() => handleSocialLogin('github')}
            >
              <Github className="h-5 w-5 mr-2" />
              Continue with GitHub
            </Button>
            <Button 
              variant="outline" 
              className="flex items-center justify-center bg-[#1DA1F2] hover:bg-[#1DA1F2]/90 text-white"
              onClick={() => handleSocialLogin('twitter')}
            >
              <Twitter className="h-5 w-5 mr-2" />
              Continue with Twitter
            </Button>
          </div>
          
          <div className="flex items-center gap-2 my-4">
            <Separator className="flex-1" />
            <span className="text-xs text-muted-foreground">OR</span>
            <Separator className="flex-1" />
          </div>
          
          <Button 
            variant="outline" 
            className="w-full flex items-center justify-center"
            onClick={() => navigate('/email-login')}
          >
            <Mail className="h-5 w-5 mr-2" />
            Sign in with Email
          </Button>
        </CardContent>
        <CardFooter className="flex flex-col">
          <p className="text-sm text-center text-muted-foreground mt-4">
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
