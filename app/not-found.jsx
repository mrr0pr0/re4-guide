import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-6xl font-bold mb-4 text-red-800">404</h1>
            <h2 className="text-2xl font-semibold mb-6">Page Not Found</h2>
            <p className="text-gray-600 mb-8 max-w-md">
                The page you are looking for does not exist. It might have been moved or deleted.
            </p>
            <Link
                href="/"
                className="px-6 py-3 bg-red-800 text-white rounded hover:bg-red-900 transition-colors"
            >
                Return Home
            </Link>
        </div>
    );
}
