import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function HomePage() {
  const sections = [
    {
      href: '/walkthrough',
      title: 'Walkthrough',
      description: 'Step-by-step guide for all 16 chapters.',
      image: 'https://res.cloudinary.com/dxeuo6xas/image/upload/v1763714528/walkthore_utvlcg.webp',
      gradient: 'from-blue-600/20 to-purple-600/20',
    },
    {
      href: '/bosses',
      title: 'Bosses',
      description: 'How to defeat Del Lago, El Gigante, and more.',
      image: 'https://res.cloudinary.com/dxeuo6xas/image/upload/v1763714632/bossescober_gnhimx.jpg',
      gradient: 'from-red-600/20 to-orange-600/20',
    },
    {
      href: '/weapons',
      title: 'Weapons',
      description: 'Stats, upgrades, and locations for all guns.',
      image: 'https://res.cloudinary.com/dxeuo6xas/image/upload/v1763714731/sg-09r_wqqr8z.png',
      gradient: 'from-yellow-600/20 to-amber-600/20',
    },
    {
      href: '/treasures',
      title: 'Treasures',
      description: 'Maps and locations for all collectibles.',
      image: 'https://res.cloudinary.com/dxeuo6xas/image/upload/v1763714795/tresusers_pa4zxa.avif',
      gradient: 'from-green-600/20 to-emerald-600/20',
    },
    {
      href: '/merchant-requests',
      title: 'Merchant Requests',
      description: 'Guide to all blue medallion quests.',
      image: 'https://res.cloudinary.com/dxeuo6xas/image/upload/v1763714858/merthant_zcmjf1.jpg',
      gradient: 'from-purple-600/20 to-pink-600/20',
    },
    {
      href: '/puzzles',
      title: 'Puzzle Solutions',
      description: 'Solutions for the church dial, hex pieces, and more.',
      image: 'https://res.cloudinary.com/dxeuo6xas/image/upload/v1763714944/puzle_nohxev.avif',
      gradient: 'from-cyan-600/20 to-blue-600/20',
    },
  ];

  return (
    <div className="space-y-12 pb-12">
      {/* Hero Section with Enhanced Effects */}
      <div className="relative h-[500px] w-full overflow-hidden rounded-xl glass group">
        <Link href="/walkthrough" className="absolute inset-0">
          <Image
            src="https://res.cloudinary.com/dxeuo6xas/image/upload/v1763713649/cover_doosru.jpg"
            alt="Resident Evil 4 Remake Hero"
            fill
            className="object-cover transition-all duration-700 group-hover:scale-110"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </Link>
        
        <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12">
          <div className="max-w-3xl space-y-4">
            <h1 className="mb-8 text-3xl font-bold text-red-500 border-l-4 border-primary pl-6 animate-fade-in-up stagger-4">
              Resident Evil 4 Remake
            </h1>
            <p className="text-xl lg:text-2xl text-foreground/90 font-medium animate-fade-in-up stagger-1">
              Complete Guide & Walkthrough
            </p>
            <Link 
              href="/walkthrough" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/50 animate-fade-in-up stagger-2"
            >
              Start Walkthrough
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Intro Text with Better Typography */}
      <div className="glass-hover rounded-xl p-8 lg:p-10 animate-fade-in-up stagger-3">
        <div className="flex items-start gap-3 mb-4">
          <Sparkles className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
          <div className="space-y-4">
            <p className="text-lg lg:text-xl leading-relaxed text-foreground/90">
              Welcome to the most comprehensive <strong className="text-primary">Resident Evil 4 Remake</strong> guide. 
              This resource covers everything you need to survive the horror, including a complete{' '}
              <Link href="/walkthrough" className="text-primary hover:underline decoration-2 underline-offset-4 transition-all">
                Walkthrough
              </Link>{' '}
              of every chapter, strategies for defeating every{' '}
              <Link href="/bosses" className="text-primary hover:underline decoration-2 underline-offset-4 transition-all">
                Boss
              </Link>
              , locations for all{' '}
              <Link href="/treasures" className="text-primary hover:underline decoration-2 underline-offset-4 transition-all">
                Treasures
              </Link>{' '}
              and{' '}
              <Link href="/weapons" className="text-primary hover:underline decoration-2 underline-offset-4 transition-all">
                Weapons
              </Link>
              , and solutions to every puzzle.
            </p>
            <p className="text-base text-muted-foreground">
              Whether you&apos;re a first-time player or a veteran seeking 100% completion, this guide has you covered.
            </p>
          </div>
        </div>
      </div>

      {/* Guide Sections Grid with Enhanced Cards */}
      <div>
        <h2 className="mb-8 text-3xl font-bold text-red-500 border-l-4 border-primary pl-6 animate-fade-in-up stagger-4">
          Explore the Guide
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sections.map((section, index) => (
            <Link
              key={section.href}
              href={section.href}
              className={`group overflow-hidden rounded-xl glass glass-hover card-lift animate-fade-in-up stagger-${index + 1}`}
            >
              <div className="aspect-video w-full relative overflow-hidden">
                <Image
                  src={section.image}
                  alt={section.title}
                  fill
                  className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
                />
                <div className={`absolute inset-0 bg-gradient-to-br ${section.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300 mb-2">
                  {section.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {section.description}
                </p>
                <div className="flex items-center gap-2 text-primary font-medium text-sm group-hover:gap-3 transition-all duration-300">
                  View Guide
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}