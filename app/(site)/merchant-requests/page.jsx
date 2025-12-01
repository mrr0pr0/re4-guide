import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";
import { MapPin, Gift, BookOpen, Search } from "lucide-react";
import MerchantRequestsClient from "./MerchantRequestsClient";

export const revalidate = 0;

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
        <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] via-[#121212] to-[#1a1a1a]">
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-gradient-to-r from-red-950/20 via-red-900/10 to-red-950/20 border-b border-red-900/30">
                <div className="absolute inset-0 bg-[url('/images/Background.jpg')] opacity-10"></div>
                <div className="container mx-auto px-4 py-16 relative">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 bg-red-950/40 border border-red-800/50 rounded-full px-4 py-2 mb-6">
                            <Gift className="w-4 h-4 text-red-400" />
                            <span className="text-sm font-medium text-red-300">Complete Guide</span>
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent">
                            Merchant Requests
                        </h1>
                        <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                            Complete all merchant requests to unlock exclusive rewards and upgrades. 
                            Track your progress and find exact locations on our interactive maps.
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center text-sm">
                            <div className="flex items-center gap-2 bg-[#1e1e1e] border border-gray-800 rounded-lg px-4 py-2">
                                <BookOpen className="w-4 h-4 text-amber-500" />
                                <span className="text-gray-300">{requests.length} Total Requests</span>
                            </div>
                            <div className="flex items-center gap-2 bg-[#1e1e1e] border border-gray-800 rounded-lg px-4 py-2">
                                <MapPin className="w-4 h-4 text-red-500" />
                                <span className="text-gray-300">Interactive Map Links</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                {error && (
                    <div className="max-w-4xl mx-auto mb-8 bg-red-950/30 border border-red-500/50 rounded-lg p-6 backdrop-blur-sm">
                        <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                                <span className="text-red-400 text-xl">⚠</span>
                            </div>
                            <div className="flex-1">
                                <h3 className="text-red-300 font-semibold mb-1">Error Loading Requests</h3>
                                <p className="text-red-200/80 text-sm mb-2">
                                    {error.message || JSON.stringify(error)}
                                </p>
                                <p className="text-red-300/60 text-xs">
                                    Check your Supabase connection and RLS policies.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                <MerchantRequestsClient requests={requests} />
            </div>
        </div>
    );
}