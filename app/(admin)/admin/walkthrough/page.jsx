"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import AdminTable from '@/components/AdminTable';
import Link from 'next/link';

export default function AdminWalkthroughPage() {
    const [chapters, setChapters] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchChapters();
    }, []);

    async function fetchChapters() {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('chapters')
                .select('*')
                .order('chapter_number');

            if (error) throw error;
            setChapters(data || []);
        } catch (error) {
            console.error('Error fetching chapters:', error);
            alert('Error fetching chapters');
        } finally {
            setLoading(false);
        }
    }

    async function handleDelete(id) {
        if (!confirm('Are you sure you want to delete this chapter?')) return;

        try {
            const { error } = await supabase
                .from('chapters')
                .delete()
                .eq('id', id);

            if (error) throw error;
            fetchChapters(); // Refresh list
        } catch (error) {
            console.error('Error deleting chapter:', error);
            alert('Error deleting chapter');
        }
    }

    const columns = [
        { key: 'chapter_number', label: 'Chapter #' },
        { key: 'title', label: 'Title' },
        { key: 'slug', label: 'Slug' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold tracking-tight">Manage Walkthrough</h1>
                <Link
                    href="/admin/walkthrough/new"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                    Add New Chapter
                </Link>
            </div>

            {loading ? (
                <div>Loading...</div>
            ) : (
                <AdminTable
                    data={chapters}
                    columns={columns}
                    onDelete={handleDelete}
                    editUrlBase="/admin/walkthrough"
                />
            )}
        </div>
    );
}
