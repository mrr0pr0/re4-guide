import Image from "next/image";
import Link from "next/link";

export default function Chapter8Page() {
    return (
        <div className="container mx-auto px-4 py-8 text-gray-200 bg-[#121212]">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-4xl font-bold mb-2 text-red-500">Chapter 8 – The Castle Battlements</h1>
                <p className="text-lg text-gray-400 max-w-2xl">
                    Separated from Ashley once again, Leon must navigate the treacherous castle battlements. This chapter is defined by verticality, puzzles, and a giant problem.
                </p>
            </div>

            <hr className="my-6 border-red-500" />

            <div className="relative w-full max-w-3xl h-80 rounded-lg shadow-lg mb-10">
                <Image
                    src="https://placehold.co/800x400/1a1a1a/red?text=Chapter+8+Battlements"
                    alt="Castle Battlements"
                    fill
                    className="rounded-lg object-cover"
                    priority
                />
            </div>

            <div className="prose prose-invert max-w-none">
                {/* Overview */}
                <h2 className="text-red-500">Overview</h2>
                <p>
                    You will fight your way through the Wine Cellar, solve the Lithographic Stone puzzle, and then survive the Battlements where an Armored El Gigante throws boulders at you.
                </p>

                {/* Story Summary */}
                <h2 className="text-red-500">Story Summary</h2>
                <p>
                    Ashley flees in fear after nearly attacking Leon due to the Plaga's influence. Leon chases after her but is stopped by the castle's defenses. He must find a way to the Courtyard.
                </p>

                {/* Objectives */}
                <h2 className="text-red-500">Objectives</h2>
                <ul>
                    <li>Solve the Lithographic Stone Puzzle</li>
                    <li>Survive the Battlements</li>
                    <li>Defeat the Armored El Gigante</li>
                    <li>Reach the Courtyard</li>
                </ul>

                {/* Enemies */}
                <h2 className="text-red-500">Enemy Types Introduced</h2>
                <h3>Armored El Gigante</h3>
                <p>
                    Similar to the first one, but covered in armor. You cannot hurt him with normal weapons initially. You must use the castle's cannon to defeat him.
                </p>
                <h3>Red Zealot</h3>
                <p>
                    A leader enemy who can chant to buff other Zealots, making their heads explode into Plagas instantly. Kill him first!
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
                            <td className="p-2 border border-gray-700">Crimson Lantern</td>
                            <td className="p-2 border border-gray-700">Wine Cellar</td>
                            <td className="p-2 border border-gray-700">Dropped by Leader Zealot</td>
                        </tr>
                        <tr>
                            <td className="p-2 border border-gray-700">Lithographic Stones</td>
                            <td className="p-2 border border-gray-700">Bindery</td>
                            <td className="p-2 border border-gray-700">Puzzle items</td>
                        </tr>
                    </tbody>
                </table>

                {/* Walkthrough */}
                <h2 className="text-red-500">Walkthrough</h2>

                <h3>1. The Wine Cellar</h3>
                <p>
                    You'll encounter your first Red Zealot here. He will cause the others to mutate. Prioritize him. Loot the Crimson Lantern from his body to open the door.
                </p>

                <h3>2. Lithographic Stone Puzzle</h3>
                <p>
                    Match the stones to the slots.
                    <br />
                    <strong>Hint:</strong> You can flip the stones. Match the color (Red/Blue) and the shape (Square/Hexagon) and the symbol (Shield/Sword/Helmet/Armor).
                </p>

                <h3>3. The Battlements</h3>
                <p>
                    The Armored El Gigante will throw rocks at you. Use the cover spots (marked with yellow paint).
                </p>
                <ul>
                    <li>Time your movements between his throws.</li>
                    <li>Drop the counterweights to raise the cannon.</li>
                    <li>Once the cannon is up, fire it at the Gigante to kill him instantly.</li>
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
                    <li>In the Wine Cellar, a flash grenade can stop the Red Zealot's chant.</li>
                    <li>Don't waste ammo on the Armored El Gigante. Just run.</li>
                    <li>There is a treasure chest on top of the first tower in the battlements—don't miss it before you jump down.</li>
                </ul>
            </div>
        </div>
    );
}