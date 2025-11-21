"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import AdminTable from '@/components/AdminTable';
import Link from 'next/link';

export default function AdminWeaponsPage() {
    const [weapons, setWeapons] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchWeapons();
    }, []);

    async function fetchWeapons() {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('weapons')
                .select('*')
                .order('name');

            if (error) throw error;
            setWeapons(data || []);
        } catch (error) {
            console.error('Error fetching weapons:', error);
            alert('Error fetching weapons');
        } finally {
            setLoading(false);
        }
    }

    async function handleDelete(id) {
        if (!confirm('Are you sure you want to delete this weapon?')) return;

        try {
            const { error } = await supabase
                .from('weapons')
                .delete()
                .eq('id', id);

            if (error) throw error;
            fetchWeapons(); // Refresh list
        } catch (error) {
            console.error('Error deleting weapon:', error);
            alert('Error deleting weapon');
        }
    }

    const columns = [
        { key: 'name', label: 'Name' },
        { key: 'type', label: 'Type' },
        { key: 'cost', label: 'Cost' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold tracking-tight">Manage Weapons</h1>
                <Link
                    href="/admin/weapons/new"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                    Add New Weapon
                </Link>
            </div>

            {loading ? (
                <div>Loading...</div>
            ) : (
                <AdminTable
                    data={weapons}
                    columns={columns}
                    onDelete={handleDelete}
                    editUrlBase="/admin/weapons"
                />
            )}
        </div>
    );
}
