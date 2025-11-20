import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";

export const revalidate = 60; // Revalidate every 60 seconds

async function getChapters() {
  const { data, error } = await supabase
    .from("chapters")
    .select("*")
    .order("chapter_number", { ascending: true });

  if (error) {
    console.error("Error fetching chapters:", error);
    return [];
  }

  return data || [];
}

export default async function WalkthroughPage() {
  const chapters = await getChapters();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Walkthrough</h1>
      <p className="text-gray-600 mb-8">
        Complete chapter-by-chapter walkthrough for Resident Evil 4.
      </p>

      <div className="grid gap-4">
        {chapters.length > 0 ? (
          chapters.map((chapter) => (
            <Link
              key={chapter.id}
              href={`/walkthrough/${chapter.slug}`}
              className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start gap-4">
                {chapter.thumbnail_url && (
                  <div className="relative w-24 h-24 rounded overflow-hidden">
                    <Image
                      src={chapter.thumbnail_url}
                      alt={chapter.title}
                      fill
                      style={{ objectFit: "cover" }}
                      priority
                    />
                  </div>
                )}
                <div>
                  <h2 className="text-2xl font-semibold mb-2">
                    Chapter {chapter.chapter_number}: {chapter.title}
                  </h2>
                  {chapter.description && (
                    <p className="text-gray-600">{chapter.description}</p>
                  )}
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="p-6 bg-white rounded-lg shadow">
            <p className="text-gray-600">
              No chapters available yet. Check back soon!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
