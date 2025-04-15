'use client'; // Required for next/dynamic with ssr: false


import React from 'react';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Menu, X } from 'lucide-react';

import { gsap } from 'gsap';
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

  const [isScrolled, setIsScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10); // Trigger effect after scrolling 10px
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (headerRef.current) {
      gsap.to(headerRef.current, {
        backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 255, 255, 0.95)', // Adjust based on light/dark mode needs
        boxShadow: isScrolled ? '0 2px 4px rgba(0,0,0,0.1)' : 'none',
        duration: 0.3,
        ease: 'power2.out'
      });
    }
  }, [isScrolled]);



  useEffect(() => {
    if (mobileMenuRef.current) {
      gsap.to(mobileMenuRef.current, {
        height: isMobileMenuOpen ? 'auto' : 0,
        opacity: isMobileMenuOpen ? 1 : 0,
        duration: 0.3,
        ease: 'power2.out',
        onComplete: () => {
          if (mobileMenuRef.current && isMobileMenuOpen) {
            mobileMenuRef.current.style.height = 'auto';
          }
        },
        onStart: () => {
          if (mobileMenuRef.current && !isMobileMenuOpen) {
          }
        }
      });
    }
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const mobileMenuRef = useRef<HTMLDivElement>(null);
  return (
    <header ref={headerRef} className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">

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
        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMobileMenu}
            className="inline-flex items-center justify-center p-2 rounded-md text-muted-foreground hover:text-primary hover:bg-accent focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
            aria-expanded={isMobileMenuOpen}
          >
            <span className="sr-only">Open main menu</span>
            {isMobileMenuOpen ? (
              <X className="block h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="block h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <div
        ref={mobileMenuRef}
        className="md:hidden overflow-hidden" // overflow-hidden is crucial for height animation
        style={{ height: 0, opacity: 0 }} // Initial styles for animation
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={toggleMobileMenu} // Close menu on link click
              className="block px-3 py-2 rounded-md text-base font-medium text-muted-foreground hover:text-primary hover:bg-accent"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
