import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">Resident Evil 4 Guide</h1>
      <p className="text-lg text-gray-600 mb-8">
        Welcome to the comprehensive guide for Resident Evil 4. Explore walkthroughs, boss strategies, treasure locations, and weapon information.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link href="/walkthrough" className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-2">Walkthrough</h2>
          <p className="text-gray-600">Complete chapter-by-chapter guide</p>
        </Link>
        <Link href="/bosses" className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-2">Bosses</h2>
          <p className="text-gray-600">Boss fight strategies and tips</p>
        </Link>
        <Link href="/treasures" className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-2">Treasures</h2>
          <p className="text-gray-600">Find all collectible treasures</p>
        </Link>
        <Link href="/weapons" className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-2">Weapons</h2>
          <p className="text-gray-600">Weapon stats and upgrades</p>
        </Link>
      </div>
    </div>
  );
}
