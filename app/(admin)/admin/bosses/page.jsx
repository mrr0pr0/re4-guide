"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import AdminTable from '@/components/AdminTable';
import Link from 'next/link';

export default function AdminBossesPage() {
    const [bosses, setBosses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBosses();
    }, []);

    async function fetchBosses() {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('bosses')
                .select('*')
                .order('name');

            if (error) throw error;
            setBosses(data || []);
        } catch (error) {
            console.error('Error fetching bosses:', error);
            alert('Error fetching bosses');
        } finally {
            setLoading(false);
        }
    }

    async function handleDelete(id) {
        if (!confirm('Are you sure you want to delete this boss?')) return;

        try {
            const { error } = await supabase
                .from('bosses')
                .delete()
                .eq('id', id);

            if (error) throw error;
            fetchBosses(); // Refresh list
        } catch (error) {
            console.error('Error deleting boss:', error);
            alert('Error deleting boss');
        }
    }

    const columns = [
        { key: 'name', label: 'Name' },
        { key: 'chapter', label: 'Chapter' },
        { key: 'health', label: 'Health' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold tracking-tight">Manage Bosses</h1>
                <Link
                    href="/admin/bosses/new"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                    Add New Boss
                </Link>
            </div>

            {loading ? (
                <div>Loading...</div>
            ) : (
                <AdminTable
                    data={bosses}
                    columns={columns}
                    onDelete={handleDelete}
                    editUrlBase="/admin/bosses"
                />
            )}
        </div>
    );
}
