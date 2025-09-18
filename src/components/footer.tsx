import Link from 'next/link';
import { Logo } from './icons';

export default function Footer() {
  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Logo />
            <span className="font-bold text-lg font-headline">PMInternMatch</span>
          </div>
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground mb-4 md:mb-0">
            <Link href="/about" className="hover:text-primary transition-colors">About</Link>
          </nav>
        </div>
        <div className="text-center text-sm text-muted-foreground mt-8 border-t pt-4">
          © {new Date().getFullYear()} PMInternMatch. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
