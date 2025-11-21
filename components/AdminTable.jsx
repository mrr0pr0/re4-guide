import Link from 'next/link';

export default function AdminTable({ data, columns, onDelete, editUrlBase }) {
    if (!data || data.length === 0) {
        return <div className="p-4 text-center text-gray-500">No records found.</div>;
    }

    return (
        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
            <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        {columns.map((col) => (
                            <th key={col.key} className="px-6 py-3">
                                {col.label}
                            </th>
                        ))}
                        <th className="px-6 py-3 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.id} className="bg-white border-b hover:bg-gray-50">
                            {columns.map((col) => (
                                <td key={`${item.id}-${col.key}`} className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    {col.render ? col.render(item[col.key], item) : item[col.key]}
                                </td>
                            ))}
                            <td className="px-6 py-4 text-right space-x-2">
                                <Link
                                    href={`${editUrlBase}/${item.id}`}
                                    className="font-medium text-blue-600 hover:underline"
                                >
                                    Edit
                                </Link>
                                <button
                                    onClick={() => onDelete(item.id)}
                                    className="font-medium text-red-600 hover:underline"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
