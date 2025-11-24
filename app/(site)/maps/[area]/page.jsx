'use client';

import { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import MapSidebar from '@/components/MapSidebar';

// Dynamically import GameMap to avoid SSR issues with Leaflet
const GameMap = dynamic(() => import('@/components/GameMap'), {
  ssr: false,
  loading: () => <div className="w-full h-full flex items-center justify-center bg-gray-900 text-white">Loading Map Engine...</div>
});

export default function AreaMapPage({ params }) {
  // Mock Data - In a real app, this would come from Supabase based on params.area
  const [categories, setCategories] = useState({
    treasure: { name: 'Treasure', color: '#FFD700', visible: true },
    merchant: { name: 'Merchant', color: '#00FF00', visible: true },
    save: { name: 'Typewriter', color: '#FF8C00', visible: true },
    enemy: { name: 'Enemy', color: '#FF0000', visible: true },
  });

  // Mock Pins - These coordinates need to be calibrated to the image
  // For now, we'll place some random ones to test
  const pins = [
    { id: 1, x: 500, y: 500, category: 'treasure', title: 'Velvet Blue', description: 'Found in the small hut.' },
    { id: 2, x: 800, y: 600, category: 'merchant', title: 'The Merchant', description: 'Got some rare things on sale, stranger!' },
    { id: 3, x: 300, y: 400, category: 'save', title: 'Village Typewriter', description: 'Save your progress here.' },
  ];

  const toggleCategory = (key) => {
    setCategories(prev => ({
      ...prev,
      [key]: { ...prev[key], visible: !prev[key].visible }
    }));
  };

  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-3.5rem)] overflow-hidden">
      <MapSidebar
        categories={categories}
        onToggleCategory={toggleCategory}
      />

      <div className="flex-1 relative bg-gray-950 h-full">
        <GameMap
          imageUrl="/maps/test-map.jpg"
          pins={pins}
          categories={categories}
        />
      </div>
    </div>
  );
}