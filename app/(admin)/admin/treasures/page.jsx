"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import AdminTable from '@/components/AdminTable';
import Link from 'next/link';
import { toast } from 'sonner';
import AdminPageHeader from '@/components/AdminPageHeader';

export default function AdminTreasuresPage() {
    const [treasures, setTreasures] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTreasures();
    }, []);

    async function fetchTreasures() {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('treasures')
                .select('*')
                .order('name');

            if (error) throw error;
            setTreasures(data || []);
        } catch (error) {
            console.error('Error fetching treasures:', error);
            toast.error('Error fetching treasures');
        } finally {
            setLoading(false);
        }
    }

    async function handleDelete(id) {
        if (!confirm('Are you sure you want to delete this treasure?')) return;

        try {
            const { error } = await supabase
                .from('treasures')
                .delete()
                .eq('id', id);

            if (error) throw error;
            fetchTreasures(); // Refresh list
        } catch (error) {
            console.error('Error deleting treasure:', error);
            toast.error('Error deleting treasure');
        }
    }

    const columns = [
        { key: 'name', label: 'Name' },
        { key: 'type', label: 'Type' },
        { key: 'value', label: 'Value (Pesetas)' },
        { key: 'location', label: 'Location' },
    ];

    return (
        <div className="space-y-6">
            <AdminPageHeader
                title="Manage Treasures"
                description="Curate treasure data, values, and locations."
                actions={
                    <Link
                        href="/admin/treasures/new"
                        className="rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-emerald-950 transition hover:bg-emerald-400"
                    >
                        + Add Treasure
                    </Link>
                }
            />

            <AdminTable
                data={treasures}
                columns={columns}
                onDelete={handleDelete}
                editUrlBase="/admin/treasures"
                loading={loading}
                emptyMessage="No treasures yet. Add your first collectible."
            />
        </div>
    );
}
