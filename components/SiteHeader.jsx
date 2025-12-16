'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function SiteHeader() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const authLinks = [
    { href: '/login', label: 'Log in', variant: 'ghost' },
    { href: '/signup', label: 'Sign up', variant: 'primary' },
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

        {/* Desktop Auth Actions */}
        <div className="hidden md:flex items-center space-x-3">
          {authLinks.map((item) => {
            const baseClasses = 'px-4 py-2 text-sm font-medium rounded-md transition-all duration-300';
            const variantClasses =
              item.variant === 'primary'
                ? 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm'
                : 'text-foreground/80 hover:text-foreground hover:bg-accent/50 border border-border/60';

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`${baseClasses} ${variantClasses} ${
                  isActive(item.href) ? 'ring-2 ring-primary/40 ring-offset-2 ring-offset-background' : ''
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

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
            {authLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-3 text-sm font-medium transition-all duration-300 rounded-md ${
                  item.variant === 'primary'
                    ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                    : 'text-foreground/80 hover:text-foreground hover:bg-accent/50 border border-border/60'
                } ${isActive(item.href) ? 'ring-2 ring-primary/40' : ''}`}
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