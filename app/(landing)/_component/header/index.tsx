"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, User } from 'lucide-react';
import MainMenu from './main-menu';
import MobileMenu from './mobile-menu';
import { usePathname } from 'next/navigation';
import Image from 'next/image';


const Header = () => {
  const [navbar, setNavbar] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname()
  const IsCheck = (pathname.startsWith('/check') || pathname.startsWith('/become-checker'))
  const changeBackground = () => {
    if (window.scrollY >= 10) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeBackground);
    return () => window.removeEventListener("scroll", changeBackground);
  }, []);

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        IsCheck ? "bg-gray-900/95 backdrop-blur-sm shadow-lg" : navbar ? "bg-gray-900/95 backdrop-blur-sm shadow-lg" : "bg-transparent"
        
      }`}>
        <div className="max-w-7xl mx-auto px-6 sm:px-4">
          <div className="flex justify-between items-center h-16 md:h-20">
            <div className="flex items-center">
              <Link href="/" className="flex items-center mr-8">
                <div className='relative h-8 w-8' >
                  <Image
                   src="/img/logo1.png"
                   fill
                   sizes='864px'
                   className=' object-cover'
                   alt='Checkerist'
                   priority
                  />
                </div>
                <span className="text-white text-xl font-bold">CheckerIst</span>
              </Link>
              
              {/* Desktop Menu */}
              <div className="hidden xl:block">
                <MainMenu style="text-white" />
              </div>
            </div>

            <div className="flex items-center">
              {/* Desktop Auth Buttons */}
              <div className="hidden md:flex items-center space-x-4">
                <Link
                  href="/become-checker"
                  className="bg-white text-gray-900 px-6 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors duration-200"
                >
                  Become Checker
                </Link>
                <Link
                  href="/sign-in"
                  className="border border-white text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-white/10 transition-colors duration-200"
                >
                  Sign In / Register
                </Link>
              </div>

              {/* Mobile Menu Icons */}
              <div className="flex xl:hidden items-center space-x-4 ml-4">
                <Link
                  href="/sign-in"
                  className="text-white hover:text-gray-300 transition-colors duration-200"
                >
                  <User className="h-6 w-6" />
                </Link>
                <button
                  className="text-white hover:text-gray-300 transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(true)}
                >
                  <Menu className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full w-full max-w-sm bg-white shadow-xl">
            <MobileMenu onClose={() => setIsMobileMenuOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
