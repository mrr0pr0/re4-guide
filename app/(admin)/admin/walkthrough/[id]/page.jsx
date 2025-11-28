'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { Loader2, ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

export default function AdminChapterEditorPage({ params }) {
    const resolvedParams = use(params);
    const { id } = resolvedParams;
    const isNew = id === 'new';
    const router = useRouter();

    const [loading, setLoading] = useState(!isNew);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        chapter_number: '',
        title: '',
        slug: '',
        description: '',
        content: '',
        thumbnail_url: ''
    });

    useEffect(() => {
        if (!isNew) {
            fetchChapter();
        }
    }, [id, isNew]);

    const fetchChapter = async () => {
        try {
            const { data, error } = await supabase
                .from('chapters')
                .select('*')
                .eq('id', id)
                .single();

            if (error) throw error;

            setFormData(data);
        } catch (error) {
            console.error('Error fetching chapter:', error);
            toast.error('Failed to load chapter data');
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
                chapter_number: parseInt(formData.chapter_number) || 0,
                slug: formData.slug || `chapter-${formData.chapter_number}`
            };

            let error;
            if (isNew) {
                const { error: insertError } = await supabase
                    .from('chapters')
                    .insert([dataToSave]);
                error = insertError;
            } else {
                const { error: updateError } = await supabase
                    .from('chapters')
                    .update(dataToSave)
                    .eq('id', id);
                error = updateError;
            }

            if (error) throw error;

            toast.success(`Chapter ${isNew ? 'created' : 'updated'} successfully`);
            router.push('/admin/walkthrough');
            router.refresh();
        } catch (error) {
            console.error('Error saving chapter:', error);
            toast.error(`Failed to save chapter: ${error.message}`);
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="flex items-center justify-center h-full p-8"><Loader2 className="animate-spin" /></div>;

    return (
        <div className="max-w-4xl mx-auto p-8">
            <div className="flex items-center gap-4 mb-8">
                <Link href="/admin/walkthrough" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <ArrowLeft size={20} />
                </Link>
                <h1 className="text-3xl font-bold">{isNew ? 'Add New Chapter' : 'Edit Chapter'}</h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg border shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Chapter Number</label>
                        <input
                            type="number"
                            name="chapter_number"
                            value={formData.chapter_number}
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
                            placeholder="Auto-generated (e.g. chapter-1)"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Title</label>
                    <input
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded-md"
                    />
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
                    <label className="text-sm font-medium">Content (Markdown/HTML)</label>
                    <textarea
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        rows={10}
                        required
                        className="w-full p-2 border rounded-md font-mono text-sm"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Thumbnail URL</label>
                    <input
                        name="thumbnail_url"
                        value={formData.thumbnail_url}
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
                        {isNew ? 'Create Chapter' : 'Save Changes'}
                    </button>
                </div>
            </form>
        </div>
    );
}
