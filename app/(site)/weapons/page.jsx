import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";

export const revalidate = 60;

async function getWeapons() {
  const { data, error } = await supabase
    .from("weapons")
    .select("*")
    .order("type", { ascending: true });

  if (error) {
    console.error("Error fetching weapons:", error);
    return [];
  }

  return data || [];
}

export default async function WeaponsPage() {
  const weapons = await getWeapons();

  // Group weapons by type
  const weaponsByType = weapons.reduce((acc, weapon) => {
    if (!acc[weapon.type]) {
      acc[weapon.type] = [];
    }
    acc[weapon.type].push(weapon);
    return acc;
  }, {});

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Weapons Guide</h1>
      <p className="text-muted-foreground mb-8">
        Complete weapon stats, upgrades, and recommendations.
      </p>

      {Object.keys(weaponsByType).length > 0 ? (
        Object.entries(weaponsByType).map(([type, typeWeapons]) => (
          <div key={type} className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 capitalize">{type}s</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {typeWeapons.map((weapon) => (
                <Link
                  key={weapon.id}
                  href={`/weapons/${weapon.slug}`}
                  className="bg-background border border-border rounded-lg shadow hover:shadow-lg transition-shadow overflow-hidden group"
                >
                  {weapon.image_url && (
                    <div className="relative w-full h-48">
                      <Image
                        src={weapon.image_url}
                        alt={weapon.name}
                        fill
                        style={{ objectFit: "cover" }}
                        priority
                      />
                    </div>
                  )}

                  <div className="p-4">
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">{weapon.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2 capitalize">{weapon.type}</p>
                    {weapon.cost && (
                      <p className="text-sm text-muted-foreground">Cost: {weapon.cost} Pesetas</p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))
      ) : (
        <div className="p-6 bg-background border border-border rounded-lg shadow">
          <p className="text-muted-foreground">No weapons available yet. Check back soon!</p>
        </div>
      )}
    </div>
  );
}
