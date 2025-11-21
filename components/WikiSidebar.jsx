import Link from 'next/link';

export default function WikiSidebar() {
    return (
        <aside className="hidden w-full flex-col md:flex border-r border-border min-h-[calc(100vh-3.5rem)] bg-card sticky top-14">
            <div className="py-6 pr-6 pl-4 lg:py-8">
                <h3 className="font-bold text-lg mb-4 text-primary border-b border-border pb-2">
                    WIKI GUIDE
                </h3>
                <nav className="flex flex-col space-y-2 text-sm">
                    <Link
                        href="/walkthrough"
                        className="block p-2 hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
                    >
                        Walkthrough
                    </Link>
                    <Link
                        href="/bosses"
                        className="block p-2 hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
                    >
                        Bosses
                    </Link>
                    <Link
                        href="/treasures"
                        className="block p-2 hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
                    >
                        Treasures
                    </Link>
                    <Link
                        href="/weapons"
                        className="block p-2 hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
                    >
                        Weapons
                    </Link>
                    <Link
                        href="/maps"
                        className="block p-2 hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
                    >
                        Interactive Maps
                    </Link>
                </nav>
            </div>
        </aside>
    );
}
