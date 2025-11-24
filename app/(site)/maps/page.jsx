'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';
import { Map as MapIcon, Loader2 } from 'lucide-react';

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
    return <div className="flex items-center justify-center h-[calc(100vh-3.5rem)]"><Loader2 className="animate-spin" /></div>;
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Interactive Maps</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {maps.map((map) => (
          <Link
            key={map.id}
            href={`/maps/${map.slug}`}
            className="group block border rounded-lg overflow-hidden hover:border-primary transition-colors bg-card"
          >
            <div className="aspect-video bg-muted relative overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={map.image_url}
                alt={map.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
            </div>
            <div className="p-4">
              <h3 className="font-bold text-xl mb-1">{map.title}</h3>
              <p className="text-sm text-muted-foreground">View Map &rarr;</p>
            </div>
          </Link>
        ))}

        {maps.length === 0 && (
          <div className="col-span-full text-center py-12 text-muted-foreground border-2 border-dashed rounded-lg">
            <MapIcon className="mx-auto mb-4 opacity-50" size={48} />
            <p>No maps available yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}