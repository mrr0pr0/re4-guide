export default function BossDetailPage({ params }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Boss: {params.slug}</h1>
      <div className="prose max-w-none">
        <p>Detailed boss guide for {params.slug} will be displayed here.</p>
      </div>
    </div>
  );
}