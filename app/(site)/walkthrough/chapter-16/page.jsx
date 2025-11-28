import Image from "next/image";
import Link from "next/link";

export default function Chapter16Page() {
    return (
        <div className="container mx-auto px-4 py-8 text-gray-200 bg-[#121212]">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-4xl font-bold mb-2 text-red-500">Chapter 16 – Saddler & Escape</h1>
                <p className="text-lg text-gray-400 max-w-2xl">
                    The end of the nightmare. Leon confronts Osmund Saddler to end the Los Iluminados cult once and for all, followed by a high-speed escape from the exploding island.
                </p>
            </div>

            <hr className="my-6 border-red-500" />

            <div className="relative w-full max-w-3xl h-80 rounded-lg shadow-lg mb-10">
                <Image
                    src="https://placehold.co/800x400/1a1a1a/red?text=Chapter+16+Finale"
                    alt="Saddler Boss Fight"
                    fill
                    className="rounded-lg object-cover"
                    priority
                />
            </div>

            <div className="prose prose-invert max-w-none">
                {/* Overview */}
                <h2 className="text-red-500">Overview</h2>
                <p>
                    This is it. No more exploration, just the final boss and the escape sequence. Make sure you are prepared.
                </p>

                {/* Story Summary */}
                <h2 className="text-red-500">Story Summary</h2>
                <p>
                    Leon finds Ashley in the Sanctuary. They manage to remove the Plagas from their bodies using the machine in Luis's lab. Now free from the cult's control, they confront Saddler on the loading docks for the final battle.
                </p>

                {/* Objectives */}
                <h2 className="text-red-500">Objectives</h2>
                <ul>
                    <li>Defeat Osmund Saddler</li>
                    <li>Escape the Island on the Jet Ski</li>
                </ul>

                {/* Enemies */}
                <h2 className="text-red-500">Enemy Types Introduced</h2>
                <h3>Osmund Saddler (Final Boss)</h3>
                <p>
                    A massive, spider-like monstrosity with eyes on his legs. He summons Novistadors to help him.
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
                            <td className="p-2 border border-gray-700">Rocket Launcher (Special)</td>
                            <td className="p-2 border border-gray-700">Boss Arena</td>
                            <td className="p-2 border border-gray-700">Given by Ada to finish the fight</td>
                        </tr>
                    </tbody>
                </table>

                {/* Walkthrough */}
                <h2 className="text-red-500">Walkthrough</h2>

                <h3>1. Saddler Boss Fight</h3>
                <p>
                    Shoot the eyes on his legs.
                </p>
                <ul>
                    <li>When an eye pops, he will be stunned. Run up and stab his main eye.</li>
                    <li>Dodge his tentacle swipes.</li>
                    <li>Kill the Novistadors for ammo drops.</li>
                    <li><strong>Phase 2:</strong> He transforms further. Dodge the massive tentacle slams.</li>
                    <li><strong>Finale:</strong> Ada will throw you a Rocket Launcher. Pick it up, aim, and fire to end it.</li>
                </ul>

                <h3>2. The Jet Ski Escape</h3>
                <p>
                    Run to the dock and hop on the jet ski.
                </p>
                <ul>
                    <li>Accelerate! Don't let the timer run out.</li>
                    <li>Dodge the falling rocks and debris.</li>
                    <li>Hit the ramp at the end for a cinematic finish.</li>
                </ul>

                <hr className="my-6 border-red-500" />

                <div>
                    <Link
                        href="/maps/island"
                        className="bg-red-500 text-white px-4 py-2 rounded mb-6 hover:bg-red-600 inline-block"
                    >
                        View interactive map
                    </Link>
                </div>

                {/* Tips */}
                <h2 className="text-red-500">Tips</h2>
                <ul>
                    <li>Sell everything you don't need before the fight. Buy a Rocket Launcher if you want to skip the first phase (speedrun strat).</li>
                    <li>Don't miss the jump on the jet ski!</li>
                    <li>Congratulations on beating Resident Evil 4 Remake!</li>
                </ul>
            </div>
        </div>
    );
}