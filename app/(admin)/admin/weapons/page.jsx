"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import AdminTable from '@/components/AdminTable';
import Link from 'next/link';
import { toast } from 'sonner';
import AdminPageHeader from '@/components/AdminPageHeader';

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
            toast.error('Error fetching weapons');
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
            toast.error('Error deleting weapon');
        }
    }

    const columns = [
        { key: 'name', label: 'Name' },
        { key: 'type', label: 'Type' },
        { key: 'cost', label: 'Cost' },
    ];

    return (
        <div className="space-y-6">
            <AdminPageHeader
                title="Manage Weapons"
                description="Update weapon stats, pricing, and availability."
                actions={
                    <Link
                        href="/admin/weapons/new"
                        className="rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-emerald-950 transition hover:bg-emerald-400"
                    >
                        + Add Weapon
                    </Link>
                }
            />

            <AdminTable
                data={weapons}
                columns={columns}
                onDelete={handleDelete}
                editUrlBase="/admin/weapons"
                loading={loading}
                emptyMessage="No weapons found. Add your first weapon."
            />
        </div>
    );
}
