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
      <h1 className="text-4xl font-bold mb-6 text-foreground">Walkthrough</h1>
      <p className="text-muted-foreground mb-8">
        Complete chapter-by-chapter walkthrough for Resident Evil 4.
      </p>

      <div className="grid gap-4">
        {chapters.length > 0 ? (
          chapters.map((chapter) => (
            <Link
              key={chapter.id}
              href={`/walkthrough/${chapter.slug}`}
              className="p-6 bg-card rounded-lg shadow-lg hover:shadow-xl transition-all hover:scale-[1.01] border border-border"
            >
              <div className="flex items-start gap-6">
                {chapter.thumbnail_url && (
                  <div className="relative w-[200px] h-[200px] rounded overflow-hidden flex-shrink-0">
                    <Image
                      src={chapter.thumbnail_url}
                      alt={chapter.title}
                      fill
                      style={{ objectFit: "cover" }}
                      priority
                    />
                  </div>
                )}
                <div className="flex-1">
                  <h2 className="text-2xl font-semibold mb-2 text-foreground">
                    Chapter {chapter.chapter_number}: {chapter.title}
                  </h2>
                  {chapter.description && (
                    <p className="text-muted-foreground">{chapter.description}</p>
                  )}
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="p-6 bg-card rounded-lg shadow-lg border border-border">
            <p className="text-muted-foreground">
              No chapters available yet. Check back soon!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
