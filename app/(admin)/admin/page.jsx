import Link from 'next/link';
import { LayoutDashboard, Map, Sword, Sparkles, Gem, ScrollText } from 'lucide-react';
import AdminPageHeader from '@/components/AdminPageHeader';

const tiles = [
    {
        href: '/admin/maps',
        title: 'Maps',
        description: 'Add maps and manage pins.',
        icon: Map,
        accent: 'from-emerald-500/30 to-emerald-500/5',
    },
    {
        href: '/admin/bosses',
        title: 'Bosses',
        description: 'Manage strategies and stats.',
        icon: Sword,
        accent: 'from-red-500/30 to-red-500/5',
    },
    {
        href: '/admin/weapons',
        title: 'Weapons',
        description: 'Update weapon data and costs.',
        icon: Sparkles,
        accent: 'from-indigo-500/30 to-indigo-500/5',
    },
    {
        href: '/admin/treasures',
        title: 'Treasures',
        description: 'Track treasure locations and values.',
        icon: Gem,
        accent: 'from-amber-500/30 to-amber-500/5',
    },
    {
        href: '/admin/walkthrough',
        title: 'Walkthrough',
        description: 'Edit chapters and notes.',
        icon: ScrollText,
        accent: 'from-blue-500/30 to-blue-500/5',
    },
];

export default function AdminDashboard() {
    return (
        <div className="space-y-8">
            <AdminPageHeader
                title="Dashboard"
                description="Quick links to every admin surface."
                meta="Overview"
                actions={
                    <div className="flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/80 px-3 py-1 text-xs text-slate-300">
                        <LayoutDashboard size={14} />
                        <span>Admin v2</span>
                    </div>
                }
            />

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {tiles.map(({ href, title, description, icon: Icon, accent }) => (
                    <Link
                        key={href}
                        href={href}
                        className={`group relative overflow-hidden rounded-xl border border-slate-800 bg-gradient-to-br ${accent} p-5 transition hover:border-slate-600 hover:shadow-lg hover:shadow-black/30`}
                    >
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <h3 className="text-lg font-semibold text-white">{title}</h3>
                                <p className="text-sm text-slate-300/80">{description}</p>
                            </div>
                            <div className="rounded-full bg-slate-900/70 p-2 text-slate-200">
                                <Icon size={18} />
                            </div>
                        </div>
                        <div className="mt-4 flex items-center gap-2 text-xs font-medium text-emerald-300 opacity-0 transition group-hover:opacity-100">
                            Open section
                            <span aria-hidden>→</span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
