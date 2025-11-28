import Image from "next/image";
import Link from "next/link";

export default function Chapter15Page() {
    return (
        <div className="container mx-auto px-4 py-8 text-gray-200 bg-[#121212]">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-4xl font-bold mb-2 text-red-500">Chapter 15 – Mike & The Sanctuary</h1>
                <p className="text-lg text-gray-400 max-w-2xl">
                    The assault on the cult's stronghold. Leon gets air support from Mike, leading to an explosive action sequence before the final descent into the Sanctuary.
                </p>
            </div>

            <hr className="my-6 border-red-500" />

            <div className="relative w-full max-w-3xl h-80 rounded-lg shadow-lg mb-10">
                <Image
                    src="https://placehold.co/800x400/1a1a1a/red?text=Chapter+15+Mike"
                    alt="Helicopter Support"
                    fill
                    className="rounded-lg object-cover"
                    priority
                />
            </div>

            <div className="prose prose-invert max-w-none">
                {/* Overview */}
                <h2 className="text-red-500">Overview</h2>
                <p>
                    This is the "war" chapter. You'll fight waves of soldiers with helicopter backup. It's loud, chaotic, and fun. The latter half slows down as you enter the creepy ruins leading to the Sanctuary.
                </p>

                {/* Story Summary */}
                <h2 className="text-red-500">Story Summary</h2>
                <p>
                    Mike arrives in his chopper to clear the path for Leon. They destroy the anti-air guns and push through the cliffside fortifications. However, tragedy strikes, and Leon must face the horrors of the Sanctuary alone to find Ashley.
                </p>

                {/* Objectives */}
                <h2 className="text-red-500">Objectives</h2>
                <ul>
                    <li>Destroy the Anti-Air Gun</li>
                    <li>Survive the Cliffside Battle</li>
                    <li>Enter the Sanctuary</li>
                    <li>Rescue Ashley (Again)</li>
                </ul>

                {/* Enemies */}
                <h2 className="text-red-500">Enemy Types Introduced</h2>
                <h3>Iron Maiden</h3>
                <p>
                    A spiked variant of the Regenerador. If you get too close, it extends spikes from its body. When it dies, it explodes in a shower of needles. Keep your distance!
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
                            <td className="p-2 border border-gray-700">Staff of Royalty</td>
                            <td className="p-2 border border-gray-700">Ruins</td>
                            <td className="p-2 border border-gray-700">Treasure</td>
                        </tr>
                    </tbody>
                </table>

                {/* Walkthrough */}
                <h2 className="text-red-500">Walkthrough</h2>

                <h3>1. Helicopter Support</h3>
                <p>
                    Let Mike do the work!
                </p>
                <ul>
                    <li>Lure enemies into the open so Mike can shoot them.</li>
                    <li>Focus on the RPG troopers who can damage the chopper.</li>
                    <li>Use the machine gun turrets to destroy the AA gun.</li>
                </ul>

                <h3>2. The Cliffside Ruins</h3>
                <p>
                    After the crash, you enter a dark area filled with body bags.
                </p>
                <ul>
                    <li>Regeneradors are patrolling here. Use your Biosensor Scope.</li>
                    <li>Watch out for Iron Maidens. Don't let them hug you.</li>
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
                    <li>Heavy Grenades are great for destroying the AA gun if you can't reach the turret.</li>
                    <li>In the Regenerador section, you can often sneak past them if you're careful.</li>
                    <li>Stock up on ammo. The final battle is next.</li>
                </ul>
            </div>
        </div>
    );
}