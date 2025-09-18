
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Briefcase, Sparkles, PlusCircle, Shield, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Logo } from './icons';
import { cn } from '@/lib/utils';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Menu } from 'lucide-react';
import { useState } from 'react';


const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard className="h-4 w-4" /> },
    { href: '/internships', label: 'Internships', icon: <Briefcase className="h-4 w-4" /> },
    { href: '/recommendations', label: 'AI Matches', icon: <Sparkles className="h-4 w-4" /> },
    { href: '/profile', label: 'Student Profile', icon: <User className="h-4 w-4" /> },
    { href: '/post-internship', label: 'Post Job', icon: <PlusCircle className="h-4 w-4" /> },
    { href: '/admin', label: 'Admin', icon: <Shield className="h-4 w-4" /> },
];

export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const NavLinks = ({ isMobile = false }: { isMobile?: boolean }) => (
    <nav className={cn("items-center space-x-6 text-sm font-medium", isMobile ? 'flex flex-col space-x-0 space-y-4 pt-6' : 'hidden md:flex')}>
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          onClick={() => isMobile && setMobileMenuOpen(false)}
          className={cn(
            'transition-colors hover:text-primary flex items-center gap-2',
            pathname === item.href ? 'text-primary' : 'text-muted-foreground'
          )}
        >
          {isMobile && item.icon}
          <span>{item.label}</span>
        </Link>
      ))}
    </nav>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Logo />
          <span className="font-bold font-headline">PMInternMatch</span>
        </Link>
        
        <NavLinks />

        <div className="flex flex-1 items-center justify-end space-x-4">
            <Sheet open={isMobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <Link href="/" className="mr-6 flex items-center space-x-2 mb-6">
                  <Logo />
                  <span className="font-bold font-headline">PMInternMatch</span>
                </Link>
                <NavLinks isMobile />
              </SheetContent>
            </Sheet>
        </div>
      </div>
    </header>
  );
}
