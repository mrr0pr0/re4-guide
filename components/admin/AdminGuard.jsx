"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/components/AuthProvider";

export default function AdminGuard({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [loading, user, router]);

  if (loading || (!user && typeof window !== "undefined")) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-100">
        <div className="flex items-center gap-3 rounded-lg border border-slate-800 bg-slate-900/70 px-4 py-3">
          <Loader2 className="animate-spin" />
          <div>
            <p className="text-sm font-semibold">Checking access</p>
            <p className="text-xs text-slate-400">Redirecting to login if needed…</p>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return children;
}

