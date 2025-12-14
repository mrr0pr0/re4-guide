'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function SiteHeader() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { href: '/walkthrough', label: 'Walkthrough' },
    { href: '/bosses', label: 'Bosses' },
    { href: '/treasures', label: 'Treasures' },
    { href: '/weapons', label: 'Weapons' },
  ];

  const isActive = (href) => pathname?.startsWith(href);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 group">
          <span className="text-xl font-bold text-red-500 group-hover:text-red-600 transition-colors">
            RE4 Guide
          </span>

        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-md ${
                isActive(item.href)
                  ? 'text-primary bg-primary/10'
                  : 'text-foreground/70 hover:text-foreground hover:bg-accent/50'
              }`}
            >
              {item.label}
              {isActive(item.href) && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent" />
              )}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-foreground/70 hover:text-foreground hover:bg-accent/50 rounded-md transition-colors"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur-xl">
          <nav className="container py-4 flex flex-col space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-3 text-sm font-medium transition-all duration-300 rounded-md ${
                  isActive(item.href)
                    ? 'text-primary bg-primary/10 border-l-4 border-primary'
                    : 'text-foreground/70 hover:text-foreground hover:bg-accent/50'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}