import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";

export const revalidate = 60;

async function getBosses() {
  const { data, error } = await supabase
    .from("bosses")
    .select("*")
    .order("chapter", { ascending: true });

  if (error) {
    console.error("Error fetching bosses:", error);
    return [];
  }

  return data || [];
}

export default async function BossesPage() {
  const bosses = await getBosses();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Boss Guides</h1>
      <p className="text-gray-600 mb-8">
        Strategies and tips for defeating all bosses in Resident Evil 4.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bosses.length > 0 ? (
          bosses.map((boss) => (
            <Link
              key={boss.id}
              href={`/bosses/${boss.slug}`}
              className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow overflow-hidden"
            >
              {boss.image_url && (
                <div className="relative w-full h-48">
                  <Image
                    src={boss.image_url}
                    alt={boss.name}
                    fill
                    style={{ objectFit: "cover" }}
                    priority
                  />
                </div>
              )}

              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{boss.name}</h2>
                {boss.chapter && (
                  <p className="text-sm text-gray-500 mb-2">
                    Chapter {boss.chapter}
                  </p>
                )}
                {boss.description && (
                  <p className="text-gray-600 text-sm line-clamp-3">
                    {boss.description}
                  </p>
                )}
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-full p-6 bg-white rounded-lg shadow">
            <p className="text-gray-600">
              No bosses available yet. Check back soon!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
