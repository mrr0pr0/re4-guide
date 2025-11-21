import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";

export const revalidate = 0; // Disable cache for debugging

async function getPuzzles() {
    try {
        const { data, error } = await supabase
            .from("puzzles")
            .select("*")
            .order("chapter", { ascending: true });

        if (error) {
            console.error("Error fetching puzzles:", error);
            return { puzzles: [], error };
        }

        return { puzzles: data || [], error: null };
    } catch (e) {
        console.error("Unexpected error:", e);
        return { puzzles: [], error: e };
    }
}

export default async function PuzzlesPage() {
    const { puzzles, error } = await getPuzzles();

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-6">Puzzle Solutions</h1>
            <p className="text-gray-600 mb-8">
                Solutions to all puzzles found in Resident Evil 4 Remake.
            </p>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
                    <strong className="font-bold">Error loading puzzles: </strong>
                    <span className="block sm:inline">{error.message || JSON.stringify(error)}</span>
                    <p className="mt-2 text-sm">Check your Supabase connection and RLS policies.</p>
                </div>
            )}

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {puzzles.length > 0 ? (
                    puzzles.map((puzzle) => (
                        <div
                            key={puzzle.id}
                            className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow overflow-hidden flex flex-col"
                        >
                            {puzzle.image_url && (
                                <div className="relative w-full h-48">
                                    <Image
                                        src={puzzle.image_url}
                                        alt={puzzle.name}
                                        fill
                                        style={{ objectFit: "cover" }}
                                        priority
                                    />
                                </div>
                            )}

                            <div className="p-4 flex-grow">
                                <h2 className="text-xl font-semibold mb-2">{puzzle.name}</h2>
                                <div className="flex justify-between items-center text-sm text-gray-500 mb-3">
                                    {puzzle.chapter && <span>Chapter {puzzle.chapter}</span>}
                                    {puzzle.difficulty && (
                                        <span className={`px-2 py-1 rounded text-xs font-medium ${puzzle.difficulty === 'Hard' ? 'bg-red-100 text-red-800' :
                                                puzzle.difficulty === 'Normal' ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-green-100 text-green-800'
                                            }`}>
                                            {puzzle.difficulty}
                                        </span>
                                    )}
                                </div>

                                {puzzle.location && (
                                    <p className="text-gray-600 text-sm mb-2">
                                        <span className="font-medium">Location:</span> {puzzle.location}
                                    </p>
                                )}

                                {puzzle.solution && (
                                    <div className="mt-4 p-3 bg-gray-50 rounded text-sm">
                                        <p className="font-medium text-gray-900 mb-1">Solution:</p>
                                        <p className="text-gray-700">{puzzle.solution}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    !error && (
                        <div className="col-span-full p-6 bg-white rounded-lg shadow">
                            <p className="text-gray-600">
                                No puzzles available yet.
                            </p>
                        </div>
                    )
                )}
            </div>
        </div>
    );
}
