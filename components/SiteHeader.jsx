import Link from 'next/link';

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block text-primary text-xl">
              RE4 GUIDE
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              href="/walkthrough"
              className="transition-colors hover:text-foreground/80 text-foreground/60 hover:underline decoration-primary decoration-2 underline-offset-4"
            >
              Walkthrough
            </Link>
            <Link
              href="/bosses"
              className="transition-colors hover:text-foreground/80 text-foreground/60 hover:underline decoration-primary decoration-2 underline-offset-4"
            >
              Bosses
            </Link>
            <Link
              href="/treasures"
              className="transition-colors hover:text-foreground/80 text-foreground/60 hover:underline decoration-primary decoration-2 underline-offset-4"
            >
              Treasures
            </Link>
            <Link
              href="/weapons"
              className="transition-colors hover:text-foreground/80 text-foreground/60 hover:underline decoration-primary decoration-2 underline-offset-4"
            >
              Weapons
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
