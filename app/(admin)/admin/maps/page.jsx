'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';
import { Plus, Map as MapIcon, Loader2 } from 'lucide-react';

export default function AdminMapsPage() {
    const [maps, setMaps] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMaps();
    }, []);

    const fetchMaps = async () => {
        try {
            const { data, error } = await supabase
                .from('maps')
                .select('*')
                .order('order_index', { ascending: true });

            if (error) throw error;
            setMaps(data || []);
        } catch (error) {
            console.error('Error fetching maps:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="flex items-center justify-center h-full"><Loader2 className="animate-spin" /></div>;
    }

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Maps</h1>
                <Link
                    href="/admin/maps/new"
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90"
                >
                    <Plus size={16} /> Add New Map
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {maps.map((map) => (
                    <Link
                        key={map.id}
                        href={`/admin/maps/${map.id}`}
                        className="group block border rounded-lg overflow-hidden hover:border-primary transition-colors"
                    >
                        <div className="aspect-video bg-muted relative">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={map.image_url}
                                alt={map.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <span className="text-white font-medium">Edit Map</span>
                            </div>
                        </div>
                        <div className="p-4">
                            <h3 className="font-bold text-lg">{map.title}</h3>
                            <p className="text-sm text-muted-foreground">Slug: {map.slug}</p>
                        </div>
                    </Link>
                ))}

                {maps.length === 0 && (
                    <div className="col-span-full text-center py-12 text-muted-foreground border-2 border-dashed rounded-lg">
                        <MapIcon className="mx-auto mb-4 opacity-50" size={48} />
                        <p>No maps found. Create one to get started.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
