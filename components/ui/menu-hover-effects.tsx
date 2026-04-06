"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { HashLink } from '@/components/hash-link';

export const menuItems = [
  { label: 'SERVICES', href: '#services', isHash: true },
  { label: 'WORK', href: '#work', isHash: true },
  { label: 'TEAM', href: '#team', isHash: true },
  { label: 'CONTACT', href: '/contact', isHash: false },
];

export default function NavMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="relative z-50 pointer-events-auto">
      {/* Mobile menu toggle button - only visible on small screens */}
      <button 
        onClick={toggleMenu}
        className="lg:hidden relative z-[60] p-2 flex flex-col items-center justify-center w-8 h-8"
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
      >
        <div className={`w-6 h-0.5 bg-white mb-1.5 transition-transform duration-300 ${isMenuOpen ? 'transform rotate-45 translate-y-2' : ''}`}></div>
        <div className={`w-6 h-0.5 bg-white mb-1.5 transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></div>
        <div className={`w-6 h-0.5 bg-white transition-transform duration-300 ${isMenuOpen ? 'transform -rotate-45 -translate-y-2' : ''}`}></div>
      </button>
      
      {/* Menu container - adapts to screen size */}
      <div className={`
        fixed inset-0 z-[50] bg-black/95 backdrop-blur-md flex flex-col items-center justify-center w-full h-screen
        lg:static lg:z-auto lg:bg-transparent lg:backdrop-blur-none lg:flex lg:flex-row lg:items-center lg:justify-end lg:w-auto lg:h-auto lg:p-0
        transition-all duration-300 ease-in-out
        ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible lg:opacity-100 lg:visible'}
      `}>
        <ul className={`
          flex flex-col items-center space-y-8
          lg:flex-row lg:space-y-0 lg:space-x-6
        `}>
          {menuItems.map((item) => {
            const LinkComponent = item.isHash ? HashLink : Link;
            return (
              <li key={item.label} className="list-none">
                <LinkComponent 
                  href={item.href} 
                  className="relative inline-block group"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {/* Link text */}
                  <span className="
                    relative z-10 block uppercase text-white/60 
                    font-mono font-medium transition-colors duration-300 
                    group-hover:text-black
                    text-2xl py-3 px-6 tracking-[0.1em]
                    lg:text-[11px] lg:py-2 lg:px-4 lg:tracking-wider
                    glitch-hover
                  ">
                    {item.label}
                  </span>
                  {/* Top & bottom border animation */}
                  <span className="
                    absolute inset-0 border-t-2 border-b-2 border-white
                    transform scale-y-[2] opacity-0 
                    transition-all duration-300 origin-center
                    group-hover:scale-y-100 group-hover:opacity-100
                  " />
                  {/* Background fill animation */}
                  <span className="
                    absolute top-[2px] left-0 w-full h-[calc(100%-4px)] bg-white
                    transform scale-0 opacity-0
                    transition-all duration-300 origin-top
                    group-hover:scale-100 group-hover:opacity-100
                  " />
                </LinkComponent>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}