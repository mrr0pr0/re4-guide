"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import AdminTable from '@/components/AdminTable';
import Link from 'next/link';

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
            alert('Error fetching treasures');
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
            alert('Error deleting treasure');
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
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold tracking-tight">Manage Treasures</h1>
                <Link
                    href="/admin/treasures/new"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                    Add New Treasure
                </Link>
            </div>

            {loading ? (
                <div>Loading...</div>
            ) : (
                <AdminTable
                    data={treasures}
                    columns={columns}
                    onDelete={handleDelete}
                    editUrlBase="/admin/treasures"
                />
            )}
        </div>
    );
}
