import { supabase } from "@/lib/supabaseClient";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";

export const revalidate = 60;

async function getBoss(slug) {
  const { data, error } = await supabase
    .from('bosses')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !data) {
    return null;
  }

  return data;
}

export default async function BossDetailPage({ params }) {
  const boss = await getBoss(params.slug);

  if (!boss) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-4xl font-bold mb-2">{boss.name}</h1>
        {boss.chapter && (
          <p className="text-lg text-gray-600">Chapter {boss.chapter}</p>
        )}
      </div>
      
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {boss.image_url && (
          <img
            src={boss.image_url}
            alt={boss.name}
            className="w-full rounded-lg shadow-lg"
          />
        )}
        <div>
          {boss.description && (
            <div className="mb-4">
              <h2 className="text-2xl font-semibold mb-2">Description</h2>
              <p className="text-gray-700">{boss.description}</p>
            </div>
          )}
          {boss.health && (
            <div className="mb-4">
              <h3 className="text-xl font-semibold mb-2">Health</h3>
              <p className="text-gray-700">{boss.health} HP</p>
            </div>
          )}
          {boss.weaknesses && Object.keys(boss.weaknesses).length > 0 && (
            <div className="mb-4">
              <h3 className="text-xl font-semibold mb-2">Weaknesses</h3>
              <ul className="list-disc pl-6">
                {Object.entries(boss.weaknesses).map(([key, value]) => (
                  <li key={key} className="text-gray-700">{value}</li>
                ))}
              </ul>
            </div>
          )}
          {boss.rewards && Object.keys(boss.rewards).length > 0 && (
            <div className="mb-4">
              <h3 className="text-xl font-semibold mb-2">Rewards</h3>
              <ul className="list-disc pl-6">
                {Object.entries(boss.rewards).map(([key, value]) => (
                  <li key={key} className="text-gray-700">{value}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {boss.strategy && (
        <div className="prose max-w-none">
          <h2 className="text-2xl font-semibold mb-4">Strategy</h2>
          <ReactMarkdown>{boss.strategy}</ReactMarkdown>
        </div>
      )}

      {boss.video_url && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Video Guide</h2>
          <div className="aspect-video">
            <iframe
              src={boss.video_url}
              className="w-full h-full rounded-lg"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
}