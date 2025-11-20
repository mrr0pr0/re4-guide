export default function SearchPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Search</h1>
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search guides, bosses, treasures, weapons..."
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="text-gray-600">
        <p>Enter a search term to find content across the guide.</p>
      </div>
    </div>
  );
}