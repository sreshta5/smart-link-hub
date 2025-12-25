import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link, BookOpen, Briefcase, Award, Calendar, ArrowRight } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface AuthProps {
  onLogin: () => void;
}

export function Auth({ onLogin }: AuthProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || (!isLogin && !name)) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: isLogin ? "Welcome back!" : "Account created!",
      description: isLogin ? "You've successfully logged in." : "Your account has been created.",
    });
    onLogin();
  };

  const features = [
    { icon: BookOpen, label: 'Exam Deadlines', color: 'text-category-exams' },
    { icon: Briefcase, label: 'Internships', color: 'text-category-internships' },
    { icon: Award, label: 'Scholarships', color: 'text-category-scholarships' },
    { icon: Calendar, label: 'Events', color: 'text-category-events' },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 gradient-primary p-12 flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 mb-12">
            <div className="h-10 w-10 rounded-xl bg-primary-foreground/20 flex items-center justify-center backdrop-blur">
              <Link className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-semibold text-xl text-primary-foreground">
              SmartLink
            </span>
          </div>

          <h1 className="text-4xl font-bold text-primary-foreground mb-4 leading-tight">
            Never Miss an Important<br />Deadline Again
          </h1>
          <p className="text-primary-foreground/80 text-lg mb-12 max-w-md">
            Organize your academic and career links, get smart reminders, and stay ahead of every deadline.
          </p>

          <div className="grid grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-primary-foreground/10 backdrop-blur rounded-xl p-4 flex items-center gap-3 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <feature.icon className="h-5 w-5 text-primary-foreground" />
                <span className="text-primary-foreground font-medium">{feature.label}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="text-primary-foreground/60 text-sm">
          Trusted by students at top universities worldwide
        </p>
      </div>

      {/* Right side - Auth Form */}
      <div className="flex-1 flex items-center justify-center p-6 bg-background">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="flex items-center gap-2 mb-8 lg:hidden justify-center">
            <div className="h-8 w-8 rounded-lg gradient-primary flex items-center justify-center">
              <Link className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-semibold text-lg">
              Smart<span className="gradient-text">Link</span>
            </span>
          </div>

          <Card className="border-0 shadow-lg">
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-2xl font-bold">
                {isLogin ? 'Welcome back' : 'Create an account'}
              </CardTitle>
              <CardDescription>
                {isLogin 
                  ? 'Enter your credentials to access your dashboard' 
                  : 'Start organizing your academic links today'
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                      id="name" 
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="john@university.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input 
                    id="password" 
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <Button type="submit" className="w-full gap-2" size="lg">
                  {isLogin ? 'Sign In' : 'Create Account'}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </form>

              <div className="mt-6 text-center text-sm">
                <span className="text-muted-foreground">
                  {isLogin ? "Don't have an account? " : "Already have an account? "}
                </span>
                <button 
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-primary font-medium hover:underline"
                >
                  {isLogin ? 'Sign up' : 'Sign in'}
                </button>
              </div>
            </CardContent>
          </Card>

          <p className="text-center text-xs text-muted-foreground mt-6">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}
