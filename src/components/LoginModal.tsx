import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { toast } from '../hooks/use-toast';

const LoginModal = () => {
  const { state, dispatch } = useApp();
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [userType, setUserType] = useState<'user' | 'vendor'>('user');
  
  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  // Register form state
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Set defaults when modal opens for vendor registration
  useEffect(() => {
    if (state.isLoginModalOpen) {
      // Check if this is for vendor registration (we'll enhance this logic)
      const urlParams = new URLSearchParams(window.location.search);
      const isVendorFlow = urlParams.get('vendor') === 'true';
      
      if (isVendorFlow) {
        setActiveTab('register');
        setUserType('vendor');
      }
    }
  }, [state.isLoginModalOpen]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Demo login - in a real app this would validate against a backend
    if (loginEmail && loginPassword) {
      dispatch({ 
        type: 'SET_USER', 
        payload: {
          id: `user-${Date.now()}`,
          name: loginEmail.split('@')[0],
          email: loginEmail,
          type: userType
        } 
      });
      
      dispatch({ type: 'TOGGLE_LOGIN_MODAL' });
      
      toast({
        title: "Logged In",
        description: `Welcome back, ${loginEmail.split('@')[0]}!`
      });
    } else {
      toast({
        title: "Login Failed",
        description: "Please fill in all fields",
        variant: "destructive"
      });
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!registerName || !registerEmail || !registerPassword || !confirmPassword) {
      toast({
        title: "Registration Failed",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }
    
    if (registerPassword !== confirmPassword) {
      toast({
        title: "Registration Failed",
        description: "Passwords do not match",
        variant: "destructive"
      });
      return;
    }
    
    // Demo registration - in a real app this would send data to a backend
    dispatch({ 
      type: 'SET_USER', 
      payload: {
        id: `user-${Date.now()}`,
        name: registerName,
        email: registerEmail,
        type: userType
      } 
    });
    
    dispatch({ type: 'TOGGLE_LOGIN_MODAL' });
    
    const welcomeMessage = userType === 'vendor' 
      ? `Welcome to Vaikunta, ${registerName}! Your vendor account has been created.`
      : `Welcome to Vaikunta, ${registerName}!`;
    
    toast({
      title: "Registration Successful",
      description: welcomeMessage
    });
  };

  return (
    <Dialog open={state.isLoginModalOpen} onOpenChange={() => dispatch({ type: 'TOGGLE_LOGIN_MODAL' })}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            {activeTab === 'login' ? 'Login' : userType === 'vendor' ? 'Become a Vendor' : 'Create an Account'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="mt-4">
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'login' | 'register')}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            
            <div className="mt-6 mb-4">
              <div className="flex items-center justify-center gap-4">
                <Button
                  type="button"
                  variant={userType === 'user' ? 'default' : 'outline'}
                  className={userType === 'user' ? 'bg-vaikunta-gold hover:bg-vaikunta-gold/90' : ''}
                  onClick={() => setUserType('user')}
                >
                  Regular User
                </Button>
                <Button
                  type="button"
                  variant={userType === 'vendor' ? 'default' : 'outline'}
                  className={userType === 'vendor' ? 'bg-vaikunta-gold hover:bg-vaikunta-gold/90' : ''}
                  onClick={() => setUserType('vendor')}
                >
                  Vendor
                </Button>
              </div>
            </div>
            
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="your@email.com"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input 
                    id="password" 
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-vaikunta-gold hover:bg-vaikunta-gold/90"
                >
                  Login
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="register">
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name"
                    placeholder="Your Name"
                    value={registerName}
                    onChange={(e) => setRegisterName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-email">Email</Label>
                  <Input 
                    id="register-email" 
                    type="email" 
                    placeholder="your@email.com"
                    value={registerEmail}
                    onChange={(e) => setRegisterEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-password">Password</Label>
                  <Input 
                    id="register-password" 
                    type="password"
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input 
                    id="confirm-password" 
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-vaikunta-gold hover:bg-vaikunta-gold/90"
                >
                  {userType === 'vendor' ? 'Create Vendor Account' : 'Create Account'}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
