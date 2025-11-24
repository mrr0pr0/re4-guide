'use client';

import { useState, useEffect, use } from 'react';
import dynamic from 'next/dynamic';
import MapSidebar from '@/components/MapSidebar';
import { supabase } from '@/lib/supabaseClient';
import { Loader2 } from 'lucide-react';

// Dynamically import GameMap to avoid SSR issues with Leaflet
const GameMap = dynamic(() => import('@/components/GameMap'), {
  ssr: false,
  loading: () => <div className="w-full h-full flex items-center justify-center bg-gray-900 text-white">Loading Map Engine...</div>
});

export default function AreaMapPage({ params }) {
  const resolvedParams = use(params);
  const { area } = resolvedParams;

  const [mapData, setMapData] = useState(null);
  const [pins, setPins] = useState([]);
  const [categories, setCategories] = useState({});
  const [loading, setLoading] = useState(true);
  const [foundPins, setFoundPins] = useState([]);

  useEffect(() => {
    // Load found pins from local storage
    const savedFound = localStorage.getItem('re4_found_pins');
    if (savedFound) {
      setFoundPins(JSON.parse(savedFound));
    }

    fetchMapData();
  }, [area]);

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

      // 2. Fetch Categories
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

      // 3. Fetch Pins
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

  const toggleCategory = (key) => {
    setCategories(prev => ({
      ...prev,
      [key]: { ...prev[key], visible: !prev[key].visible }
    }));
  };

  const handlePinClick = (pin) => {
    // Toggle found status
    const isFound = foundPins.includes(pin.id);
    let newFound;

    if (isFound) {
      newFound = foundPins.filter(id => id !== pin.id);
    } else {
      newFound = [...foundPins, pin.id];
    }

    setFoundPins(newFound);
    localStorage.setItem('re4_found_pins', JSON.stringify(newFound));
  };

  if (loading) {
    return <div className="flex items-center justify-center h-[calc(100vh-3.5rem)] bg-gray-950 text-white"><Loader2 className="animate-spin mr-2" /> Loading Map...</div>;
  }

  if (!mapData) {
    return <div className="flex items-center justify-center h-[calc(100vh-3.5rem)] bg-gray-950 text-white">Map not found: {area}</div>;
  }

  const displayPins = pins.map(p => ({
    ...p,
    title: foundPins.includes(p.id) ? `✓ ${p.title}` : p.title
  }));

  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-3.5rem)] overflow-hidden">
      <MapSidebar
        categories={categories}
        onToggleCategory={toggleCategory}
      />

      <div className="flex-1 relative bg-gray-950 h-full">
        <GameMap
          imageUrl={mapData.image_url}
          pins={displayPins}
          categories={categories}
          onPopupAction={handlePinClick}
          isInteractive={true} // Enable the "Mark as Found" button in popup
        />
      </div>
    </div>
  );
}