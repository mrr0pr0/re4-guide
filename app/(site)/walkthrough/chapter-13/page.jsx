import Image from "next/image";
import Link from "next/link";

export default function Chapter13Page() {
    return (
        <div className="container mx-auto px-4 py-8 text-gray-200 bg-[#121212]">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-4xl font-bold mb-2 text-red-500">Chapter 13 – The Island</h1>
                <p className="text-lg text-gray-400 max-w-2xl">
                    Leon arrives at the fortified Island base. The enemies here are militarized, using firearms and stun rods. The horror element returns with the introduction of the Regeneradors.
                </p>
            </div>

            <hr className="my-6 border-red-500" />

            <div className="relative w-full max-w-3xl h-80 rounded-lg shadow-lg mb-10">
                <Image
                    src="https://placehold.co/800x400/1a1a1a/red?text=Chapter+13+Island"
                    alt="The Island"
                    fill
                    className="rounded-lg object-cover"
                    priority
                />
            </div>

            <div className="prose prose-invert max-w-none">
                {/* Overview */}
                <h2 className="text-red-500">Overview</h2>
                <p>
                    The gameplay shifts to a more action-oriented style with gun-wielding enemies. You must navigate the Wharf, the Surveillance labs, and the Incubation Lab.
                </p>

                {/* Story Summary */}
                <h2 className="text-red-500">Story Summary</h2>
                <p>
                    Leon lands on the island and fights through the outer defenses. He discovers that Ashley is being held in a secure facility. To reach her, he must upgrade his keycard clearance while avoiding the lab's escaped experiments.
                </p>

                {/* Objectives */}
                <h2 className="text-red-500">Objectives</h2>
                <ul>
                    <li>Secure the Wharf</li>
                    <li>Obtain the Level 1 Keycard</li>
                    <li>Upgrade to Level 2 Keycard</li>
                    <li>Upgrade to Level 3 Keycard</li>
                    <li>Rescue Ashley</li>
                </ul>

                {/* Enemies */}
                <h2 className="text-red-500">Enemy Types Introduced</h2>
                <h3>Soldier Ganados</h3>
                <p>
                    They use RPGs, crossbows, shields, and stun rods. They are smarter and flank you.
                </p>
                <h3>Regenerador</h3>
                <p>
                    A terrifying experiment that can regenerate limbs. You cannot kill it with normal gunfire easily. You must destroy the Plagas inside its body.
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
                            <td className="p-2 border border-gray-700">Biosensor Scope</td>
                            <td className="p-2 border border-gray-700">Incubation Lab</td>
                            <td className="p-2 border border-gray-700">Essential for killing Regeneradors</td>
                        </tr>
                        <tr>
                            <td className="p-2 border border-gray-700">Level 1 Keycard</td>
                            <td className="p-2 border border-gray-700">Utility Area</td>
                            <td className="p-2 border border-gray-700">Dropped by enemy</td>
                        </tr>
                        <tr>
                            <td className="p-2 border border-gray-700">Level 3 Keycard</td>
                            <td className="p-2 border border-gray-700">Incubation Lab</td>
                            <td className="p-2 border border-gray-700">Requires waiting for machine</td>
                        </tr>
                    </tbody>
                </table>

                {/* Walkthrough */}
                <h2 className="text-red-500">Walkthrough</h2>

                <h3>1. The Wharf</h3>
                <p>
                    Watch out for the laser turrets. You can change their orientation to hit enemies instead.
                </p>

                <h3>2. The Labs & Regeneradors</h3>
                <p>
                    When you hear the breathing, run. You cannot effectively kill the first Regenerador you meet.
                </p>
                <ul>
                    <li>Find the <strong>Biosensor Scope</strong> in the Incubation Lab.</li>
                    <li>Attach it to a rifle (or LE-5).</li>
                    <li>Aim at the Regenerador to see the glowing parasites inside. Shoot them all to kill it.</li>
                </ul>

                <h3>3. Keycard Upgrade</h3>
                <p>
                    While the keycard is writing (it takes time), waves of enemies will attack. Defend the machine!
                </p>

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
                    <li>The LE-5 SMG (found in the Freezer) is compatible with the Biosensor Scope and can penetrate enemies.</li>
                    <li>Regeneradors can stretch their arms to grab you from afar. Keep your distance.</li>
                    <li>Soldiers with stun rods can stunlock you. Prioritize them.</li>
                </ul>
            </div>
        </div>
    );
}