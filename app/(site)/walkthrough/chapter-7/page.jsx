import Image from "next/image";
import Link from "next/link";

export default function Chapter7Page() {
    return (
        <div className="container mx-auto px-4 py-8 text-gray-200 bg-[#121212]">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-4xl font-bold mb-2 text-red-500">Chapter 7 – The Castle</h1>
                <p className="text-lg text-gray-400 max-w-2xl">
                    Leaving the village behind, Leon and Ashley enter the ancient Salazar Castle. The atmosphere shifts from rural horror to gothic oppression.
                </p>
            </div>

            <hr className="my-6 border-red-500" />

            <div className="relative w-full max-w-3xl h-80 rounded-lg shadow-lg mb-10">
                <Image
                    src="https://placehold.co/800x400/1a1a1a/red?text=Chapter+7+Castle"
                    alt="Salazar Castle"
                    fill
                    className="rounded-lg object-cover"
                    priority
                />
            </div>

            <div className="prose prose-invert max-w-none">
                {/* Overview */}
                <h2 className="text-red-500">Overview</h2>
                <p>
                    The Castle introduces new, smarter enemies: the Zealots. You will navigate the outer walls, meet the castellan Ramon Salazar, and face the blind, clawed Garrador in the dungeons.
                </p>

                {/* Story Summary */}
                <h2 className="text-red-500">Story Summary</h2>
                <p>
                    Leon and Ashley seek refuge in the castle but find it occupied by a cult sect led by Ramon Salazar. Ashley becomes separated again, and Leon must fight through the castle's defenses to find her.
                </p>

                {/* Objectives */}
                <h2 className="text-red-500">Objectives</h2>
                <ul>
                    <li>Enter the Castle</li>
                    <li>Survive the Catapult bombardment</li>
                    <li>Defeat the Garrador</li>
                    <li>Retrieve the Dungeon Key</li>
                </ul>

                {/* Enemies */}
                <h2 className="text-red-500">Enemy Types Introduced</h2>
                <h3>Zealots</h3>
                <p>
                    Cultists in robes. They use shields, scythes, and crossbows. They can also mutate with Plaga mandibles that can instant-kill you.
                </p>
                <h3>Garrador</h3>
                <p>
                    A blind prisoner with metal claws. He reacts to sound.
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
                            <td className="p-2 border border-gray-700">Dungeon Key</td>
                            <td className="p-2 border border-gray-700">Dungeon</td>
                            <td className="p-2 border border-gray-700">Dropped by Garrador</td>
                        </tr>
                        <tr>
                            <td className="p-2 border border-gray-700">Platinum Sword</td>
                            <td className="p-2 border border-gray-700">Treasury</td>
                            <td className="p-2 border border-gray-700">Puzzle item</td>
                        </tr>
                        <tr>
                            <td className="p-2 border border-gray-700">Golden Sword</td>
                            <td className="p-2 border border-gray-700">Treasury</td>
                            <td className="p-2 border border-gray-700">Puzzle item</td>
                        </tr>
                    </tbody>
                </table>

                {/* Walkthrough */}
                <h2 className="text-red-500">Walkthrough</h2>

                <h3>1. The Catapults</h3>
                <p>
                    As you approach the gate, catapults will fire at you. Move from cover to cover. Shoot the red explosive barrels near the catapults to destroy them.
                </p>

                <h3>2. The Garrador</h3>
                <p>
                    In the dungeon, you'll be trapped with a Garrador.
                </p>
                <ul>
                    <li>Crouch and move silently.</li>
                    <li>Shoot the Plaga on his back.</li>
                    <li>If you make noise, move immediately.</li>
                    <li>Use the bells in the room to distract him.</li>
                </ul>

                <h3>3. The Treasury Puzzle</h3>
                <p>
                    You need to swap the swords in the reliefs.
                    <br />
                    <strong>Solution:</strong> Put the Gold Sword in the Gold relief and the Platinum Sword in the Platinum relief.
                </p>

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
                    <li>Zealots with shields can be annoying. Use a shotgun to break the shield or shoot their legs.</li>
                    <li>Flash grenades kill exposed Plagas instantly.</li>
                    <li>Don't run in the Garrador room unless you have to!</li>
                </ul>
            </div>
        </div>
    );
}