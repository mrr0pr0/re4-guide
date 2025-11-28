import Image from "next/image";
import Link from "next/link";

export default function Chapter6Page() {
    return (
        <div className="container mx-auto px-4 py-8 text-gray-200 bg-[#121212]">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-4xl font-bold mb-2 text-red-500">Chapter 6 – Bitores Mendez</h1>
                <p className="text-lg text-gray-400 max-w-2xl">
                    The conclusion of the Village section. Leon and Ashley must flee from the relentless pursuit of the Village Chief, Bitores Mendez.
                </p>
            </div>

            <hr className="my-6 border-red-500" />

            <div className="relative w-full max-w-3xl h-80 rounded-lg shadow-lg mb-10">
                <Image
                    src="https://placehold.co/800x400/1a1a1a/red?text=Chapter+6+Mendez"
                    alt="Bitores Mendez"
                    fill
                    className="rounded-lg object-cover"
                    priority
                />
            </div>

            <div className="prose prose-invert max-w-none">
                {/* Overview */}
                <h2 className="text-red-500">Overview</h2>
                <p>
                    This chapter involves a linear gauntlet through a valley pass, a defensive sequence at a checkpoint, and finally the boss battle against Mendez in a burning slaughterhouse.
                </p>

                {/* Story Summary */}
                <h2 className="text-red-500">Story Summary</h2>
                <p>
                    Leon and Ashley try to leave the valley, but Mendez blocks their path. After a chase, Leon confronts Mendez in a final duel to end his reign of terror over the village.
                </p>

                {/* Objectives */}
                <h2 className="text-red-500">Objectives</h2>
                <ul>
                    <li>Navigate the Checkpoint</li>
                    <li>Escape the Village</li>
                    <li>Defeat Bitores Mendez</li>
                </ul>

                {/* Enemies */}
                <h2 className="text-red-500">Enemy Types Introduced</h2>
                <h3>Bitores Mendez (Boss)</h3>
                <p>
                    The Village Chief transforms into a terrifying creature with a segmented spine and long claws.
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
                            <td className="p-2 border border-gray-700">Mendez's False Eye</td>
                            <td className="p-2 border border-gray-700">Slaughterhouse</td>
                            <td className="p-2 border border-gray-700">Key item to unlock the Castle gate</td>
                        </tr>
                    </tbody>
                </table>

                {/* Walkthrough */}
                <h2 className="text-red-500">Walkthrough</h2>

                <h3>1. The Checkpoint</h3>
                <p>
                    Expect heavy resistance here. There are two chainsaw sisters (Bella Sisters) you must defeat to get a crank. Use the environment to separate them.
                </p>

                <h3>2. Mendez Boss Fight</h3>
                <p>
                    The fight takes place in a burning building.
                </p>
                <ul>
                    <li><strong>Phase 1:</strong> Shoot the eye on his back. Parry his swipes.</li>
                    <li><strong>Phase 2:</strong> He loses his legs and swings from the rafters. Shoot him down or use flash grenades.</li>
                    <li>Keep moving to avoid the fire.</li>
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
                    <li>The TMP or Shotgun are great for the Mendez fight.</li>
                    <li>Make sure to loot the slaughterhouse before leaving; you can't come back.</li>
                    <li>This is the point of no return for the Village area. Finish any treasure hunting now!</li>
                </ul>
            </div>
        </div>
    );
}