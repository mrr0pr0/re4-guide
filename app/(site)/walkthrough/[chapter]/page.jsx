import { supabase } from "@/lib/supabaseClient";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";

export const revalidate = 60;

async function getChapter(slug) {
  const { data, error } = await supabase
    .from('chapters')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !data) {
    return null;
  }

  return data;
}

export default async function ChapterPage({ params }) {
  const chapter = await getChapter(params.chapter);

  if (!chapter) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-4xl font-bold mb-2">
          Chapter {chapter.chapter_number}: {chapter.title}
        </h1>
        {chapter.description && (
          <p className="text-lg text-gray-600">{chapter.description}</p>
        )}
      </div>
      {chapter.thumbnail_url && (
        <img
          src={chapter.thumbnail_url}
          alt={chapter.title}
          className="w-full max-w-2xl rounded-lg shadow-lg mb-8"
        />
      )}
      <div className="prose max-w-none">
        <ReactMarkdown>{chapter.content}</ReactMarkdown>
      </div>
    </div>
  );
}