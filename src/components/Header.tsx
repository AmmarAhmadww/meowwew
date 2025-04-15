import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const Logo3D = dynamic(() => import('@/components/Logo3D'), { ssr: false });

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Skills', href: '/skills' },
  { name: 'Qualifications', href: '/qualifications' },
  { name: 'Projects', href: '/projects' },
  { name: 'Contact', href: '/contact' },
  { name: 'Feedback', href: '/feedback' },
];

const Header = () => {

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-8 h-8"> {/* Adjust size as needed */}
            <Logo3D />
          </div>
          <span className="font-bold hidden sm:inline-block">Portfolio</span>
        </Link>
        <nav className="hidden md:flex gap-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {item.name}
            </Link>
          ))}
        </nav>
        {/* TODO: Add Mobile Menu */}
        <div className="md:hidden">
          {/* Placeholder for mobile menu button */}
          <button>Menu</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
