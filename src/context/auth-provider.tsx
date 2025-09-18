'use client';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/lib/firebase';
import { Skeleton } from '@/components/ui/skeleton';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: () => void;
  signOut: () => void;
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


const AuthContext = createContext<AuthContextType>({ user: null, loading: false, signIn: () => {}, signOut: () => {} });

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(mockUser);
  const [loading, setLoading] = useState(false);

  const signIn = () => {
    setLoading(true);
    setTimeout(() => {
        setUser(mockUser);
        setLoading(false);
    }, 250);
  };

  const signOut = () => {
    setLoading(true);
    setTimeout(() => {
        setUser(null);
        setLoading(false);
    }, 250);
  };

  const value = { user, loading, signIn, signOut };

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
