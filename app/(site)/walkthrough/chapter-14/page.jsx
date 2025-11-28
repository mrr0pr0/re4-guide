import Image from "next/image";
import Link from "next/link";

export default function Chapter14Page() {
    return (
        <div className="container mx-auto px-4 py-8 text-gray-200 bg-[#121212]">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-4xl font-bold mb-2 text-red-500">Chapter 14 – Krauser's Last Stand</h1>
                <p className="text-lg text-gray-400 max-w-2xl">
                    Leon pursues Ashley to the ancient ruins on the island. Here, he must settle the score with his former mentor, Jack Krauser, in a brutal fight to the death.
                </p>
            </div>

            <hr className="my-6 border-red-500" />

            <div className="relative w-full max-w-3xl h-80 rounded-lg shadow-lg mb-10">
                <Image
                    src="https://placehold.co/800x400/1a1a1a/red?text=Chapter+14+Krauser"
                    alt="Krauser Boss Fight"
                    fill
                    className="rounded-lg object-cover"
                    priority
                />
            </div>

            <div className="prose prose-invert max-w-none">
                {/* Overview */}
                <h2 className="text-red-500">Overview</h2>
                <p>
                    This chapter is almost entirely focused on the extended boss fight with Krauser. It tests your combat skills, particularly parrying and movement.
                </p>

                {/* Story Summary */}
                <h2 className="text-red-500">Story Summary</h2>
                <p>
                    Leon navigates the trapped ruins. Krauser taunts him from the shadows, leading to a series of skirmishes that culminate in a final duel where Krauser unleashes the full power of his Plaga mutation.
                </p>

                {/* Objectives */}
                <h2 className="text-red-500">Objectives</h2>
                <ul>
                    <li>Navigate the Ruins</li>
                    <li>Survive Krauser's Ambushes</li>
                    <li>Defeat Mutated Krauser</li>
                </ul>

                {/* Enemies */}
                <h2 className="text-red-500">Enemy Types Introduced</h2>
                <h3>Mutated Krauser (Boss)</h3>
                <p>
                    His arm transforms into a massive blade/shield. He is fast, aggressive, and deadly.
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
                            <td className="p-2 border border-gray-700">Fighting Knife</td>
                            <td className="p-2 border border-gray-700">Ruins (End)</td>
                            <td className="p-2 border border-gray-700">Krauser's knife. High damage and durability.</td>
                        </tr>
                    </tbody>
                </table>

                {/* Walkthrough */}
                <h2 className="text-red-500">Walkthrough</h2>

                <h3>1. The Ruins Gauntlet</h3>
                <p>
                    Krauser will attack you with arrows, mines, and melee strikes.
                </p>
                <ul>
                    <li>Watch for laser tripwires.</li>
                    <li>Shoot the bear traps.</li>
                    <li>When he attacks, parry!</li>
                </ul>

                <h3>2. Mutated Krauser Boss Fight</h3>
                <p>
                    The final arena is a circular platform.
                </p>
                <ul>
                    <li><strong>Parry everything:</strong> His blade arm attacks can be parried.</li>
                    <li><strong>Shotgun/Magnum:</strong> Use high-damage weapons when he is stunned.</li>
                    <li><strong>Dodge:</strong> When he jumps in the air for a slam, run sideways.</li>
                    <li><strong>The Edge:</strong> Don't get knocked off the platform (though you can climb back up).</li>
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
                    <li>This is the best fight in the game to use your knife. It feels appropriate and is very effective.</li>
                    <li>Krauser is weak to headshots when not guarding.</li>
                    <li>After the fight, you get his knife. It's the best knife in the game. Upgrade it fully!</li>
                </ul>
            </div>
        </div>
    );
}