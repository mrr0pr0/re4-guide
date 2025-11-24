'use client';

import { Eye, EyeOff } from 'lucide-react';

export default function MapSidebar({ categories, onToggleCategory }) {
    return (
        <div className="w-full md:w-64 bg-card border-r border-border p-4 overflow-y-auto h-full">
            <h2 className="font-bold text-xl mb-4 text-primary">Map Filters</h2>

            <div className="space-y-2">
                {Object.entries(categories).map(([key, cat]) => (
                    <button
                        key={key}
                        onClick={() => onToggleCategory(key)}
                        className={`w-full flex items-center justify-between p-3 rounded-lg border transition-colors ${cat.visible
                                ? 'bg-accent/50 border-accent'
                                : 'bg-background border-border opacity-60'
                            }`}
                    >
                        <div className="flex items-center gap-3">
                            <div
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: cat.color }}
                            />
                            <span className="font-medium">{cat.name}</span>
                        </div>
                        {cat.visible ? <Eye size={16} /> : <EyeOff size={16} />}
                    </button>
                ))}
            </div>

            <div className="mt-8 p-4 bg-muted/50 rounded-lg text-sm text-muted-foreground">
                <p><strong>Tip:</strong> Use scroll to zoom and drag to pan around the map.</p>
            </div>
        </div>
    );
}
