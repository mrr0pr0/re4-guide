import { supabase } from "@/lib/supabaseClient";
import { notFound } from "next/navigation";
import Image from "next/image";

export const revalidate = 60;

async function getWeapon(slug) {
  const { data, error } = await supabase
    .from("weapons")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !data) {
    return null;
  }

  return data;
}

export default async function WeaponDetailPage({ params }) {
  const weapon = await getWeapon(params.slug);

  if (!weapon) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-4xl font-bold mb-2">{weapon.name}</h1>
        <p className="text-lg text-gray-600 capitalize">{weapon.type}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {weapon.image_url && (
          <div className="relative w-full h-64 rounded-lg shadow-lg">
            <Image
              src={weapon.image_url}
              alt={weapon.name}
              fill
              style={{ objectFit: "cover" }}
              priority
            />
          </div>
        )}

        <div>
          {weapon.description && (
            <div className="mb-4">
              <h2 className="text-2xl font-semibold mb-2">Description</h2>
              <p className="text-gray-700">{weapon.description}</p>
            </div>
          )}

          {weapon.cost && (
            <div className="mb-4">
              <h3 className="text-xl font-semibold mb-2">Cost</h3>
              <p className="text-gray-700">{weapon.cost} Pesetas</p>
            </div>
          )}

          {weapon.location && (
            <div className="mb-4">
              <h3 className="text-xl font-semibold mb-2">Location</h3>
              <p className="text-gray-700">{weapon.location}</p>
            </div>
          )}

          {weapon.stats && Object.keys(weapon.stats).length > 0 && (
            <div className="mb-4">
              <h3 className="text-xl font-semibold mb-2">Stats</h3>
              <div className="space-y-2">
                {Object.entries(weapon.stats).map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <span className="text-gray-600 capitalize">{key.replace(/_/g, ' ')}:</span>
                    <span className="font-semibold">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {weapon.upgrade_path && Object.keys(weapon.upgrade_path).length > 0 && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-semibold mb-4">Upgrade Path</h2>
          <div className="space-y-4">
            {Object.entries(weapon.upgrade_path).map(([level, upgrades]) => (
              <div key={level} className="border-l-4 border-blue-500 pl-4">
                <h3 className="text-lg font-semibold mb-2">Level {level}</h3>
                <div className="text-gray-700">
                  {typeof upgrades === "object" ? (
                    <ul className="list-disc pl-6">
                      {Object.entries(upgrades).map(([stat, value]) => (
                        <li key={stat} className="capitalize">
                          {stat.replace(/_/g, " ")}: {value}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>{upgrades}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
