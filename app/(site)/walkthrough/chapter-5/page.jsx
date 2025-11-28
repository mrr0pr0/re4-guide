import Image from "next/image";
import Link from "next/link";

export default function Chapter5Page() {
    return (
        <div className="container mx-auto px-4 py-8 text-gray-200 bg-[#121212]">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-4xl font-bold mb-2 text-red-500">Chapter 5 – The Cabin Fight</h1>
                <p className="text-lg text-gray-400 max-w-2xl">
                    With Ashley secured, Leon must now escape the village. However, the cult is not letting them go easily. This chapter features one of the most intense combat sequences in the game: the Cabin Fight.
                </p>
            </div>

            <hr className="my-6 border-red-500" />

            <div className="relative w-full max-w-3xl h-80 rounded-lg shadow-lg mb-10">
                <Image
                    src="https://placehold.co/800x400/1a1a1a/red?text=Chapter+5+Cabin"
                    alt="Cabin Fight"
                    fill
                    className="rounded-lg object-cover"
                    priority
                />
            </div>

            <div className="prose prose-invert max-w-none">
                {/* Overview */}
                <h2 className="text-red-500">Overview</h2>
                <p>
                    This chapter is relatively short but very combat-focused. You'll reunite with Luis and defend a small cabin against waves of Ganados. Resource management and crowd control are key.
                </p>

                {/* Story Summary */}
                <h2 className="text-red-500">Story Summary</h2>
                <p>
                    Leon and Ashley try to escape but are forced to take refuge in a house with Luis Serra. The villagers surround the building, leading to a desperate stand-off.
                </p>

                {/* Objectives */}
                <h2 className="text-red-500">Objectives</h2>
                <ul>
                    <li>Escape the Church</li>
                    <li>Reach the extraction point</li>
                    <li>Survive the Cabin Fight</li>
                </ul>

                {/* Enemies */}
                <h2 className="text-red-500">Enemy Types Introduced</h2>
                <h3>Brute (Cow Head)</h3>
                <p>
                    A large Ganado wearing a cow's head and wielding a massive hammer. He is slow but hits very hard.
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
                            <td className="p-2 border border-gray-700">Yellow Herb</td>
                            <td className="p-2 border border-gray-700">Various</td>
                            <td className="p-2 border border-gray-700">Increases max health when mixed</td>
                        </tr>
                    </tbody>
                </table>

                {/* Walkthrough */}
                <h2 className="text-red-500">Walkthrough</h2>

                <h3>1. Escape</h3>
                <p>
                    The initial path is linear. Ashley will follow you. You can tell her to wait in lockers if things get too dangerous, but don't leave her behind!
                </p>

                <h3>2. The Cabin Fight</h3>
                <p>
                    This is a survival wave mode.
                </p>
                <ul>
                    <li><strong>Phase 1:</strong> Barricade the windows with wooden planks. Shoot enemies through the gaps.</li>
                    <li><strong>Phase 2:</strong> Ladders will appear at the upstairs windows. Push them down.</li>
                    <li><strong>Phase 3:</strong> A Brute will enter. Focus fire on him. Flash grenades are a lifesaver here.</li>
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
                    <li>Luis will toss you ammo occasionally—keep an ear out for him.</li>
                    <li>Don't get cornered. The stairs are a good choke point, but don't stay there forever.</li>
                    <li>Save your grenades for when the Brute appears.</li>
                </ul>
            </div>
        </div>
    );
}