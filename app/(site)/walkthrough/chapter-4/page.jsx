import Image from "next/image";
import Link from "next/link";

export default function Chapter4Page() {
    return (
        <div className="container mx-auto px-4 py-8 text-gray-200 bg-[#121212]">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-4xl font-bold mb-2 text-red-500">Chapter 4 – The Search for Ashley</h1>
                <p className="text-lg text-gray-400 max-w-2xl">
                    With the boat now available, Leon can explore the lake fully. The goal is to find the key to the Church, defeat the massive El Gigante, and finally rescue Ashley Graham.
                </p>
            </div>

            <hr className="my-6 border-red-500" />

            <div className="relative w-full max-w-3xl h-80 rounded-lg shadow-lg mb-10">
                <Image
                    src="https://placehold.co/800x400/1a1a1a/red?text=Chapter+4+El+Gigante"
                    alt="El Gigante"
                    fill
                    className="rounded-lg object-cover"
                    priority
                />
            </div>

            <div className="prose prose-invert max-w-none">
                {/* Overview */}
                <h2 className="text-red-500">Overview</h2>
                <p>
                    This is a longer chapter with significant exploration. You have freedom to boat around the lake to find treasures and key items. The climax involves a boss fight with El Gigante and the rescue of the President's daughter.
                </p>

                {/* Story Summary */}
                <h2 className="text-red-500">Story Summary</h2>
                <p>
                    Leon needs to enter the Church to find Ashley, but the door is locked. He must retrieve two key items from caves around the lake. After securing the key, he returns to the quarry to face a giant monstrosity before finally reaching the Church.
                </p>

                {/* Objectives */}
                <h2 className="text-red-500">Objectives</h2>
                <ul>
                    <li>Explore the Lake Caves</li>
                    <li>Retrieve the Apostate's Head</li>
                    <li>Retrieve the Blasphemer's Head</li>
                    <li>Obtain the Church Insignia</li>
                    <li>Defeat El Gigante</li>
                    <li>Rescue Ashley Graham</li>
                </ul>

                {/* Enemies */}
                <h2 className="text-red-500">Enemy Types Introduced</h2>
                <h3>El Gigante</h3>
                <p>
                    A towering giant with immense strength. He can crush you, throw rocks, and use trees as clubs. His weak point is the Plaga parasite that erupts from his back after taking damage.
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
                            <td className="p-2 border border-gray-700">Red9 Handgun</td>
                            <td className="p-2 border border-gray-700">Center of Lake (Shipwreck)</td>
                            <td className="p-2 border border-gray-700">High power handgun (Optional)</td>
                        </tr>
                        <tr>
                            <td className="p-2 border border-gray-700">Church Insignia</td>
                            <td className="p-2 border border-gray-700">Mural Cave</td>
                            <td className="p-2 border border-gray-700">Opens the Church</td>
                        </tr>
                    </tbody>
                </table>

                {/* Walkthrough */}
                <h2 className="text-red-500">Walkthrough</h2>

                <h3>1. The Lake Caves</h3>
                <p>
                    Visit the two locations marked on your map. Each involves a puzzle to retrieve a "Head" item.
                    <br />
                    <strong>Puzzle Hint:</strong> Look for the yellow symbols painted on the walls in the area and press the corresponding buttons on the pedestal.
                </p>

                <h3>2. El Gigante Boss Fight</h3>
                <p>
                    Back at the Quarry, El Gigante attacks.
                </p>
                <ul>
                    <li>Keep moving to avoid his charges.</li>
                    <li>Shoot him until he kneels and the Plaga is exposed.</li>
                    <li>Climb on his back and slash the Plaga.</li>
                    <li>If you saved the dog earlier, it will help distract him!</li>
                </ul>

                <h3>3. The Church</h3>
                <p>
                    Insert the Church Insignia. Inside, solve the stained glass puzzle (rotate RGB dials to match the symbol) to reach Ashley.
                </p>

                <hr className="my-6 border-red-500" />

                <div>
                    <Link
                        href="/maps/village"
                        className="bg-red-500 text-white px-4 py-2 rounded mb-6 hover:bg-red-600 inline-block"
                    >
                        View interactive map
                    </Link>
                </div>

                {/* Tips */}
                <h2 className="text-red-500">Tips</h2>
                <ul>
                    <li>Get the Red9 from the boat in the middle of the lake—it's a fan favorite weapon.</li>
                    <li>Flash grenades are very effective against exposed Plagas (like the one on El Gigante).</li>
                    <li>Loot the lake thoroughly; there are many treasures and fish for health.</li>
                </ul>
            </div>
        </div>
    );
}