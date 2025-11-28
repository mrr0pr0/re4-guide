'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { Loader2, ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

export default function AdminWeaponEditorPage({ params }) {
    const resolvedParams = use(params);
    const { id } = resolvedParams;
    const isNew = id === 'new';
    const router = useRouter();

    const [loading, setLoading] = useState(!isNew);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        type: 'handgun',
        description: '',
        cost: 0,
        location: '',
        image_url: '',
        stats: { damage: '', fire_rate: '', capacity: '' } // Basic stats structure
    });

    useEffect(() => {
        if (!isNew) {
            fetchWeapon();
        }
    }, [id, isNew]);

    const fetchWeapon = async () => {
        try {
            const { data, error } = await supabase
                .from('weapons')
                .select('*')
                .eq('id', id)
                .single();

            if (error) throw error;

            // Ensure stats object exists
            const stats = data.stats || { damage: '', fire_rate: '', capacity: '' };
            setFormData({ ...data, stats });
        } catch (error) {
            console.error('Error fetching weapon:', error);
            toast.error('Failed to load weapon data');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleStatChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            stats: { ...prev.stats, [name]: value }
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);

        try {
            const dataToSave = {
                ...formData,
                cost: parseInt(formData.cost) || 0,
                // Ensure slug is unique if needed, or auto-generate from name if empty
                slug: formData.slug || formData.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')
            };

            let error;
            if (isNew) {
                const { error: insertError } = await supabase
                    .from('weapons')
                    .insert([dataToSave]);
                error = insertError;
            } else {
                const { error: updateError } = await supabase
                    .from('weapons')
                    .update(dataToSave)
                    .eq('id', id);
                error = updateError;
            }

            if (error) throw error;

            toast.success(`Weapon ${isNew ? 'created' : 'updated'} successfully`);
            router.push('/admin/weapons');
            router.refresh();
        } catch (error) {
            console.error('Error saving weapon:', error);
            toast.error(`Failed to save weapon: ${error.message}`);
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="flex items-center justify-center h-full p-8"><Loader2 className="animate-spin" /></div>;

    return (
        <div className="max-w-4xl mx-auto p-8">
            <div className="flex items-center gap-4 mb-8">
                <Link href="/admin/weapons" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <ArrowLeft size={20} />
                </Link>
                <h1 className="text-3xl font-bold">{isNew ? 'Add New Weapon' : 'Edit Weapon'}</h1>
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
                            <option value="handgun">Handgun</option>
                            <option value="shotgun">Shotgun</option>
                            <option value="rifle">Rifle</option>
                            <option value="smg">SMG</option>
                            <option value="magnum">Magnum</option>
                            <option value="knife">Knife</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Cost (Pesetas)</label>
                        <input
                            type="number"
                            name="cost"
                            value={formData.cost}
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

                <div className="space-y-2">
                    <label className="text-sm font-medium">Location</label>
                    <input
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md"
                    />
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

                <div className="border-t pt-4">
                    <h3 className="text-lg font-semibold mb-4">Base Stats</h3>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Damage</label>
                            <input
                                name="damage"
                                value={formData.stats.damage}
                                onChange={handleStatChange}
                                className="w-full p-2 border rounded-md"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Fire Rate</label>
                            <input
                                name="fire_rate"
                                value={formData.stats.fire_rate}
                                onChange={handleStatChange}
                                className="w-full p-2 border rounded-md"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Capacity</label>
                            <input
                                name="capacity"
                                value={formData.stats.capacity}
                                onChange={handleStatChange}
                                className="w-full p-2 border rounded-md"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end pt-4">
                    <button
                        type="submit"
                        disabled={saving}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                    >
                        {saving && <Loader2 className="animate-spin" size={16} />}
                        {isNew ? 'Create Weapon' : 'Save Changes'}
                    </button>
                </div>
            </form>
        </div>
    );
}
