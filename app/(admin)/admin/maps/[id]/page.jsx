'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import AdminMapBuilder from '@/components/AdminMapBuilder';
import { Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

export default function AdminMapEditorPage({ params }) {
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
    const [allMaps, setAllMaps] = useState([]);
    const [loading, setLoading] = useState(!isNew);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchCategories();
        fetchAllMaps();
        if (!isNew) fetchMapData();
    }, [id]);

    const fetchCategories = async () => {
        const { data } = await supabase.from('pin_categories').select('*');
        if (data) setCategories(data);
    };

    const fetchAllMaps = async () => {
        const { data } = await supabase.from('maps').select('id, title, slug').order('title');
        if (data) setAllMaps(data);
    };

    const fetchMapData = async () => {
        try {
            const { data: map, error: mapError } = await supabase
                .from('maps')
                .select('*')
                .eq('id', id)
                .single();

            if (mapError) throw mapError;
            setMapData(map);

            const { data: mapPins, error: pinsError } = await supabase
                .from('pins')
                .select('*')
                .eq('map_id', id);

            if (pinsError) throw pinsError;
            setPins(mapPins || []);

        } catch (error) {
            console.error('Fetch error:', error);
            toast.error('Failed to load map');
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (updatedPins) => {
        setSaving(true);
        console.log('=== STARTING SAVE ===');
        console.log('Updated pins received:', updatedPins);
        console.log('Categories:', categories);

        try {
            let mapId = id;

            // SAVE MAP
            if (isNew) {
                console.log('Creating new map...');
                const { data, error } = await supabase
                    .from('maps')
                    .insert([mapData])
                    .select()
                    .single();

                if (error) {
                    console.error('Map creation error:', error);
                    throw error;
                }
                console.log('Map created:', data);
                mapId = data.id;
            } else {
                console.log('Updating existing map...');
                const { error } = await supabase
                    .from('maps')
                    .update(mapData)
                    .eq('id', id);

                if (error) {
                    console.error('Map update error:', error);
                    throw error;
                }
                console.log('Map updated successfully');
            }

            // SEPARATE NEW PINS FROM EXISTING PINS
            // FIX: Supabase returns UUIDs as strings, not numbers
            // New pins have IDs starting with 'temp-', existing pins have UUID strings
            const newPins = updatedPins.filter(p => {
                const isTemp = typeof p.id === 'string' && p.id.startsWith('temp-');
                console.log(`Pin ${p.id} is ${isTemp ? 'NEW' : 'EXISTING'}`);
                return isTemp;
            });
            const existingPins = updatedPins.filter(p => 
                typeof p.id === 'string' && !p.id.startsWith('temp-')
            );

            console.log(`Found ${newPins.length} new pins and ${existingPins.length} existing pins`);

            let allSavedPins = [];

            // INSERT NEW PINS
            if (newPins.length > 0) {
                const pinsToInsert = newPins.map((p) => {
                    const categoryId = categories.find(c => c.slug === p.category)?.id;
                    console.log(`Pin "${p.title}" category "${p.category}" -> category_id: ${categoryId}`);
                    
                    return {
                        map_id: mapId,
                        title: p.title,
                        description: p.description || '',
                        x: p.x,
                        y: p.y,
                        category_id: categoryId,
                        target_map_id: p.target_map_id || null
                    };
                });

                console.log('Inserting new pins:', JSON.stringify(pinsToInsert, null, 2));

                const { error: insertError, data: insertedPins } = await supabase
                    .from('pins')
                    .insert(pinsToInsert)
                    .select();

                if (insertError) {
                    console.error('Insert error details:', {
                        message: insertError.message,
                        details: insertError.details,
                        hint: insertError.hint,
                        code: insertError.code
                    });
                    throw new Error(`Insert failed: ${insertError.message}`);
                }

                console.log('Inserted pins:', insertedPins);
                allSavedPins = [...(insertedPins || [])];
            }

            // UPDATE EXISTING PINS
            if (existingPins.length > 0) {
                console.log('Updating existing pins...');
                for (const pin of existingPins) {
                    const categoryId = categories.find(c => c.slug === pin.category)?.id;
                    console.log(`Updating pin ${pin.id}: "${pin.title}" with category_id: ${categoryId}`);

                    const { error: updateError, data: updatedPin } = await supabase
                        .from('pins')
                        .update({
                            title: pin.title,
                            description: pin.description || '',
                            x: pin.x,
                            y: pin.y,
                            category_id: categoryId,
                            target_map_id: pin.target_map_id || null
                        })
                        .eq('id', pin.id)
                        .select()
                        .single();

                    if (updateError) {
                        console.error('Update error details:', {
                            message: updateError.message,
                            details: updateError.details,
                            hint: updateError.hint,
                            code: updateError.code,
                            pinId: pin.id
                        });
                        throw new Error(`Update failed for pin ${pin.id}: ${updateError.message}`);
                    }

                    if (updatedPin) {
                        console.log(`Successfully updated pin ${pin.id}`);
                        allSavedPins.push(updatedPin);
                    }
                }
            }

            console.log('All saved pins:', allSavedPins);
            toast.success(`Map saved! ${newPins.length} new pins added, ${existingPins.length} pins updated.`);

            // UPDATE LOCAL PINS WITHOUT REFRESH
            setPins(allSavedPins);

            if (isNew) {
                router.push(`/admin/maps/${mapId}`);
            }

        } catch (error) {
            console.error('Save error:', error);
            console.error('Error type:', typeof error);
            console.error('Error keys:', Object.keys(error));
            console.error('Error message:', error?.message);
            console.error('Error stack:', error?.stack);
            toast.error(`Failed to save map: ${error?.message || 'Unknown error'}`);
        } finally {
            setSaving(false);
            console.log('=== SAVE COMPLETE ===');
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full">
                <Loader2 className="animate-spin" />
            </div>
        );
    }

    return (
        <div className="flex flex-col h-[calc(100vh-4rem)]">
            <div className="p-4 border-b bg-card flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <Link href="/admin/maps" className="p-2 hover:bg-accent rounded-full">
                        <ArrowLeft size={20} />
                    </Link>
                    <h1 className="text-xl font-bold">
                        {isNew ? 'Create New Map' : `Edit: ${mapData.title}`}
                    </h1>
                </div>
                {saving && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Loader2 className="animate-spin" size={16} />
                        Saving...
                    </div>
                )}
            </div>

            <div className="flex-1 flex overflow-hidden">
                {/* Sidebar */}
                <div className="w-80 border-r bg-card p-4 overflow-y-auto z-10">
                    <h2 className="font-bold mb-4">Map Settings</h2>

                    <div className="space-y-4">
                        {/* TITLE */}
                        <div>
                            <label className="block text-sm font-medium mb-1">Title</label>
                            <input
                                type="text"
                                value={mapData.title}
                                onChange={(e) =>
                                    setMapData({ ...mapData, title: e.target.value })
                                }
                                className="w-full p-2 rounded border bg-background"
                            />
                        </div>

                        {/* SLUG */}
                        <div>
                            <label className="block text-sm font-medium mb-1">Slug</label>
                            <input
                                type="text"
                                value={mapData.slug}
                                onChange={(e) =>
                                    setMapData({ ...mapData, slug: e.target.value })
                                }
                                className="w-full p-2 rounded border bg-background"
                            />
                        </div>

                        {/* IMAGE URL */}
                        <div>
                            <label className="block text-sm font-medium mb-1">Image URL</label>
                            <input
                                type="text"
                                value={mapData.image_url}
                                onChange={(e) =>
                                    setMapData({ ...mapData, image_url: e.target.value })
                                }
                                className="w-full p-2 rounded border bg-background"
                            />
                        </div>

                        {/* ORDER */}
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Order Index
                            </label>
                            <input
                                type="number"
                                value={mapData.order_index}
                                onChange={(e) =>
                                    setMapData({
                                        ...mapData,
                                        order_index:
                                            e.target.value === ''
                                                ? 0
                                                : parseInt(e.target.value)
                                    })
                                }
                                className="w-full p-2 rounded border bg-background"
                            />
                        </div>
                    </div>
                </div>

                {/* Map Builder */}
                <div className="flex-1 bg-gray-100 dark:bg-gray-900 relative">
                    {mapData.image_url ? (
                        <AdminMapBuilder
                            imageUrl={mapData.image_url}
                            initialPins={pins.map((p) => ({
                                ...p,
                                category:
                                    categories.find((c) => c.id === p.category_id)?.slug ??
                                    'treasure'
                            }))}
                            categories={categories}
                            allMaps={allMaps}
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