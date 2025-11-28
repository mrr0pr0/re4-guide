import Image from "next/image";
import Link from "next/link";

export default function Chapter10Page() {
    return (
        <div className="container mx-auto px-4 py-8 text-gray-200 bg-[#121212]">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-4xl font-bold mb-2 text-red-500">Chapter 10 – The Ballroom & Verdugo</h1>
                <p className="text-lg text-gray-400 max-w-2xl">
                    The descent into the depths of the castle. Leon must fight through a nest of insectoid horrors before facing Salazar's "right hand," the Verdugo.
                </p>
            </div>

            <hr className="my-6 border-red-500" />

            <div className="relative w-full max-w-3xl h-80 rounded-lg shadow-lg mb-10">
                <Image
                    src="https://placehold.co/800x400/1a1a1a/red?text=Chapter+10+Verdugo"
                    alt="Verdugo"
                    fill
                    className="rounded-lg object-cover"
                    priority
                />
            </div>

            <div className="prose prose-invert max-w-none">
                {/* Overview */}
                <h2 className="text-red-500">Overview</h2>
                <p>
                    This chapter takes you from the opulent Ballroom, now a nest for Novistadors, down into the dark, watery depths of the sewers/underground lab where an unkillable stalker awaits.
                </p>

                {/* Story Summary */}
                <h2 className="text-red-500">Story Summary</h2>
                <p>
                    Ashley has been captured again. Leon fights his way to the throne room, only to be dropped into a pit by Salazar. He must navigate the underground waterways to find an elevator back up, but he is hunted by the Verdugo.
                </p>

                {/* Objectives */}
                <h2 className="text-red-500">Objectives</h2>
                <ul>
                    <li>Pass through the Ballroom</li>
                    <li>Survive the Double Garrador room</li>
                    <li>Navigate the Sewers</li>
                    <li>Activate the Elevator</li>
                    <li>Defeat or Survive the Verdugo</li>
                </ul>

                {/* Enemies */}
                <h2 className="text-red-500">Enemy Types Introduced</h2>
                <h3>Novistadors</h3>
                <p>
                    Giant insect-like creatures. Some can camouflage and become nearly invisible. Look for the shimmer in the air and their glowing eyes.
                </p>
                <h3>Verdugo (Boss)</h3>
                <p>
                    A fast, lethal alien-like creature. It has high resistance to damage.
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
                            <td className="p-2 border border-gray-700">Cubic Device</td>
                            <td className="p-2 border border-gray-700">Chest after Armory</td>
                            <td className="p-2 border border-gray-700">Key for square lock boxes</td>
                        </tr>
                        <tr>
                            <td className="p-2 border border-gray-700">Biosensor Scope</td>
                            <td className="p-2 border border-gray-700">Lab (Chapter 13)</td>
                            <td className="p-2 border border-gray-700">Wait, this is later. Ignore.</td>
                        </tr>
                    </tbody>
                </table>

                {/* Walkthrough */}
                <h2 className="text-red-500">Walkthrough</h2>

                <h3>1. The Ballroom</h3>
                <p>
                    Novistadors are everywhere. Use a rifle or shotgun. If you see a shimmer, shoot it!
                </p>

                <h3>2. Double Garrador Room</h3>
                <p>
                    You have to fight two Garradors and several Zealots.
                </p>
                <ul>
                    <li>Use the bell to group them up.</li>
                    <li>Heavy grenades are excellent here.</li>
                    <li>Take out the Zealots first so you can focus on the Garradors.</li>
                </ul>

                <h3>3. Verdugo Boss Fight</h3>
                <p>
                    You can choose to kill him or wait for the elevator (about 4 minutes).
                </p>
                <ul>
                    <li><strong>To Kill:</strong> Use the liquid nitrogen showers (red buttons on walls) to freeze him. While frozen, he takes massive damage (x3). Use your magnum or shotgun.</li>
                    <li><strong>To Survive:</strong> Run loops. Freeze him to slow him down. Dodge his tail attacks (QTE).</li>
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
                    <li>The Verdugo drops a valuable monocle if you kill him. It's worth the ammo if you have it.</li>
                    <li>Rocket Launcher kills a frozen Verdugo instantly.</li>
                    <li>In the Ballroom, shoot the nests hanging from the ceiling to stop more bugs from spawning.</li>
                </ul>
            </div>
        </div>
    );
}