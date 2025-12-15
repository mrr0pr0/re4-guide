export default function AdminPageHeader({ title, description, actions, meta }) {
  return (
    <div className="mb-6 flex flex-col gap-3 border-b border-slate-800 pb-4 md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{meta || "Content management"}</p>
        <h1 className="text-2xl font-semibold text-white">{title}</h1>
        {description && (
          <p className="text-sm text-slate-300/80">{description}</p>
        )}
      </div>
      {actions && <div className="flex flex-col gap-2 md:flex-row md:items-center">{actions}</div>}
    </div>
  );
}

