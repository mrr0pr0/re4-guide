export default function AreaMapPage({ params }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Map: {params.area}</h1>
      <div className="prose max-w-none">
        <p>Interactive map for {params.area} will be displayed here.</p>
      </div>
    </div>
  );
}