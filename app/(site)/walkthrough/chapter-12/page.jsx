import Image from "next/image";
import Link from "next/link";

export default function Chapter12Page() {
    return (
        <div className="container mx-auto px-4 py-8 text-gray-200 bg-[#121212]">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-4xl font-bold mb-2 text-red-500">Chapter 12 – The Clock Tower & Salazar</h1>
                <p className="text-lg text-gray-400 max-w-2xl">
                    The finale of the Castle arc. Leon ascends the Clock Tower to confront Ramon Salazar once and for all.
                </p>
            </div>

            <hr className="my-6 border-red-500" />

            <div className="relative w-full max-w-3xl h-80 rounded-lg shadow-lg mb-10">
                <Image
                    src="https://placehold.co/800x400/1a1a1a/red?text=Chapter+12+Salazar"
                    alt="Salazar Boss Fight"
                    fill
                    className="rounded-lg object-cover"
                    priority
                />
            </div>

            <div className="prose prose-invert max-w-none">
                {/* Overview */}
                <h2 className="text-red-500">Overview</h2>
                <p>
                    A short but intense chapter. It starts with a vertical ascent on an elevator platform while enemies rain down, and ends with the boss fight against a mutated Salazar.
                </p>

                {/* Story Summary */}
                <h2 className="text-red-500">Story Summary</h2>
                <p>
                    Leon chases Salazar to the top of the Clock Tower. After surviving the ascent, he confronts the castellan, who merges with the Queen Plaga to become a massive monstrosity.
                </p>

                {/* Objectives */}
                <h2 className="text-red-500">Objectives</h2>
                <ul>
                    <li>Ascend the Clock Tower</li>
                    <li>Cross the Scaffolding</li>
                    <li>Defeat Ramon Salazar</li>
                    <li>Travel to the Island</li>
                </ul>

                {/* Enemies */}
                <h2 className="text-red-500">Enemy Types Introduced</h2>
                <h3>Ramon Salazar (Boss)</h3>
                <p>
                    A mobile, acid-spitting monster. He moves constantly around the arena.
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
                            <td className="p-2 border border-gray-700">Gold Chicken Egg</td>
                            <td className="p-2 border border-gray-700">Throne Room (Backtracking)</td>
                            <td className="p-2 border border-gray-700">Can be used to deal massive damage to Salazar</td>
                        </tr>
                    </tbody>
                </table>

                {/* Walkthrough */}
                <h2 className="text-red-500">Walkthrough</h2>

                <h3>1. The Clock Tower Elevator</h3>
                <p>
                    You are on a rising platform. Zealots will jump down, and others will shoot crossbows from the sides.
                </p>
                <ul>
                    <li>Focus on the red barrels to clear groups.</li>
                    <li>Watch out for the spiked balls rolling down the stairs in the next section.</li>
                </ul>

                <h3>2. Salazar Boss Fight</h3>
                <p>
                    He moves fast and spits acid.
                </p>
                <ul>
                    <li><strong>The Egg Strat:</strong> If you have a Gold Chicken Egg, throw it at his body. It deals 70% of his health in damage instantly!</li>
                    <li>Shoot the yellow eye to expose his weak point.</li>
                    <li>Keep moving to avoid the acid clouds.</li>
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
                    <li>Seriously, use the Gold Egg. It makes the fight a joke.</li>
                    <li>If you don't have the egg, the Broken Butterfly magnum is your best friend here.</li>
                    <li>After the fight, you'll take a boat to the Island. Make sure you're ready.</li>
                </ul>
            </div>
        </div>
    );
}