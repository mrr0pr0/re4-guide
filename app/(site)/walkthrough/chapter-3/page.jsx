import Image from "next/image";
import Link from "next/link";

export default function Chapter3Page() {
    return (
        <div className="container mx-auto px-4 py-8 text-gray-200 bg-[#121212]">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-4xl font-bold mb-2 text-red-500">Chapter 3 – The Lake & Del Lago</h1>
                <p className="text-lg text-gray-400 max-w-2xl">
                    A darker turn in the journey. Leon explores the village outskirts, faces the terrifying Del Lago in the lake, and uncovers more about the Los Iluminados cult.
                </p>
            </div>

            <hr className="my-6 border-red-500" />

            <div className="relative w-full max-w-3xl h-80 rounded-lg shadow-lg mb-10">
                <Image
                    src="https://res.cloudinary.com/dxeuo6xas/image/upload/v1764364686/ch3.1_r1wvmq.jpg"
                    alt="The Lake"
                    fill
                    className="rounded-lg object-cover"
                    priority
                />
            </div>

            <div className="prose prose-invert max-w-none">
                {/* Overview */}
                <h2 className="text-red-500">Overview</h2>
                <p>
                    This chapter focuses on atmosphere and the first major boss fight. You will navigate through the Village Chief&apos;s Manor, fight through the Quarry, and eventually take a boat out onto the lake to face the guardian, Del Lago.
                </p>

                {/* Story Summary */}
                <h2 className="text-red-500">Story Summary</h2>
                <p>
                    Leon enters the Village Chief&apos;s Manor but is nearly killed by Mendez. After recovering, he heads towards the lake to find a boat. The cult has unleashed Del Lago, a massive mutated salamander, to stop him.
                </p>

                {/* Objectives */}
                <h2 className="text-red-500">Objectives</h2>
                <ul>
                    <li>Explore the Village Chief&apos;s Manor</li>
                    <li>Head to the Church (locked)</li>
                    <li>Pass through the Quarry</li>
                    <li>Find boat fuel at the Fish Farm</li>
                    <li>Defeat Del Lago</li>
                </ul>

                {/* Enemies */}
                <h2 className="text-red-500">Enemy Types Introduced</h2>
                <h3>Colmillos (Plaga Wolves)</h3>
                <p>
                    Infected wolves that are fast and aggressive. They can sprout tentacles from their backs. Shotguns are very effective against them.
                </p>
                <h3>Del Lago</h3>
                <p>
                    The first major boss. A massive aquatic creature that drags your boat around the lake.
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
                            <td className="p-2 border border-gray-700">Insignia Key</td>
                            <td className="p-2 border border-gray-700">Village Chief&apos;s Manor</td>
                            <td className="p-2 border border-gray-700">Opens village gates</td>
                        </tr>
                        <tr>
                            <td className="p-2 border border-gray-700">Boat Fuel</td>
                            <td className="p-2 border border-gray-700">Fish Farm</td>
                            <td className="p-2 border border-gray-700">Required for the boat</td>
                        </tr>
                    </tbody>
                </table>

                {/* Walkthrough */}
                <h2 className="text-red-500">Walkthrough</h2>

                <h3>1. Village Chief&apos;s Manor</h3>
                <p>
                    Solve the crystal marble puzzle on the second floor to open the bedroom. Inside, you&apos;ll find the Insignia Key.
                </p>

                <h3>2. The Quarry & Fish Farm</h3>
                <p>
                    On the way to the lake, you&apos;ll pass through the Quarry. Watch out for the Colmillos. In the Fish Farm, you need to find the Boat Fuel. This area is dense with enemies and water, making movement slower.
                </p>

                <h3>3. Del Lago Boss Fight</h3>
                <p>
                    You are on a small boat armed with infinite harpoons.
                </p>
                <ul>
                    <li>Throw harpoons at the monster&apos;s body when it surfaces.</li>
                    <li>Steer the boat to avoid floating debris.</li>
                    <li>When it charges you with its mouth open, land a hit in the mouth to stop it.</li>
                </ul>

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
                    <li>Don&apos;t shoot the water at the dock before the fight (or do, for a surprise).</li>
                    <li>In the Fish Farm, use the walkways to funnel enemies.</li>
                    <li>Upgrade your harpoon throwing speed by... well, you can&apos;t, just aim true!</li>
                </ul>
            </div>
        </div>
    );
}
