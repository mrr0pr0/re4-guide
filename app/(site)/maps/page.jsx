'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';
import { Map as MapIcon, Loader2, MapPin, Compass } from 'lucide-react';

export default function MapsIndexPage() {
  const [maps, setMaps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMaps();
  }, []);

const fetchMaps = async () => {
  try {
    const { data, error } = await supabase
      .from('maps')
      .select('*')
      .eq('show', true) // filter by show = true
      .order('order_index', { ascending: true });

    if (error) throw error;
    setMaps(data || []);
  } catch (error) {
    console.error('Error fetching maps:', error);
  } finally {
    setLoading(false);
  }
};

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-3.5rem)] bg-gradient-to-b from-background via-background to-card">
        <div className="text-center">
          <Loader2 className="animate-spin mx-auto mb-4 text-primary" size={48} />
          <p className="text-muted-foreground">Loading maps...</p>
        </div>
      </div>
    );
  }

  const villageMaps = maps.slice(0, 15);
  const castleMaps = maps.slice(15);

  const renderSection = (title, items) => (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="h-px w-10 bg-primary/40" />
        <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
        <div className="h-px flex-1 bg-border" />
        <span className="text-sm text-muted-foreground">{items.length} maps</span>
      </div>

      {items.length === 0 ? (
        <div className="text-sm text-muted-foreground italic">No maps in this section yet.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((map, index) => (
            <Link
              key={map.id}
              href={`/maps/${map.slug}`}
              className={`group block animate-fade-in-up stagger-${Math.min(index + 1, 6)}`}
            >
              <div className="relative overflow-hidden rounded-xl border border-border bg-card transition-all duration-500 hover:border-primary/50 card-lift hover:shadow-2xl hover:shadow-primary/20">
                {/* Image Container */}
                <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-muted/50 to-muted">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={map.image_url}
                    alt={map.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                  
                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Corner Accent */}
                  <div className="absolute top-3 right-3 w-12 h-12 border-t-2 border-r-2 border-primary/0 group-hover:border-primary/60 transition-all duration-500 rounded-tr-lg" />
                  <div className="absolute bottom-3 left-3 w-12 h-12 border-b-2 border-l-2 border-primary/0 group-hover:border-primary/60 transition-all duration-500 rounded-bl-lg" />
                </div>

                {/* Content */}
                <div className="p-5 relative">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="font-bold text-xl group-hover:text-primary transition-colors duration-300 flex-1">
                      {map.title}
                    </h3>
                    <MapIcon 
                      className="text-muted-foreground group-hover:text-primary transition-all duration-300 group-hover:rotate-12 flex-shrink-0" 
                      size={20} 
                    />
                  </div>
                  
                  {map.description && (
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {map.description}
                    </p>
                  )}
                  
                  <div className="flex items-center gap-2 text-sm font-medium text-primary group-hover:gap-3 transition-all duration-300">
                    <span>Explore Map</span>
                    <svg 
                      className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>

                  {/* Bottom Glow Line */}
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-gradient-to-b from-background via-background to-card">
      {/* Hero Section */}
      <div className="relative overflow-hidden border-b border-border/50">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(217,24,24,0.1),transparent)]" />
        
        <div className="container mx-auto px-4 py-16 relative">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 animate-fade-in-up">
              <Compass className="text-primary" size={20} />
              <span className="text-sm font-medium text-primary">Interactive Guide</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-4 text-gradient-primary glow-red-sm animate-fade-in-up stagger-1">
              Interactive Maps
            </h1>
            
            <p className="text-lg text-muted-foreground mb-2 animate-fade-in-up stagger-2">
              Explore detailed maps with collectibles, treasures, and key locations
            </p>
            
            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground animate-fade-in-up stagger-3">
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-primary" />
                <span>{maps.length} Maps Available</span>
              </div>
              <div className="flex items-center gap-2">
                <MapIcon size={16} className="text-primary" />
                <span>Full Coverage</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Maps Grid */}
      <div className="container mx-auto px-4 py-12">
        {maps.length === 0 ? (
          <div className="text-center py-20">
            <div className="glass rounded-2xl p-12 max-w-md mx-auto border-2 border-dashed">
              <MapIcon className="mx-auto mb-6 opacity-30 text-primary" size={64} />
              <h3 className="text-xl font-bold mb-2">No Maps Available</h3>
              <p className="text-muted-foreground">Check back later for new maps.</p>
            </div>
          </div>
        ) : (
          <div className="space-y-10">
            {renderSection('Village', villageMaps)}
            {renderSection('Castle', castleMaps)}
          </div>
        )}

        {/* Info Section */}
        {maps.length > 0 && (
          <div className="mt-16 max-w-2xl mx-auto">
            <div className="glass rounded-xl p-6 border border-border/50">
              <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                <Compass className="text-primary" size={20} />
                How to Use
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>Click on any map to explore interactive locations</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>Use filters to show/hide different categories of markers</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>Zoom and pan to navigate the map freely</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>Mark items as found to track your progress</span>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}