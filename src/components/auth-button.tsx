'use client';

import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';
import { Button, ButtonProps } from './ui/button';
import { useRouter } from 'next/navigation';

export default function AuthButton({ children, className, ...props }: React.PropsWithChildren<ButtonProps>) {
  const { toast } = useToast();
  const router = useRouter();

  const handleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      // On successful sign-in, the AuthProvider's onAuthStateChanged listener
      // will update the user state, and the user will be redirected from
      // the sign-in page by the logic in src/app/signin/page.tsx.
      toast({
        title: 'Signed In',
        description: 'Welcome back!',
      });
      router.push('/dashboard');
    } catch (error: any) {
      console.error('Error signing in with Google', error);
      toast({
        title: 'Sign-in Failed',
        description: 'Could not sign in with Google. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Button onClick={handleSignIn} className={className} {...props}>
      {children}
    </Button>
  );
}
