export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">About This Guide</h1>
      <div className="prose max-w-none">
        <p className="text-lg mb-4">
          This is a comprehensive guide for Resident Evil 4, covering all aspects of the game including walkthroughs, boss strategies, treasure locations, and weapon information.
        </p>
        <h2 className="text-2xl font-semibold mt-6 mb-3">Features</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Complete chapter-by-chapter walkthrough</li>
          <li>Detailed boss fight strategies</li>
          <li>Treasure location maps</li>
          <li>Weapon stats and upgrade paths</li>
          <li>Interactive maps</li>
        </ul>
      </div>
    </div>
  );
}