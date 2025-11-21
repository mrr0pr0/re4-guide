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
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-6">Merchant Requests</h1>
            <p className="text-gray-600 mb-8">
                Complete list of Merchant Requests, their locations, and rewards.
            </p>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
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
                            className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow overflow-hidden flex flex-col"
                        >
                            {req.image_url && (
                                <div className="relative w-full h-48">
                                    <Image
                                        src={req.image_url}
                                        alt={req.name}
                                        fill
                                        style={{ objectFit: "cover" }}
                                        priority
                                    />
                                </div>
                            )}

                            <div className="p-4 flex-grow">
                                <h2 className="text-xl font-semibold mb-2">{req.name}</h2>
                                <div className="flex justify-between items-center text-sm text-gray-500 mb-3">
                                    {req.chapter && <span>Chapter {req.chapter}</span>}
                                    {req.reward && <span className="text-amber-600 font-medium">{req.reward}</span>}
                                </div>

                                {req.description && (
                                    <p className="text-gray-600 text-sm mb-4">
                                        {req.description}
                                    </p>
                                )}

                                {req.solution && (
                                    <div className="mt-auto pt-3 border-t border-gray-100">
                                        <p className="text-xs text-gray-500 uppercase font-semibold">Solution Hint:</p>
                                        <p className="text-sm text-gray-700">{req.solution}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    !error && (
                        <div className="col-span-full p-6 bg-white rounded-lg shadow">
                            <p className="text-gray-600">
                                No merchant requests available yet.
                            </p>
                        </div>
                    )
                )}
            </div>
        </div>
    );
}
