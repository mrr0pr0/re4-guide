'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';
import { Plus, Map as MapIcon, Loader2, RefreshCw } from 'lucide-react';
import AdminPageHeader from '@/components/AdminPageHeader';
import { toast } from 'sonner';

export default function AdminMapsPage() {
    const [maps, setMaps] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        fetchMaps();
    }, []);

    // 🔥 Re-fetch when returning to page
    useEffect(() => {
        const handleFocus = () => fetchMaps();
        window.addEventListener('focus', handleFocus);
        return () => window.removeEventListener('focus', handleFocus);
    }, []);

    const fetchMaps = async () => {
        try {
            setRefreshing(true);
            const { data, error } = await supabase
                .from('maps')
                .select('*')
                .order('order_index', { ascending: true });

            if (error) throw error;
            setMaps(data || []);
        } catch (error) {
            console.error('Error fetching maps:', error);
            toast.error('Failed to load maps');
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    if (loading) {
        return (
            <div className="flex h-full items-center justify-center">
                <Loader2 className="animate-spin text-slate-200" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <AdminPageHeader
                title="Maps"
                description="Create maps, place pins, and connect teleports."
                actions={
                    <div className="flex items-center gap-2">
                        <button
                            onClick={fetchMaps}
                            className="flex items-center gap-2 rounded-full border border-slate-700 px-3 py-2 text-xs font-semibold text-slate-200 transition hover:border-slate-500"
                        >
                            <RefreshCw size={14} className={refreshing ? 'animate-spin' : ''} />
                            Refresh
                        </button>
                        <Link
                            href="/admin/maps/new"
                            className="flex items-center gap-2 rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-emerald-950 transition hover:bg-emerald-400"
                        >
                            <Plus size={16} /> Add Map
                        </Link>
                    </div>
                }
            />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                {maps.map((map) => (
                    <Link
                        key={map.id}
                        href={`/admin/maps/${map.id}`}
                        className="group relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900/60 shadow-lg shadow-black/30 transition hover:border-slate-600"
                    >
                        <div className="aspect-video bg-slate-900">
                            <img
                                src={map.image_url}
                                alt={map.title}
                                className="h-full w-full object-cover opacity-90 transition duration-200 group-hover:opacity-100"
                            />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                        <div className="absolute inset-0 flex flex-col justify-between p-4">
                            <div className="flex items-center justify-between text-xs text-slate-200/80">
                                <span className="rounded-full bg-slate-900/80 px-3 py-1 font-semibold uppercase tracking-wide text-[10px] text-slate-200">Slug: {map.slug}</span>
                                <span className="rounded-full bg-slate-900/80 px-3 py-1 font-semibold text-emerald-300">Order #{map.order_index ?? 0}</span>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-white drop-shadow-md">{map.title}</h3>
                                <p className="text-sm text-slate-200/80">Click to edit pins</p>
                            </div>
                        </div>
                    </Link>
                ))}

                {maps.length === 0 && (
                    <div className="col-span-full rounded-xl border border-dashed border-slate-800 bg-slate-900/40 px-6 py-12 text-center text-slate-300">
                        <MapIcon className="mx-auto mb-4 opacity-70" size={48} />
                        <p className="font-medium">No maps found</p>
                        <p className="text-sm text-slate-400">Create one to get started.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
