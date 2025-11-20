import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";

export const revalidate = 60;

async function getTreasures() {
  const { data, error } = await supabase
    .from("treasures")
    .select("*")
    .order("chapter", { ascending: true });

  if (error) {
    console.error("Error fetching treasures:", error);
    return [];
  }

  return data || [];
}

export default async function TreasuresPage() {
  const treasures = await getTreasures();

  // Group treasures by chapter
  const treasuresByChapter = treasures.reduce((acc, treasure) => {
    const chapter = treasure.chapter || "Unknown";
    if (!acc[chapter]) {
      acc[chapter] = [];
    }
    acc[chapter].push(treasure);
    return acc;
  }, {});

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Treasure Locations</h1>
      <p className="text-gray-600 mb-8">
        Find all collectible treasures in Resident Evil 4.
      </p>

      {Object.keys(treasuresByChapter).length > 0 ? (
        Object.entries(treasuresByChapter)
          .sort(([a], [b]) => {
            if (a === "Unknown") return 1;
            if (b === "Unknown") return -1;
            return Number(a) - Number(b);
          })
          .map(([chapter, chapterTreasures]) => (
            <div key={chapter} className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                {chapter === "Unknown" ? "Other Treasures" : `Chapter ${chapter}`}
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {chapterTreasures.map((treasure) => (
                  <Link
                    key={treasure.id}
                    href={`/treasures/${treasure.slug}`}
                    className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow overflow-hidden"
                  >
                    {treasure.image_url && (
                      <div className="relative w-full h-48">
                        <Image
                          src={treasure.image_url}
                          alt={treasure.name}
                          fill
                          style={{ objectFit: "cover" }}
                          priority
                        />
                      </div>
                    )}
                    <div className="p-4">
                      <h3 className="text-xl font-semibold mb-2">{treasure.name}</h3>
                      <p className="text-sm text-gray-500 mb-2 capitalize">
                        {treasure.type || "Treasure"}
                      </p>
                      <p className="text-sm text-gray-700 font-semibold">
                        Value: {treasure.value} Pesetas
                      </p>
                      {treasure.location && (
                        <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                          {treasure.location}
                        </p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))
      ) : (
        <div className="p-6 bg-white rounded-lg shadow">
          <p className="text-gray-600">No treasures available yet. Check back soon!</p>
        </div>
      )}
    </div>
  );
}
