"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/AuthProvider";

export default function AdminAuthActions() {
  const { user, signOut, loading } = useAuth();

  if (loading) {
    return (
      <div className="h-9 w-28 animate-pulse rounded-full bg-slate-800" />
    );
  }

  if (!user) return null;

  return (
    <div className="flex items-center gap-3 text-sm text-slate-200">
      <div className="hidden text-xs text-slate-400 sm:block">
        Signed in as <span className="font-medium text-slate-200">{user.email}</span>
      </div>
      <Button
        variant="outline"
        size="sm"
        className="border-slate-700 text-slate-100 hover:border-slate-500 hover:bg-slate-800"
        onClick={signOut}
      >
        Sign out
      </Button>
    </div>
  );
}

