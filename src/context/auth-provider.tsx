'use client';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/lib/firebase';
import { Skeleton } from '@/components/ui/skeleton';

interface AuthContextType {
  user: User | null;
  loading: boolean;
}

// Mock user for bypassing authentication
const mockUser: User = {
  uid: 'mock-user-id',
  email: 'test.user@example.com',
  emailVerified: true,
  isAnonymous: false,
  providerData: [],
  metadata: {},
  providerId: 'password',
  tenantId: null,
  displayName: 'Mock User',
  photoURL: null,
  phoneNumber: null,
  refreshToken: '',
  toJSON: () => ({}),
};


const AuthContext = createContext<AuthContextType>({ user: null, loading: true });

export function AuthProvider({ children }: { children: ReactNode }) {
  // We will no longer check with firebase, but we'll keep the loading state
  // to prevent flashes of un-styled content. For a very brief moment, the app
  // will show a loading skeleton, then the mocked user will be set.
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a successful authentication check.
    const timer = setTimeout(() => {
      setUser(mockUser);
      setLoading(false);
    }, 50); // A small delay to ensure a smooth transition

    return () => clearTimeout(timer);
  }, []);

  const value = { user, loading };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
          <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <div className="container flex h-16 items-center">
                  <Skeleton className="h-8 w-32" />
                  <div className="flex flex-1 items-center justify-end space-x-4">
                      <Skeleton className="h-8 w-24" />
                      <Skeleton className="h-8 w-20" />
                  </div>
              </div>
          </header>
          <main className="flex-grow container mx-auto py-8 px-4">
               <div className="space-y-4">
                <Skeleton className="h-12 w-1/3" />
                <Skeleton className="h-6 w-2/3" />
            </div>
          </main>
      </div>
    )
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
