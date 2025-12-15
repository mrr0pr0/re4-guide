'use client';

import { useState, useEffect, use } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import MapSidebar from '@/components/MapSidebar';
import { supabase } from '@/lib/supabaseClient';
import { Loader2, ArrowLeft, ArrowRight } from 'lucide-react';
import { useAuth } from '@/components/AuthProvider';
import { toast } from 'sonner';

// Dynamically import GameMap to avoid SSR issues with Leaflet
const GameMap = dynamic(() => import('@/components/GameMap'), {
  ssr: false,
  loading: () => <div className="w-full h-full flex items-center justify-center bg-gray-900 text-white">Loading Map Engine...</div>
});

export default function AreaMapPage({ params }) {
  const resolvedParams = use(params);
  const { area } = resolvedParams;
  const { user, loading: authLoading } = useAuth();

  const [mapData, setMapData] = useState(null);
  const [pins, setPins] = useState([]);
  const [categories, setCategories] = useState({});
  const [allMaps, setAllMaps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [foundPins, setFoundPins] = useState([]);

  useEffect(() => {
    fetchMapData();

    // Set up real-time subscription for pins
    const pinsSubscription = supabase
      .channel('pins-changes')
      .on(
        'postgres_changes',
        { 
          event: '*', 
          schema: 'public', 
          table: 'pins'
        },
        (payload) => {
          console.log('Pin change detected:', payload);
          fetchMapData();
        }
      )
      .subscribe();

    // Set up real-time subscription for categories
    const categoriesSubscription = supabase
      .channel('categories-changes')
      .on(
        'postgres_changes',
        { 
          event: '*', 
          schema: 'public', 
          table: 'pin_categories'
        },
        (payload) => {
          console.log('Category change detected:', payload);
          fetchMapData();
        }
      )
      .subscribe();

    // Set up real-time subscription for maps
    const mapsSubscription = supabase
      .channel('maps-changes')
      .on(
        'postgres_changes',
        { 
          event: '*', 
          schema: 'public', 
          table: 'maps',
          filter: `slug=eq.${area}`
        },
        (payload) => {
          console.log('Map change detected:', payload);
          fetchMapData();
        }
      )
      .subscribe();

    // Cleanup subscriptions on unmount
    return () => {
      pinsSubscription.unsubscribe();
      categoriesSubscription.unsubscribe();
      mapsSubscription.unsubscribe();
    };
  }, [area]);

  const loadLocalProgress = () => {
    if (typeof window === 'undefined') return;
    const savedFound = localStorage.getItem('re4_found_pins');
    if (savedFound) {
      setFoundPins(JSON.parse(savedFound));
    } else {
      setFoundPins([]);
    }
  };

  const loadUserProgress = async (mapId) => {
    if (!user) return;
    const { data, error } = await supabase
      .from('user_pin_progress')
      .select('pin_id')
      .eq('user_id', user.id)
      .eq('map_id', mapId)
      .eq('found', true);

    if (error) {
      console.error('Error loading progress', error);
      toast.error('Could not load your progress');
      return;
    }

    const pinIds = data?.map((row) => row.pin_id) ?? [];
    setFoundPins(pinIds);
    if (typeof window !== 'undefined') {
      localStorage.setItem('re4_found_pins', JSON.stringify(pinIds));
    }
  };

  const fetchMapData = async () => {
    try {
      setLoading(true);

      // 1. Fetch Map by Slug
      const { data: map, error: mapError } = await supabase
        .from('maps')
        .select('*')
        .eq('slug', area)
        .single();

      if (mapError) throw mapError;
      setMapData(map);

      // 2. Fetch All Maps (for teleport functionality)
      const { data: mapsData, error: mapsError } = await supabase
        .from('maps')
        .select('id, title, slug, order_index, show')
        .eq('show', true)
        .order('order_index', { ascending: true });

      if (mapsError) throw mapsError;
      setAllMaps(mapsData || []);

      // 3. Fetch Categories
      const { data: catsData, error: catError } = await supabase
        .from('pin_categories')
        .select('*');

      if (catError) throw catError;

      // Transform categories to object with visibility
      const catsObj = catsData.reduce((acc, cat) => {
        acc[cat.slug] = { ...cat, visible: true };
        return acc;
      }, {});
      setCategories(catsObj);

      // 4. Fetch Pins
      const { data: pinsData, error: pinsError } = await supabase
        .from('pins')
        .select('*')
        .eq('map_id', map.id);

      if (pinsError) throw pinsError;

      // Map category_id to slug for the component
      const processedPins = pinsData.map(p => {
        const catSlug = catsData.find(c => c.id === p.category_id)?.slug;
        return { ...p, category: catSlug };
      });

      setPins(processedPins);

    } catch (error) {
      console.error('Error loading map:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!mapData) return;
    if (user) {
      loadUserProgress(mapData.id);
    } else if (!authLoading) {
      loadLocalProgress();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, authLoading, mapData?.id]);

  const toggleCategory = (key) => {
    setCategories(prev => ({
      ...prev,
      [key]: { ...prev[key], visible: !prev[key].visible }
    }));
  };

  const handlePinClick = async (pin) => {
    // Toggle found status (only for non-teleport pins)
    if (pin.category === 'teleport') return;

    const isFound = foundPins.includes(pin.id);
    let newFound;

    if (isFound) {
      newFound = foundPins.filter(id => id !== pin.id);
    } else {
      newFound = [...foundPins, pin.id];
    }

    setFoundPins(newFound);
    if (typeof window !== 'undefined') {
      localStorage.setItem('re4_found_pins', JSON.stringify(newFound));
    }

    if (user && mapData) {
      const supabaseAction = isFound
        ? supabase
            .from('user_pin_progress')
            .delete()
            .eq('user_id', user.id)
            .eq('pin_id', pin.id)
        : supabase
            .from('user_pin_progress')
            .upsert({
              user_id: user.id,
              pin_id: pin.id,
              map_id: mapData.id,
              found: true,
              updated_at: new Date().toISOString(),
            });

      const { error } = await supabaseAction;
      if (error) {
        console.error('Error saving progress', error);
        toast.error('Could not save your progress');
      }
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-[calc(100vh-3.5rem)] bg-gray-950 text-white"><Loader2 className="animate-spin mr-2" /> Loading Map...</div>;
  }

  if (!mapData) {
    return <div className="flex items-center justify-center h-[calc(100vh-3.5rem)] bg-gray-950 text-white">Map not found: {area}</div>;
  }

  const displayPins = pins.map(p => ({
    ...p,
    title: (p.category !== 'teleport' && foundPins.includes(p.id)) ? `✓ ${p.title}` : p.title
  }));

  const mapIndex = allMaps.findIndex(m => m.slug === area);
  const prevMap = mapIndex > 0 ? allMaps[mapIndex - 1] : null;
  const nextMap = mapIndex >= 0 && mapIndex < allMaps.length - 1 ? allMaps[mapIndex + 1] : null;

  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-3.5rem)] overflow-hidden">
      <MapSidebar
        categories={categories}
        onToggleCategory={toggleCategory}
      />

      <div className="flex-1 relative bg-gray-950 h-full">
        {(prevMap || nextMap) && (
          <div className="absolute top-4 right-4 z-20 flex gap-2">
            {prevMap && (
              <Link
                href={`/maps/${prevMap.slug}`}
                className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-sm font-medium text-white backdrop-blur border border-white/15 hover:bg-white/15 transition"
              >
                <ArrowLeft size={16} />
                <span>{prevMap.title}</span>
              </Link>
            )}
            {nextMap && (
              <Link
                href={`/maps/${nextMap.slug}`}
                className="inline-flex items-center gap-2 rounded-lg bg-primary/80 px-3 py-2 text-sm font-medium text-white backdrop-blur border border-primary/70 hover:bg-primary transition"
              >
                <span>{nextMap.title}</span>
                <ArrowRight size={16} />
              </Link>
            )}
          </div>
        )}

        <GameMap
          imageUrl={mapData.image_url}
          pins={displayPins}
          categories={categories}
          allMaps={allMaps}
          onPopupAction={handlePinClick}
          isInteractive={true} // Enable the "Mark as Found" button in popup
        />
      </div>
    </div>
  );
}