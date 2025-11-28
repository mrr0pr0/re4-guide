import Image from "next/image";
import Link from "next/link";

export default function Chapter9Page() {
    return (
        <div className="container mx-auto px-4 py-8 text-gray-200 bg-[#121212]">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-4xl font-bold mb-2 text-red-500">Chapter 9 – The Courtyard & Ashley</h1>
                <p className="text-lg text-gray-400 max-w-2xl">
                    Leon reaches the Grand Hall and must collect three animal heads to progress. This chapter also features a unique segment where you play as Ashley Graham.
                </p>
            </div>

            <hr className="my-6 border-red-500" />

            <div className="relative w-full max-w-3xl h-80 rounded-lg shadow-lg mb-10">
                <Image
                    src="https://placehold.co/800x400/1a1a1a/red?text=Chapter+9+Courtyard"
                    alt="The Courtyard"
                    fill
                    className="rounded-lg object-cover"
                    priority
                />
            </div>

            <div className="prose prose-invert max-w-none">
                {/* Overview */}
                <h2 className="text-red-500">Overview</h2>
                <p>
                    The chapter begins in the Courtyard maze, infested with Colmillos. After reuniting with Ashley, you enter the Grand Hall. Leon must find three statue heads, while Ashley has her own terrifying section in the library.
                </p>

                {/* Story Summary */}
                <h2 className="text-red-500">Story Summary</h2>
                <p>
                    Leon and Ashley are briefly reunited. To move forward, they need to complete the Chimera Statue in the Grand Hall. While Leon fights for the Lion and Goat heads, Ashley is forced to separate and retrieve the Serpent Head on her own, defenseless against the armor-clad monsters.
                </p>

                {/* Objectives */}
                <h2 className="text-red-500">Objectives</h2>
                <ul>
                    <li>Navigate the Courtyard Maze</li>
                    <li>Retrieve the Lion Head</li>
                    <li>Retrieve the Goat Head</li>
                    <li>Retrieve the Serpent Head (Ashley's Section)</li>
                    <li>Complete the Chimera Statue</li>
                </ul>

                {/* Enemies */}
                <h2 className="text-red-500">Enemy Types Introduced</h2>
                <h3>Armadura (Living Armor)</h3>
                <p>
                    Suits of armor possessed by Plagas. They are slow but invincible to body shots. You must shoot the Plaga exposing from their neck or helmet.
                </p>

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
                            <td className="p-2 border border-gray-700">Lion Head</td>
                            <td className="p-2 border border-gray-700">Armory</td>
                            <td className="p-2 border border-gray-700">Combat challenge</td>
                        </tr>
                        <tr>
                            <td className="p-2 border border-gray-700">Goat Head</td>
                            <td className="p-2 border border-gray-700">Gallery</td>
                            <td className="p-2 border border-gray-700">Combat challenge</td>
                        </tr>
                        <tr>
                            <td className="p-2 border border-gray-700">Serpent Head</td>
                            <td className="p-2 border border-gray-700">Dining Hall</td>
                            <td className="p-2 border border-gray-700">Puzzle item</td>
                        </tr>
                        <tr>
                            <td className="p-2 border border-gray-700">Bunch of Keys</td>
                            <td className="p-2 border border-gray-700">Library</td>
                            <td className="p-2 border border-gray-700">Used by Ashley</td>
                        </tr>
                    </tbody>
                </table>

                {/* Walkthrough */}
                <h2 className="text-red-500">Walkthrough</h2>

                <h3>1. The Courtyard</h3>
                <p>
                    Lower the flags to open the gate. Watch out for dogs (Colmillos).
                </p>

                <h3>2. The Armory (Lion Head)</h3>
                <p>
                    You will drop into a pit with several Armaduras.
                </p>
                <ul>
                    <li>Shoot their helmets off to expose the Plaga.</li>
                    <li>Use flash grenades to kill the exposed Plagas instantly.</li>
                    <li>Ashley will help by throwing blue fire lamps—shoot them to stun the armors.</li>
                </ul>

                <h3>3. The Gallery (Goat Head)</h3>
                <p>
                    A long bridge with many enemies. A Red Zealot will try to mutate them. Snipe him early if you can.
                </p>

                <h3>4. Ashley's Section (Serpent Head)</h3>
                <p>
                    Ashley cannot fight. She can only run and shine her lantern.
                </p>
                <ul>
                    <li>Shine the light on the Armaduras to freeze them temporarily.</li>
                    <li>Turn the cranks to open paths.</li>
                    <li>Solve the grandfather clock puzzle (Time: 11:04 on Standard/Hardcore, 7:00 on Assisted/Easy).</li>
                </ul>

                <hr className="my-6 border-red-500" />

                <div>
                    <Link
                        href="/maps/castle"
                        className="bg-red-500 text-white px-4 py-2 rounded mb-6 hover:bg-red-600 inline-block"
                    >
                        View interactive map
                    </Link>
                </div>

                {/* Tips */}
                <h2 className="text-red-500">Tips</h2>
                <ul>
                    <li>Save flash grenades for the Armory; they make the fight trivial.</li>
                    <li>In the Gallery, throw a grenade at the group of enemies on the bridge to thin them out quickly.</li>
                    <li>As Ashley, don't stop moving. The Armaduras are slow but relentless.</li>
                </ul>
            </div>
        </div>
    );
}