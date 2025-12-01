import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";

export const revalidate = 0; // Disable cache for debugging

async function getMerchantRequests() {
    try {
        const { data, error } = await supabase
            .from("merchant_requests")
            .select("*")
            .order("chapter", { ascending: true });

        if (error) {
            console.error("Error fetching merchant requests:", error);
            return { requests: [], error };
        }

        return { requests: data || [], error: null };
    } catch (e) {
        console.error("Unexpected error:", e);
        return { requests: [], error: e };
    }
}

export default async function MerchantRequestsPage() {
    const { requests, error } = await getMerchantRequests();

    return (
        <div className="container mx-auto px-4 py-8 bg-[#121212] min-h-screen text-gray-200">
            <h1 className="text-4xl font-bold mb-6 text-red-500">Merchant Requests</h1>
            <p className="text-gray-400 mb-8 text-lg">
                Complete list of Merchant Requests, their locations, and rewards.
            </p>

            {error && (
                <div className="bg-red-900/30 border border-red-500 text-red-200 px-4 py-3 rounded relative mb-6" role="alert">
                    <strong className="font-bold">Error loading requests: </strong>
                    <span className="block sm:inline">{error.message || JSON.stringify(error)}</span>
                    <p className="mt-2 text-sm">Check your Supabase connection and RLS policies.</p>
                </div>
            )}

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {requests.length > 0 ? (
                    requests.map((req) => (
                        <div
                            key={req.id}
                            className="bg-[#1e1e1e] border border-gray-800 rounded-lg shadow-lg hover:shadow-xl hover:border-red-900 transition-all overflow-hidden flex flex-col"
                        >
                            {req.image_url && (
                                <div className="relative w-full h-48 border-b border-gray-800">
                                    <Image
                                        src={req.image_url}
                                        alt={req.name}
                                        fill
                                        style={{ objectFit: "cover" }}
                                        priority
                                    />
                                </div>
                            )}

                            <div className="p-5 flex-grow flex flex-col">
                                <h2 className="text-xl font-bold mb-2 text-gray-100">{req.name}</h2>
                                <div className="flex justify-between items-center text-sm mb-4">
                                    {req.chapter && <span className="text-gray-400 bg-gray-800 px-2 py-1 rounded">Chapter {req.chapter}</span>}
                                    {req.reward && <span className="text-amber-500 font-medium">{req.reward}</span>}
                                </div>

                                {req.description && (
                                    <p className="text-gray-400 text-sm mb-4 flex-grow">
                                        {req.description}
                                    </p>
                                )}

                                <div className="mt-auto space-y-3">
                                    {req.solution && (
                                        <div className="pt-3 border-t border-gray-800">
                                            <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Solution Hint:</p>
                                            <p className="text-sm text-gray-300">{req.solution}</p>
                                        </div>
                                    )}

                                    {/* Link to Interactive Map if map_slug is present */}
                                    {req.map_slug && (
                                        <Link
                                            href={`/maps/${req.map_slug}`}
                                            className="block w-full text-center bg-red-600 hover:bg-red-700 text-white text-sm font-semibold py-2 px-4 rounded transition-colors"
                                        >
                                            View on Map
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    !error && (
                        <div className="col-span-full p-8 bg-[#1e1e1e] rounded-lg border border-gray-800 text-center">
                            <p className="text-gray-400 text-lg">
                                No merchant requests available yet.
                            </p>
                        </div>
                    )
                )}
            </div>
        </div>
    );
}
