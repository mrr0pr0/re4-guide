import Link from 'next/link';

export default function AdminDashboard() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage the content of the Resident Evil 4 Guide.</p>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Link href="/admin/bosses" className="block p-6 bg-white rounded-lg border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">Bosses</h5>
                    <p className="font-normal text-gray-700">Manage boss strategies and details.</p>
                </Link>

                <Link href="/admin/weapons" className="block p-6 bg-white rounded-lg border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">Weapons</h5>
                    <p className="font-normal text-gray-700">Update weapon stats and locations.</p>
                </Link>

                <Link href="/admin/treasures" className="block p-6 bg-white rounded-lg border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">Treasures</h5>
                    <p className="font-normal text-gray-700">Track treasure locations and values.</p>
                </Link>

                <Link href="/admin/walkthrough" className="block p-6 bg-white rounded-lg border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">Walkthrough</h5>
                    <p className="font-normal text-gray-700">Edit chapter guides and content.</p>
                </Link>
            </div>
        </div>
    );
}
