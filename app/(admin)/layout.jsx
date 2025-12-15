import Link from "next/link";
import { LayoutDashboard, Map, Sword, Sparkles, ScrollText, Gem } from "lucide-react";
import AdminGuard from "@/components/admin/AdminGuard";
import AdminAuthActions from "@/components/admin/AdminAuthActions";

export const metadata = {
  title: "Admin Panel",
};

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/maps", label: "Maps", icon: Map },
  { href: "/admin/bosses", label: "Bosses", icon: Sword },
  { href: "/admin/weapons", label: "Weapons", icon: Sparkles },
  { href: "/admin/treasures", label: "Treasures", icon: Gem },
  { href: "/admin/walkthrough", label: "Walkthrough", icon: ScrollText },
];

export default function AdminLayout({ children }) {
  return (
    <AdminGuard>
      <div className="min-h-screen bg-slate-950 text-slate-50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,#1e293b,transparent_25%),radial-gradient(circle_at_80%_0%,#0f172a,transparent_25%)] opacity-60 pointer-events-none" />
        <div className="relative z-10">
          <header className="border-b border-slate-800 bg-slate-900/70 backdrop-blur supports-[backdrop-filter]:backdrop-blur">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Resident Evil 4</p>
                <h1 className="text-xl font-semibold text-white">Admin Control Center</h1>
              </div>
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300 border border-emerald-500/40">
                  Live data · Supabase
                </div>
                <AdminAuthActions />
              </div>
            </div>
          </header>

          <div className="mx-auto flex max-w-6xl gap-6 px-6 py-6">
            <aside className="hidden w-56 shrink-0 flex-col rounded-xl border border-slate-800 bg-slate-900/80 p-4 shadow-xl shadow-black/40 lg:flex">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Navigation</p>
              <div className="space-y-1">
                {navItems.map(({ href, label, icon: Icon }) => (
                  <Link
                    key={href}
                    href={href}
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-200 hover:bg-slate-800 hover:text-white transition-colors"
                  >
                    <Icon size={16} />
                    <span>{label}</span>
                  </Link>
                ))}
              </div>
            </aside>

            <main className="flex-1">
              <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-2xl shadow-black/30">
                {children}
              </div>
            </main>
          </div>
        </div>
      </div>
    </AdminGuard>
  );
}
