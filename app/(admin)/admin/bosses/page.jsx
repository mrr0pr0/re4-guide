"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import AdminTable from '@/components/AdminTable';
import Link from 'next/link';
import { toast } from 'sonner';
import AdminPageHeader from '@/components/AdminPageHeader';

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
            toast.error('Error fetching bosses');
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
            toast.error('Error deleting boss');
        }
    }

    const columns = [
        { key: 'name', label: 'Name' },
        { key: 'chapter', label: 'Chapter' },
        { key: 'health', label: 'Health' },
    ];

    return (
        <div className="space-y-6">
            <AdminPageHeader
                title="Manage Bosses"
                description="Add, edit, and remove boss encounters."
                actions={
                    <Link
                        href="/admin/bosses/new"
                        className="rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-emerald-950 transition hover:bg-emerald-400"
                    >
                        + Add Boss
                    </Link>
                }
            />

            <AdminTable
                data={bosses}
                columns={columns}
                onDelete={handleDelete}
                editUrlBase="/admin/bosses"
                loading={loading}
                emptyMessage="No bosses yet. Create your first encounter."
            />
        </div>
    );
}
