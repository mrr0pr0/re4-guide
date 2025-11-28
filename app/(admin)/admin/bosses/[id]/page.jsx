'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { Loader2, ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

export default function AdminBossEditorPage({ params }) {
    const resolvedParams = use(params);
    const { id } = resolvedParams;
    const isNew = id === 'new';
    const router = useRouter();

    const [loading, setLoading] = useState(!isNew);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        chapter: '',
        description: '',
        strategy: '',
        health: '',
        image_url: '',
        video_url: '',
        weaknesses: [], // Array of strings? Or just text for now? Let's use text for simplicity or a simple comma-separated input
        rewards: '' // Text input for now
    });

    useEffect(() => {
        if (!isNew) {
            fetchBoss();
        }
    }, [id, isNew]);

    const fetchBoss = async () => {
        try {
            const { data, error } = await supabase
                .from('bosses')
                .select('*')
                .eq('id', id)
                .single();

            if (error) throw error;

            // Transform JSONB fields to string for editing if needed, or keep as is
            // For this simple editor, we'll treat complex JSON as strings or simple inputs
            setFormData({
                ...data,
                weaknesses: Array.isArray(data.weaknesses) ? data.weaknesses.join(', ') : (data.weaknesses || ''),
                rewards: typeof data.rewards === 'object' ? JSON.stringify(data.rewards) : (data.rewards || '')
            });
        } catch (error) {
            console.error('Error fetching boss:', error);
            toast.error('Failed to load boss data');
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
            // Prepare data for Supabase
            const dataToSave = {
                ...formData,
                chapter: parseInt(formData.chapter) || null,
                health: parseInt(formData.health) || null,
                slug: formData.slug || formData.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''),
                // Convert comma-separated string back to array
                weaknesses: formData.weaknesses.split(',').map(s => s.trim()).filter(Boolean),
                // Try to parse rewards as JSON, else save as string (if schema allows JSONB, it might fail if not valid JSON)
                // The SQL says rewards is JSONB. So we must ensure it's valid JSON or null.
                rewards: formData.rewards ? (isValidJson(formData.rewards) ? JSON.parse(formData.rewards) : { text: formData.rewards }) : null
            };

            let error;
            if (isNew) {
                const { error: insertError } = await supabase
                    .from('bosses')
                    .insert([dataToSave]);
                error = insertError;
            } else {
                const { error: updateError } = await supabase
                    .from('bosses')
                    .update(dataToSave)
                    .eq('id', id);
                error = updateError;
            }

            if (error) throw error;

            toast.success(`Boss ${isNew ? 'created' : 'updated'} successfully`);
            router.push('/admin/bosses');
            router.refresh();
        } catch (error) {
            console.error('Error saving boss:', error);
            toast.error(`Failed to save boss: ${error.message}`);
        } finally {
            setSaving(false);
        }
    };

    const isValidJson = (str) => {
        try {
            JSON.parse(str);
            return true;
        } catch (e) {
            return false;
        }
    };

    if (loading) return <div className="flex items-center justify-center h-full p-8"><Loader2 className="animate-spin" /></div>;

    return (
        <div className="max-w-4xl mx-auto p-8">
            <div className="flex items-center gap-4 mb-8">
                <Link href="/admin/bosses" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <ArrowLeft size={20} />
                </Link>
                <h1 className="text-3xl font-bold">{isNew ? 'Add New Boss' : 'Edit Boss'}</h1>
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
                        <label className="text-sm font-medium">Chapter Encountered</label>
                        <input
                            type="number"
                            name="chapter"
                            value={formData.chapter}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Health (HP)</label>
                        <input
                            type="number"
                            name="health"
                            value={formData.health}
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
                    <label className="text-sm font-medium">Strategy</label>
                    <textarea
                        name="strategy"
                        value={formData.strategy}
                        onChange={handleChange}
                        rows={6}
                        required
                        className="w-full p-2 border rounded-md"
                        placeholder="Detailed strategy guide..."
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Weaknesses (comma separated)</label>
                        <input
                            name="weaknesses"
                            value={formData.weaknesses}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md"
                            placeholder="Head, Legs, Fire, etc."
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Rewards (JSON or Text)</label>
                        <input
                            name="rewards"
                            value={formData.rewards}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Image URL</label>
                        <input
                            name="image_url"
                            value={formData.image_url}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Video URL</label>
                        <input
                            name="video_url"
                            value={formData.video_url}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md"
                        />
                    </div>
                </div>

                <div className="flex justify-end pt-4">
                    <button
                        type="submit"
                        disabled={saving}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                    >
                        {saving && <Loader2 className="animate-spin" size={16} />}
                        {isNew ? 'Create Boss' : 'Save Changes'}
                    </button>
                </div>
            </form>
        </div>
    );
}
