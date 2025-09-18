'use client';

import { useEffect, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/context/auth-provider';
import { Skeleton } from './ui/skeleton';

export default function AuthGuard({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const isAuthPage = pathname === '/signin' || pathname === '/signup';

  useEffect(() => {
    if (!loading) {
      // If user is not logged in and not on an auth page, redirect to signin
      if (!user && !isAuthPage) {
        router.push('/signin');
      } 
      // If user is logged in and on an auth page, redirect to dashboard
      else if (user && isAuthPage) {
        router.push('/dashboard');
      }
    }
  }, [user, loading, router, isAuthPage]);

  // While loading, or if a redirect is imminent, show a skeleton screen.
  if (loading || (!user && !isAuthPage) || (user && isAuthPage)) {
    return (
        <div className="container mx-auto py-8 px-4">
            <div className="space-y-4">
                <Skeleton className="h-12 w-1/3" />
                <Skeleton className="h-6 w-2/3" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
                    <Skeleton className="h-24 w-full" />
                    <Skeleton className="h-24 w-full" />
                    <Skeleton className="h-24 w-full" />
                    <Skeleton className="h-24 w-full" />
                </div>
                <Skeleton className="h-40 w-full mt-8" />
                <Skeleton className="h-40 w-full" />
            </div>
      </div>
    );
  }

  // If we are on the correct page for the auth state, render the children.
  return <>{children}</>;
}
