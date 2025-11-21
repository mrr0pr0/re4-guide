import Link from "next/link";

export const metadata = {
  title: "Admin Panel",
};

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 p-8 text-gray-900">
      <header className="mb-8 border-b border-gray-200 pb-4">
        <h1 className="mb-4 text-3xl font-bold">Admin Panel</h1>
        <nav className="flex gap-4">
          <Link href="/admin" className="font-bold hover:text-blue-600">Dashboard</Link>
          <Link href="/admin/bosses" className="hover:text-blue-600">Bosses</Link>
          <Link href="/admin/weapons" className="hover:text-blue-600">Weapons</Link>
          <Link href="/admin/treasures" className="hover:text-blue-600">Treasures</Link>
          <Link href="/admin/walkthrough" className="hover:text-blue-600">Walkthrough</Link>
        </nav>
      </header>
      <main>{children}</main>
    </div>
  );
}
