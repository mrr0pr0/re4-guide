export default function WeaponDetailPage({ params }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Weapon: {params.slug}</h1>
      <div className="prose max-w-none">
        <p>Detailed weapon information for {params.slug} will be displayed here.</p>
      </div>
    </div>
  );
}