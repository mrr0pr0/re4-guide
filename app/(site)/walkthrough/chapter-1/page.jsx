import Image from "next/image";
import { Link } from "react-router-dom";

export default function Chapter1_1Page() {
  return (
    <div className="container mx-auto px-4 py-8 text-gray-200 bg-[#121212]">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-4xl font-bold mb-2 text-red-500">Chapter 1 – The Beginning: The Village</h1>
        <p className="text-lg text-gray-400 max-w-2xl">
          Leon arrives in rural Spain to investigate the disappearance of the President's daughter. This opening chapter sets the tone for the horror atmosphere of <em>Resident Evil 4 Remake</em>.
        </p>
      </div>

      {/* Main Image */}
      <div className="relative w-full max-w-3xl h-80 rounded-lg shadow-lg mb-10">
        <Image
          src="https://res.cloudinary.com/dxeuo6xas/image/upload/v1764360175/ch1-1_jquzzp.webp"
          alt="Leon arriving at the village"
          fill
          className="rounded-lg object-cover"
          priority
        />
      </div>

      <div className="prose prose-invert max-w-none">
        {/* Overview */}
        <h2 className="text-red-500">Overview</h2>
        <p>
          This chapter teaches core mechanics, introduces basic enemies, and culminates in the
          iconic Village Fight. Expect limited resources, tense encounters, and an introduction to
          the game's blend of action and survival horror.
        </p>

        {/* Story Summary */}
        <h2 className="text-red-500">Story Summary</h2>
        <p>
          Leon approaches the remote village while tracking the missing Ashley Graham. After
          discovering signs of violence in the Hunter's Lodge and confronting the first infected
          Ganado, Leon pushes toward the village square—only to be ambushed. After surviving the
          overwhelming attack and the mysterious ringing of the church bell, Leon proceeds toward
          the farm.
        </p>

        {/* Objectives */}
        <h2 className="text-red-500">Objectives</h2>
        <ul>
          <li>Explore the Hunter's Lodge</li>
          <li>Reach the Village Square</li>
          <li>Survive the Village Attack</li>
          <li>Proceed to the Farm</li>
        </ul>

        {/* Enemies */}
        <h2 className="text-red-500">Enemy Types Introduced</h2>
        <h3>Ganado (Villagers)</h3>
        <p>
          The Ganados are hostile villagers infected with Las Plagas. They behave aggressively,
          often attacking in groups and using farming tools as weapons. Their weaknesses include
          stagger from well-placed shots—especially to the head—followed by melee opportunities.
        </p>

        <div className="relative w-full max-w-xl h-64 rounded-lg shadow-lg mb-6">
          <Image
            src="https://res.cloudinary.com/dxeuo6xas/image/upload/v1764360377/ch1-1_z4thfc.jpg"
            alt="Ganado example"
            fill
            className="rounded-lg object-cover"
          />
        </div>

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
              <td className="p-2 border border-gray-700">Handgun Ammo</td>
              <td className="p-2 border border-gray-700">Hunter's Lodge</td>
              <td className="p-2 border border-gray-700">Useful early on</td>
            </tr>
            <tr>
              <td className="p-2 border border-gray-700">Kitchen Knife</td>
              <td className="p-2 border border-gray-700">Starting Item</td>
              <td className="p-2 border border-gray-700">Breaks over time; essential for parries</td>
            </tr>
            <tr>
              <td className="p-2 border border-gray-700">Pesetas</td>
              <td className="p-2 border border-gray-700">Various</td>
              <td className="p-2 border border-gray-700">Used with the Merchant</td>
            </tr>
          </tbody>
        </table>

        {/* Walkthrough */}
        <h2 className="text-red-500">Walkthrough</h2>

        <h3>1. Hunter's Lodge</h3>
        <p>
          Search the lodge thoroughly. Investigate rooms to find resources. The first Ganado will
          attack once you descend into the basement—use parries or headshots to escape.
        </p>
        <div className="relative w-full max-w-xl h-64 mb-6 rounded-lg shadow-lg">
          <Image
            src="https://res.cloudinary.com/dxeuo6xas/image/upload/v1764360477/ch1-3_sxhnlz.webp"
            alt="Hunter's Lodge interior"
            fill
            className="rounded-lg object-cover"
          />
        </div>

        <h3>2. Path to the Village</h3>
        <p>
          Break crates for resources, use stealth on isolated enemies, and watch for bear traps.
        </p>

        <h3>3. The Village Attack (Main Challenge)</h3>
        <p>
          You are not expected to kill every enemy—just survive until the church bell rings.
        </p>
        <ul>
          <li>Use buildings to barricade windows</li>
          <li>Grab the Shotgun from the second-floor house</li>
          <li>Use grenades to thin crowds</li>
          <li>Focus on survival</li>
        </ul>

        <div className="relative w-full max-w-xl h-64 mb-6 rounded-lg shadow-lg">
          <Image
            src="https://res.cloudinary.com/dxeuo6xas/image/upload/v1764360726/ch1.4_jltvft.png"
            alt="Village map diagram"
            fill
            className="rounded-lg object-cover"
          />
        </div>

        <button className="bg-red-500 text-white px-4 py-2 rounded mb-6 hover:bg-red-600">
          View map
        </button>

        {/* Strategy Table */}
        <h3>Optional – Useful Strategies</h3>
        <table className="w-full border border-gray-700 mb-6">
          <thead className="bg-[#1e1e1e]">
            <tr>
              <th className="p-2 border border-gray-700">Strategy</th>
              <th className="p-2 border border-gray-700">Effectiveness</th>
              <th className="p-2 border border-gray-700">Difficulty</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2 border border-gray-700">Roof-hopping</td>
              <td className="p-2 border border-gray-700">High</td>
              <td className="p-2 border border-gray-700">Medium</td>
            </tr>
            <tr>
              <td className="p-2 border border-gray-700">Barricading houses</td>
              <td className="p-2 border border-gray-700">Medium</td>
              <td className="p-2 border border-gray-700">Easy</td>
            </tr>
            <tr>
              <td className="p-2 border border-gray-700">Shotgun rush</td>
              <td className="p-2 border border-gray-700">High</td>
              <td className="p-2 border border-gray-700">High</td>
            </tr>
          </tbody>
        </table>

        {/* After the Bell */}
        <h2 className="text-red-500">After the Bell</h2>
        <p>
          When the church bell rings, all Ganados abruptly retreat. Use this time to safely loot the
          village before moving toward the farm.
        </p>

        {/* Treasure Locations */}
        <h2 className="text-red-500">Treasure Locations</h2>
        <p>A few treasures can be found in drawers, attic spaces, and hanging containers.</p>
        <div className="relative w-full max-w-xl h-64 rounded-lg shadow-lg mb-6">
          <Image
            src="https://res.cloudinary.com/dxeuo6xas/image/upload/v1764360981/ch1-5th_losljo.webp"
            alt="Treasure markers"
            fill
            className="rounded-lg object-cover"
          />
        </div>
        <div>
          <Link to="/app/(site)/treasures/chapter-1">
            <button className="bg-red-500 text-white px-4 py-2 rounded mb-6 hover:bg-red-600">
              View treasures
            </button>
          </Link>
        </div>

        {/* Tips */}
        <h2 className="text-red-500">Tips for New Players</h2>
        <ul>
          <li>Conserve ammo—use melee whenever possible</li>
          <li>Parrying can save health and ammo</li>
          <li>Break crates with the knife to avoid wasting bullets</li>
        </ul>
      </div>
    </div>
  );
}