import Image from "next/image";
import Link from "next/link";

export default function Chapter2Page() {
    return (
        <div className="container mx-auto px-4 py-8 text-gray-200 bg-[#121212]">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-4xl font-bold mb-2 text-red-500">Chapter 2 – The Valley & The Merchant</h1>
                <p className="text-lg text-gray-400 max-w-2xl">
                    Leon wakes up captured but escapes to find his gear missing. This chapter introduces the mysterious Merchant, the parry mechanic against weapon-wielding enemies, and the intense battle in the Valley.
                </p>
            </div>

            <hr className="my-6 border-red-500" />

            <div className="relative w-full max-w-3xl h-80 rounded-lg shadow-lg mb-1">
                <Image
                    src="https://res.cloudinary.com/dxeuo6xas/image/upload/v1764363805/ch2-1_olqgc0.webp"
                    alt="The Valley"
                    fill
                    className="rounded-lg object-cover"
                    priority
                />
            </div>
        <div>
          <Link
            href="/maps/abanodnedfackch2"
            className="bg-red-500 text-white px-4 py-2 rounded mb-6 hover:bg-red-600 inline-block"
          >
            View map
          </Link>
        </div>

            <div className="prose prose-invert max-w-none">
                {/* Overview */}
                <h2 className="text-red-500">Overview</h2>
                <p>
                    After a brief stealth section to recover your gear, you will meet the Merchant for the first time. The main challenge is the Valley, a large arena filled with dynamite-throwing Ganados, where you must retrieve the Hexagonal Emblem to proceed.
                </p>

                {/* Story Summary */}
                <h2 className="text-red-500">Story Summary</h2>
                <p>
                    Leon and Luis are captured but manage to escape. Leon recovers his equipment and encounters the Merchant, a mysterious figure willing to trade weapons and upgrades. To open the gate to the Village Chief&apos;s Manor, Leon must brave the fortified Valley to find the Hexagonal Emblem.
                </p>

                {/* Objectives */}
                <h2 className="text-red-500">Objectives</h2>
                <ul>
                    <li>Escape the Abandoned Factory</li>
                    <li>Recover your gear</li>
                    <li>Meet the Merchant</li>
                    <li>Retrieve the Hexagonal Emblem from the Valley</li>
                    <li>Unlock the Village Chief&apos;s Manor gate</li>
                </ul>

                {/* Enemies */}
                <h2 className="text-red-500">Enemy Types Introduced</h2>
                <h3>Dynamite Ganado</h3>
                <p>
                    These enemies throw sticks of dynamite that deal massive area damage. You can shoot the dynamite while it&apos;s in their hands to blow them up and damage nearby enemies.
                </p>

    {/* Tips */}
                <div className="mx-auto max-w-md">
                    <div className="text-gray-700 text-center space-x-1 bg-yellow-200 p-4 rounded-md">
                        <h2 className="text-red-500 text-center">Tips</h2>
                            <ul>
                                <li>Shoot the dynamite in an enemy&apos;s hand for an instant kill.</li>
                                <li>The Rifle makes clearing the Valley much easier by picking off snipers.</li>
                                <li>Don&apos;t forget to loot the area thoroughly after the fight.</li>
                            </ul>
                        </div>
                    </div>

            
                <hr className="my-6 border-red-500" />

                {/* Items Table */}
                <h2 className="text-red-500">Weapons & Items Found</h2>
                <table className="w-full border border-gray-700">
                    <thead className="bg-[#1e1e1e]">
                        <tr>
                            <th className="p-2 border border-gray-700">Item</th>
                            <th className="p-2 border border-gray-700">Location</th>
                            <th className="p-2 border border-gray-700">Notes</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="p-2 border border-gray-700">Kitchen Knife</td>
                            <td className="p-2 border border-gray-700">Abandoned Factory</td>
                            <td className="p-2 border border-gray-700">Recovered gear</td>
                        </tr>
                        <tr>
                            <td className="p-2 border border-gray-700">Hexagonal Emblem</td>
                            <td className="p-2 border border-gray-700">The Valley (Roof)</td>
                            <td className="p-2 border border-gray-700">Key item for progression</td>
                        </tr>
                        <tr>
                            <td className="p-2 border border-gray-700">Sapphire</td>
                            <td className="p-2 border border-gray-700">Abandoned Factory</td>
                            <td className="p-2 border border-gray-700">Sell to Merchant</td>
                        </tr>
                    </tbody>
                </table>

                {/* Walkthrough */}
                <h2 className="text-red-500">Walkthrough</h2>

                <h3>1. Abandoned Factory</h3>
                <p>
                    Move quietly. You can stealth kill the first enemy. Parry the attacks of the next few until you recover your gear from the room at the end of the hall.
                </p>

                <h3>2. The Merchant</h3>
                <p>
                    Outside the factory, you&apos;ll meet the Merchant. Repair your knife and consider buying the Rifle if you have the funds—it&apos;s excellent for the upcoming Valley section.
                </p>

                <h3>3. The Valley</h3>
                <p>
                    This is a combat-heavy zone. Stay on the move. Use the explosive barrels to your advantage. The Hexagonal Emblem is on the roof of the furthest building. Watch out for dynamite throwers on the cliffs.
                </p>

                <hr className="my-6 border-red-500" />
                


            </div>        </div>
    );
}
