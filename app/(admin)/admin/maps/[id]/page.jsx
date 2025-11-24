'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import AdminMapBuilder from '@/components/AdminMapBuilder';
import { Loader2, Save, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

export default function AdminMapEditorPage({ params }) {
    // Unwrap params using React.use()
    const resolvedParams = use(params);
    const { id } = resolvedParams;
    const isNew = id === 'new';
    const router = useRouter();

    const [mapData, setMapData] = useState({
        title: '',
        slug: '',
        image_url: '',
        order_index: 0
    });
    const [pins, setPins] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(!isNew);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchCategories();
        if (!isNew) {
            fetchMapData();
        }
    }, [id, isNew]);

    const fetchCategories = async () => {
        const { data } = await supabase.from('pin_categories').select('*');
        if (data) setCategories(data);
    };

    const fetchMapData = async () => {
        try {
            // Fetch Map
            const { data: map, error: mapError } = await supabase
                .from('maps')
                .select('*')
                .eq('id', id)
                .single();

            if (mapError) throw mapError;
            setMapData(map);

            // Fetch Pins
            const { data: mapPins, error: pinsError } = await supabase
                .from('pins')
                .select('*')
                .eq('map_id', id);

            if (pinsError) throw pinsError;
            setPins(mapPins || []);

        } catch (error) {
            console.error('Error fetching map:', error);
            toast.error('Failed to load map data');
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (updatedPins) => {
        setSaving(true);
        try {
            let mapId = id;

            // 1. Save Map Details
            if (isNew) {
                const { data, error } = await supabase
                    .from('maps')
                    .insert([mapData])
                    .select()
                    .single();

                if (error) throw error;
                mapId = data.id;
            } else {
                const { error } = await supabase
                    .from('maps')
                    .update(mapData)
                    .eq('id', id);

                if (error) throw error;
            }

            // 2. Save Pins
            // First, delete existing pins (simple approach, or upsert)
            // For simplicity in this demo, we'll delete all and re-insert
            // In production, you'd want to diff changes
            if (!isNew) {
                await supabase.from('pins').delete().eq('map_id', mapId);
            }

            if (updatedPins.length > 0) {
                const pinsToInsert = updatedPins.map(p => ({
                    map_id: mapId,
                    category_id: categories.find(c => c.slug === p.category)?.id, // Map slug to ID
                    x: p.x,
                    y: p.y,
                    title: p.title,
                    description: p.description,
                    // Remove temp properties
                }));

                const { error: pinError } = await supabase
                    .from('pins')
                    .insert(pinsToInsert);

                if (pinError) throw pinError;
            }

            toast.success('Map saved successfully');
            if (isNew) {
                router.push(`/admin/maps/${mapId}`);
            } else {
                // Refresh pins to get new IDs
                fetchMapData();
            }

        } catch (error) {
            console.error('Error saving map:', error);
            console.error('Error details:', error.message, error.details, error.hint);
            toast.error(`Failed to save map: ${error.message || 'Unknown error'}`);
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="flex items-center justify-center h-full"><Loader2 className="animate-spin" /></div>;

    return (
        <div className="flex flex-col h-[calc(100vh-4rem)]">
            <div className="p-4 border-b bg-card flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <Link href="/admin/maps" className="p-2 hover:bg-accent rounded-full">
                        <ArrowLeft size={20} />
                    </Link>
                    <h1 className="text-xl font-bold">{isNew ? 'Create New Map' : `Edit: ${mapData.title}`}</h1>
                </div>
            </div>

            <div className="flex-1 flex overflow-hidden">
                {/* Map Settings Sidebar */}
                <div className="w-80 border-r bg-card p-4 overflow-y-auto z-10">
                    <h2 className="font-bold mb-4">Map Settings</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Title</label>
                            <input
                                type="text"
                                value={mapData.title}
                                onChange={e => setMapData({ ...mapData, title: e.target.value })}
                                className="w-full p-2 rounded border bg-background"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Slug</label>
                            <input
                                type="text"
                                value={mapData.slug}
                                onChange={e => setMapData({ ...mapData, slug: e.target.value })}
                                className="w-full p-2 rounded border bg-background"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Image URL</label>
                            <input
                                type="text"
                                value={mapData.image_url}
                                onChange={e => setMapData({ ...mapData, image_url: e.target.value })}
                                className="w-full p-2 rounded border bg-background"
                            />
                            <p className="text-xs text-muted-foreground mt-1">
                                Enter a URL for the map image.
                            </p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Order Index</label>
                            <input
                                type="number"
                                value={mapData.order_index}
                                onChange={e => setMapData({ ...mapData, order_index: e.target.value === '' ? 0 : parseInt(e.target.value) })}
                                className="w-full p-2 rounded border bg-background"
                            />
                        </div>
                    </div>
                </div>

                {/* Map Builder Area */}
                <div className="flex-1 bg-gray-100 dark:bg-gray-900 relative">
                    {mapData.image_url ? (
                        <AdminMapBuilder
                            imageUrl={mapData.image_url}
                            initialPins={pins.map(p => ({
                                ...p,
                                category: categories.find(c => c.id === p.category_id)?.slug || 'treasure' // Map ID back to slug for UI
                            }))}
                            categories={categories}
                            onSave={handleSave}
                        />
                    ) : (
                        <div className="flex items-center justify-center h-full text-muted-foreground">
                            Please enter an Image URL to start placing pins.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
