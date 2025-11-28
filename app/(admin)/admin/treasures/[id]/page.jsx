'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { Loader2, ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

export default function AdminTreasureEditorPage({ params }) {
    const resolvedParams = use(params);
    const { id } = resolvedParams;
    const isNew = id === 'new';
    const router = useRouter();

    const [loading, setLoading] = useState(!isNew);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        type: 'treasure',
        value: 0,
        location: '',
        chapter: '',
        description: '',
        image_url: '',
        map_coordinates: { x: 0, y: 0 }
    });

    useEffect(() => {
        if (!isNew) {
            fetchTreasure();
        }
    }, [id, isNew]);

    const fetchTreasure = async () => {
        try {
            const { data, error } = await supabase
                .from('treasures')
                .select('*')
                .eq('id', id)
                .single();

            if (error) throw error;

            setFormData({
                ...data,
                map_coordinates: data.map_coordinates || { x: 0, y: 0 }
            });
        } catch (error) {
            console.error('Error fetching treasure:', error);
            toast.error('Failed to load treasure data');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);

        try {
            const dataToSave = {
                ...formData,
                value: parseInt(formData.value) || 0,
                chapter: parseInt(formData.chapter) || null,
                slug: formData.slug || formData.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')
            };

            let error;
            if (isNew) {
                const { error: insertError } = await supabase
                    .from('treasures')
                    .insert([dataToSave]);
                error = insertError;
            } else {
                const { error: updateError } = await supabase
                    .from('treasures')
                    .update(dataToSave)
                    .eq('id', id);
                error = updateError;
            }

            if (error) throw error;

            toast.success(`Treasure ${isNew ? 'created' : 'updated'} successfully`);
            router.push('/admin/treasures');
            router.refresh();
        } catch (error) {
            console.error('Error saving treasure:', error);
            toast.error(`Failed to save treasure: ${error.message}`);
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="flex items-center justify-center h-full p-8"><Loader2 className="animate-spin" /></div>;

    return (
        <div className="max-w-4xl mx-auto p-8">
            <div className="flex items-center gap-4 mb-8">
                <Link href="/admin/treasures" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <ArrowLeft size={20} />
                </Link>
                <h1 className="text-3xl font-bold">{isNew ? 'Add New Treasure' : 'Edit Treasure'}</h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg border shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Name</label>
                        <input
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border rounded-md"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Slug</label>
                        <input
                            name="slug"
                            value={formData.slug}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md"
                            placeholder="Auto-generated if empty"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Type</label>
                        <select
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md"
                        >
                            <option value="treasure">Treasure</option>
                            <option value="gem">Gem</option>
                            <option value="valuable">Valuable</option>
                            <option value="key_item">Key Item</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Value (Pesetas)</label>
                        <input
                            type="number"
                            name="value"
                            value={formData.value}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={3}
                        className="w-full p-2 border rounded-md"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Location</label>
                        <input
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border rounded-md"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Chapter Found</label>
                        <input
                            type="number"
                            name="chapter"
                            value={formData.chapter}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Image URL</label>
                    <input
                        name="image_url"
                        value={formData.image_url}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md"
                    />
                </div>

                <div className="flex justify-end pt-4">
                    <button
                        type="submit"
                        disabled={saving}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                    >
                        {saving && <Loader2 className="animate-spin" size={16} />}
                        {isNew ? 'Create Treasure' : 'Save Changes'}
                    </button>
                </div>
            </form>
        </div>
    );
}
