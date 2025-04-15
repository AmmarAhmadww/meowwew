'use client'; // Required for next/dynamic with ssr: false


import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Github, Linkedin, Twitter } from 'lucide-react'; // Example social icons

const Logo3D = dynamic(() => import('@/components/Logo3D'), { ssr: false });

const Footer = () => {
  return (
    <footer className="py-6 md:px-8 md:py-0 border-t bg-background">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <div className="flex items-center gap-2">
           <div className="w-6 h-6"> {/* Adjust size */}
             <Logo3D />
           </div>
           <p className="text-center text-sm text-muted-foreground md:text-left">
             © {new Date().getFullYear()} Your Name Here. All rights reserved.
           </p>
        </div>
        <div className="flex gap-4">
          {/* Replace with actual social links */}
          <Link href="https://github.com" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary">
            <Github size={20} />
          </Link>
          <Link href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary">
            <Linkedin size={20} />
          </Link>
          <Link href="https://twitter.com" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary">
            <Twitter size={20} />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
