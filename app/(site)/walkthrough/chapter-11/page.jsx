import Image from "next/image";
import Link from "next/link";

export default function Chapter11Page() {
    return (
        <div className="container mx-auto px-4 py-8 text-gray-200 bg-[#121212]">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-4xl font-bold mb-2 text-red-500">Chapter 11 – The Mines & Krauser</h1>
                <p className="text-lg text-gray-400 max-w-2xl">
                    Leon and Luis delve deeper into the mines beneath the castle. This chapter features a chaotic minecart ride, a fight against two giants, and a reunion with an old comrade.
                </p>
            </div>

            <hr className="my-6 border-red-500" />

            <div className="relative w-full max-w-3xl h-80 rounded-lg shadow-lg mb-10">
                <Image
                    src="https://placehold.co/800x400/1a1a1a/red?text=Chapter+11+Mines"
                    alt="The Mines"
                    fill
                    className="rounded-lg object-cover"
                    priority
                />
            </div>

            <div className="prose prose-invert max-w-none">
                {/* Overview */}
                <h2 className="text-red-500">Overview</h2>
                <p>
                    Action ramps up significantly. You'll partner with Luis for most of this chapter. Key events include the Blast Furnace (Double El Gigante fight), the Minecart section, and the first duel with Jack Krauser.
                </p>

                {/* Story Summary */}
                <h2 className="text-red-500">Story Summary</h2>
                <p>
                    Leon and Luis work together to find a way to the surface. They must clear the mines of debris and enemies. However, their escape is cut short by the arrival of Jack Krauser, Leon's former major, who is now working for Saddler.
                </p>

                {/* Objectives */}
                <h2 className="text-red-500">Objectives</h2>
                <ul>
                    <li>Navigate the Mines</li>
                    <li>Retrieve Dynamite</li>
                    <li>Defeat the Two El Gigantes</li>
                    <li>Survive the Minecart Ride</li>
                    <li>Defeat Krauser (Knife Fight)</li>
                </ul>

                {/* Enemies */}
                <h2 className="text-red-500">Enemy Types Introduced</h2>
                <h3>Jack Krauser (Knife Form)</h3>
                <p>
                    A master of CQC. He attacks relentlessly with his knife. You must parry perfectly to survive.
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
                            <td className="p-2 border border-gray-700">Dynamite</td>
                            <td className="p-2 border border-gray-700">Mines</td>
                            <td className="p-2 border border-gray-700">Used to clear rubble</td>
                        </tr>
                    </tbody>
                </table>

                {/* Walkthrough */}
                <h2 className="text-red-500">Walkthrough</h2>

                <h3>1. The Blast Furnace</h3>
                <p>
                    You face two El Gigantes (one armored, one unarmored).
                </p>
                <ul>
                    <li>Drop the unarmored one into the lava pit by opening the trapdoor when he's in the center.</li>
                    <li>For the armored one, Luis will eventually plant dynamite on his back. Shoot it to expose the Plaga.</li>
                </ul>

                <h3>2. The Minecart Ride</h3>
                <p>
                    An on-rails shooter section.
                </p>
                <ul>
                    <li>Shoot the enemies in the other carts.</li>
                    <li>Shoot the switch signs to change tracks so you don't crash.</li>
                    <li>Lean left/right to balance the cart on corners.</li>
                </ul>

                <h3>3. Krauser Knife Fight</h3>
                <p>
                    This is a test of your parrying skills.
                </p>
                <ul>
                    <li>Watch the knife indicator (L1/LB).</li>
                    <li>Parry his attacks to open him up for a melee kick.</li>
                    <li>Don't try to shoot him; he'll dodge everything.</li>
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
                    <li>Repair your knife before the Krauser fight! If it breaks, you're in trouble.</li>
                    <li>In the minecart section, you have infinite ammo for the Red9. Don't stop shooting.</li>
                    <li>Luis is a great distraction in the double Gigante fight. Let him draw aggro.</li>
                </ul>
            </div>
        </div>
    );
}