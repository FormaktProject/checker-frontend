"use client"
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import MainMenu from "./main-menu";
import MobileMenu from "./mobile-menu";
import { usePathname } from "next/navigation";
import Image from "next/image";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Pages that always use the solid dark background (non-hero pages)
  const alwaysSolid =
    //pathname.startsWith("/check") ||
    pathname.startsWith("/become-checker") ||
    pathname.startsWith("/travel-agent") ||
    pathname.startsWith("/blog") ||
    pathname.startsWith("/safety") ||
    pathname.startsWith("/sign-in");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY >= 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isSolid = alwaysSolid || scrolled;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          isSolid
            ? "bg-gray-900/95 backdrop-blur-md shadow-lg "
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">

            {/* ── Logo ── */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center gap-2 mr-8">
                <div className="relative h-8 w-8">
                  <Image
                    src="/img/logo1.png"
                    width={864}
                    height={400}
                    sizes="(max-width: 768px) 100vw, 64px"
                    className="object-cover"
                    alt="Verified accommodation inspection by local expert — CheckerIst"
                    priority
                    quality={85}
                  />
                </div>
                <span className={`text-lg md:text-xl font-bold tracking-tight transition-colors duration-300 ${isSolid ? "text-white" : "text-gray-900"}`}>
                  CheckerIst
                </span>
              </Link>

              {/* Desktop Menu */}
              <div className="hidden xl:block">
                <MainMenu isSolid={isSolid} />
              </div>
            </div>

            {/* ── Right side ── */}
            <div className="flex items-center gap-3">

              {/* Desktop CTAs */}
              <div className="hidden md:flex items-center gap-3">
                <Link
                  href="/become-checker"
                  className="bg-[#16977d] hover:bg-[#186757] text-white px-5 py-2 rounded-lg text-sm font-semibold transition-colors duration-200 shadow-sm shadow-[#2cc2a5]/30"
                >
                  Become Early Checker
                </Link>
                <Link
                  href="/sign-in"
                  className={`px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 border ${
                    isSolid
                      ? "border-white/30 text-white/90 hover:text-white hover:border-white/60 hover:bg-white/10"
                      : "border-gray-300 text-gray-700 hover:border-[#2cc2a5] hover:text-[#2cc2a5] hover:bg-[#2cc2a5]/5"
                  }`}
                >
                  Sign In / Register
                </Link>
              </div>

              {/* Mobile CTAs + Hamburger */}
              <div className="flex xl:hidden items-center gap-2">
                <Link
                  href="/become-checker"
                  className="bg-[#2cc2a5] hover:bg-[#1f8a75] text-white px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-colors duration-200"
                >
                  Become Checker
                </Link>
                <button
                  name="menu-mobile"
                  aria-label="Open menu"
                  onClick={() => setIsMobileMenuOpen(true)}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    isSolid
                      ? "text-white hover:text-[#2cc2a5] hover:bg-white/10"
                      : "text-gray-700 hover:text-[#2cc2a5] hover:bg-[#2cc2a5]/10"
                  }`}
                >
                  <Menu className="h-5 w-5" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </header>

      {/* ── Mobile Menu Overlay ── */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[100]">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          {/* Drawer */}
          <div className="absolute left-0 top-0 h-full w-full max-w-sm bg-white shadow-2xl">
            <MobileMenu onClose={() => setIsMobileMenuOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
};

export default Header;