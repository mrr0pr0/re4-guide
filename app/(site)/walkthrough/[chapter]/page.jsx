export default function ChapterPage({ params }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Chapter: {params.chapter}</h1>
      <div className="prose max-w-none">
        <p>Detailed walkthrough for chapter {params.chapter} will be displayed here.</p>
      </div>
    </div>
  );
}