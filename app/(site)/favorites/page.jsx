export default function FavoritesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Favorites</h1>
      <p className="text-gray-600 mb-8">
        Your bookmarked guides and content.
      </p>
      <div className="p-6 bg-white rounded-lg shadow">
        <p className="text-gray-600">No favorites yet. Start exploring and bookmark your favorite guides!</p>
      </div>
    </div>
  );
}