import Link from 'next/link';

const skeletonRows = Array.from({ length: 4 }, (_, i) => i);

export default function AdminTable({
    data,
    columns,
    onDelete,
    editUrlBase,
    loading = false,
    emptyMessage = 'No records found.',
}) {
    if (loading) {
        return (
            <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/60">
                <div className="divide-y divide-slate-800">
                    {skeletonRows.map((row) => (
                        <div key={row} className="flex items-center gap-4 px-4 py-3">
                            <div className="h-4 w-24 animate-pulse rounded bg-slate-800" />
                            <div className="h-4 w-32 animate-pulse rounded bg-slate-800" />
                            <div className="ml-auto h-4 w-20 animate-pulse rounded bg-slate-800" />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (!data || data.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center rounded-xl border border-slate-800 bg-slate-900/40 px-6 py-10 text-center text-slate-300">
                <p className="text-sm">{emptyMessage}</p>
                <p className="text-xs text-slate-500">Add a new entry to see it listed here.</p>
            </div>
        );
    }

    return (
        <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-950/60 shadow-xl shadow-black/30">
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-slate-200">
                    <thead className="bg-slate-900/80 text-xs uppercase text-slate-400">
                        <tr>
                            {columns.map((col) => (
                                <th key={col.key} className="px-6 py-3 font-semibold">
                                    {col.label}
                                </th>
                            ))}
                            <th className="px-6 py-3 text-right font-semibold">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, idx) => (
                            <tr
                                key={item.id}
                                className={`border-t border-slate-800 ${idx % 2 === 0 ? 'bg-slate-900/40' : 'bg-slate-900/60'} hover:bg-slate-800/60 transition-colors`}
                            >
                                {columns.map((col) => (
                                    <td key={`${item.id}-${col.key}`} className="px-6 py-4 text-sm text-slate-100">
                                        {col.render ? col.render(item[col.key], item) : item[col.key]}
                                    </td>
                                ))}
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-3 text-xs font-medium">
                                        <Link
                                            href={`${editUrlBase}/${item.id}`}
                                            className="rounded-full border border-slate-700 px-3 py-1 text-slate-200 hover:border-slate-500 hover:text-white"
                                        >
                                            Edit
                                        </Link>
                                        {onDelete && (
                                            <button
                                                onClick={() => onDelete(item.id)}
                                                className="rounded-full border border-red-500/40 px-3 py-1 text-red-200 hover:border-red-400 hover:text-white"
                                            >
                                                Delete
                                            </button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
