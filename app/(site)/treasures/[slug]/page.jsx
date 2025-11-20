import { supabase } from "@/lib/supabaseClient";
import { notFound } from "next/navigation";
import Image from "next/image";

export const revalidate = 60;

async function getTreasure(slug) {
  const { data, error } = await supabase
    .from("treasures")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !data) {
    return null;
  }

  return data;
}

export default async function TreasureDetailPage({ params }) {
  const treasure = await getTreasure(params.slug);

  if (!treasure) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-4xl font-bold mb-2">{treasure.name}</h1>
        <p className="text-lg text-gray-600 capitalize">{treasure.type || "Treasure"}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {treasure.image_url && (
          <div className="relative w-full h-64 rounded-lg shadow-lg">
            <Image
              src={treasure.image_url}
              alt={treasure.name}
              fill
              style={{ objectFit: "cover" }}
              priority
            />
          </div>
        )}

        <div>
          {treasure.description && (
            <div className="mb-4">
              <h2 className="text-2xl font-semibold mb-2">Description</h2>
              <p className="text-gray-700">{treasure.description}</p>
            </div>
          )}

          <div className="mb-4">
            <h3 className="text-xl font-semibold mb-2">Value</h3>
            <p className="text-2xl font-bold text-green-600">{treasure.value} Pesetas</p>
          </div>

          {treasure.chapter && (
            <div className="mb-4">
              <h3 className="text-xl font-semibold mb-2">Chapter</h3>
              <p className="text-gray-700">Chapter {treasure.chapter}</p>
            </div>
          )}

          {treasure.location && (
            <div className="mb-4">
              <h3 className="text-xl font-semibold mb-2">Location</h3>
              <p className="text-gray-700">{treasure.location}</p>
            </div>
          )}

          {treasure.map_coordinates && Object.keys(treasure.map_coordinates).length > 0 && (
            <div className="mb-4">
              <h3 className="text-xl font-semibold mb-2">Map Coordinates</h3>
              <div className="bg-gray-100 p-4 rounded">
                {Object.entries(treasure.map_coordinates).map(([key, value]) => (
                  <p key={key} className="text-gray-700">
                    <span className="font-semibold capitalize">{key}:</span> {value}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
