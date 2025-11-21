import Link from 'next/link';


export default function HomePage() {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative h-[400px] w-full overflow-hidden rounded-lg bg-muted">
        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
          <span className="text-lg">Hero Image Placeholder (1200x400)</span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background to-transparent p-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white lg:text-5xl drop-shadow-md">
            Resident Evil 4 Remake Guide
          </h1>
        </div>
      </div>

      {/* Intro Text */}
      <div className="prose prose-invert max-w-none">
        <p className="text-xl leading-relaxed text-muted-foreground">
          Welcome to the comprehensive <strong>Resident Evil 4 Remake Wiki Guide</strong>. This guide covers everything you need to survive the horror, including a complete <Link href="/walkthrough" className="text-primary hover:underline">Walkthrough</Link> of every chapter, strategies for defeating every <Link href="/bosses" className="text-primary hover:underline">Boss</Link>, locations for all <Link href="/treasures" className="text-primary hover:underline">Treasures</Link> and <Link href="/weapons" className="text-primary hover:underline">Weapons</Link>, and solutions to every puzzle.
        </p>
      </div>

      {/* Guide Sections Grid */}
      <div>
        <h2 className="mb-6 text-2xl font-bold text-primary border-l-4 border-primary pl-4">
          Guide Sections
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Walkthrough Card */}
          <Link href="/walkthrough" className="group overflow-hidden rounded-lg border border-border bg-card transition-colors hover:border-primary">
            <div className="aspect-video w-full bg-muted relative flex items-center justify-center text-muted-foreground">
              <span>Walkthrough Image</span>
            </div>
            <div className="p-4">
              <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">Walkthrough</h3>
              <p className="mt-2 text-sm text-muted-foreground">Step-by-step guide for all 16 chapters.</p>
            </div>
          </Link>

          {/* Bosses Card */}
          <Link href="/bosses" className="group overflow-hidden rounded-lg border border-border bg-card transition-colors hover:border-primary">
            <div className="aspect-video w-full bg-muted relative flex items-center justify-center text-muted-foreground">
              <span>Bosses Image</span>
            </div>
            <div className="p-4">
              <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">Bosses</h3>
              <p className="mt-2 text-sm text-muted-foreground">How to defeat Del Lago, El Gigante, and more.</p>
            </div>
          </Link>

          {/* Weapons Card */}
          <Link href="/weapons" className="group overflow-hidden rounded-lg border border-border bg-card transition-colors hover:border-primary">
            <div className="aspect-video w-full bg-muted relative flex items-center justify-center text-muted-foreground">
              <span>Weapons Image</span>
            </div>
            <div className="p-4">
              <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">Weapons</h3>
              <p className="mt-2 text-sm text-muted-foreground">Stats, upgrades, and locations for all guns.</p>
            </div>
          </Link>

          {/* Treasures Card */}
          <Link href="/treasures" className="group overflow-hidden rounded-lg border border-border bg-card transition-colors hover:border-primary">
            <div className="aspect-video w-full bg-muted relative flex items-center justify-center text-muted-foreground">
              <span>Treasures Image</span>
            </div>
            <div className="p-4">
              <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">Treasures</h3>
              <p className="mt-2 text-sm text-muted-foreground">Maps and locations for all collectibles.</p>
            </div>
          </Link>

          {/* Requests Card */}
          <Link href="/requests" className="group overflow-hidden rounded-lg border border-border bg-card transition-colors hover:border-primary">
            <div className="aspect-video w-full bg-muted relative flex items-center justify-center text-muted-foreground">
              <span>Requests Image</span>
            </div>
            <div className="p-4">
              <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">Merchant Requests</h3>
              <p className="mt-2 text-sm text-muted-foreground">Guide to all blue medallion quests.</p>
            </div>
          </Link>

          {/* Puzzles Card */}
          <Link href="/puzzles" className="group overflow-hidden rounded-lg border border-border bg-card transition-colors hover:border-primary">
            <div className="aspect-video w-full bg-muted relative flex items-center justify-center text-muted-foreground">
              <span>Puzzles Image</span>
            </div>
            <div className="p-4">
              <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">Puzzle Solutions</h3>
              <p className="mt-2 text-sm text-muted-foreground">Solutions for the church dial, hex pieces, and more.</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
