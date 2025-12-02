'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from "next/link";
import Image from "next/image";
import { Search, Filter, Sword, CheckCircle2, Circle } from 'lucide-react';

export default function WeaponsPage() {
  const [weapons, setWeapons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [completedWeapons, setCompletedWeapons] = useState([]);

  useEffect(() => {
    async function fetchWeapons() {
      try {
        const response = await fetch('/api/weapons');
        const data = await response.json();
        setWeapons(data || []);
      } catch (error) {
        console.error('Error fetching weapons:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchWeapons();

    // Load completed weapons from localStorage
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('completed_weapons');
      setCompletedWeapons(saved ? JSON.parse(saved) : []);
    }
  }, []);

  const weaponTypes = useMemo(() => {
    const types = new Set(weapons.map(w => w.type).filter(Boolean));
    return Array.from(types).sort();
  }, [weapons]);

  const filteredWeapons = useMemo(() => {
    return weapons.filter(weapon => {
      const matchesSearch = weapon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        weapon.description?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = selectedType === 'all' || weapon.type === selectedType;
      return matchesSearch && matchesType;
    });
  }, [weapons, searchTerm, selectedType]);

  const toggleCompleted = (id) => {
    const newCompleted = completedWeapons.includes(id)
      ? completedWeapons.filter(weaponId => weaponId !== id)
      : [...completedWeapons, id];
    
    setCompletedWeapons(newCompleted);
    if (typeof window !== 'undefined') {
      localStorage.setItem('completed_weapons', JSON.stringify(newCompleted));
    }
  };

  const completionPercentage = weapons.length > 0 
    ? Math.round((completedWeapons.length / weapons.length) * 100) 
    : 0;

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-10 bg-gray-800 rounded w-1/3 mb-4"></div>
          <div className="h-6 bg-gray-800 rounded w-2/3 mb-8"></div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="bg-[#1e1e1e] border border-gray-800 rounded-lg h-96"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4 text-gray-100">Weapons Guide</h1>
      <p className="text-gray-400 mb-8">
        Complete weapon stats, upgrades, and recommendations.
      </p>

      {/* Progress Bar */}
      <div className="max-w-4xl mx-auto mb-8 bg-[#1e1e1e] border border-gray-800 rounded-lg p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-200">Your Progress</h3>
          <span className="text-2xl font-bold text-red-500">{completionPercentage}%</span>
        </div>
        <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-red-600 to-red-500 h-full transition-all duration-500 ease-out"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
        <p className="text-sm text-gray-400 mt-2">
          {completedWeapons.length} of {weapons.length} weapons collected
        </p>
      </div>

      {/* Filters */}
      <div className="max-w-4xl mx-auto mb-8 flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search weapons..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-[#1e1e1e] border border-gray-800 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all"
          />
        </div>

        {/* Type Filter */}
        <div className="relative sm:w-48">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-[#1e1e1e] border border-gray-800 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all appearance-none cursor-pointer"
          >
            <option value="all">All Types</option>
            {weaponTypes.map(type => (
              <option key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results Count */}
      {searchTerm && (
        <div className="max-w-4xl mx-auto mb-4">
          <p className="text-sm text-gray-400">
            Found {filteredWeapons.length} result{filteredWeapons.length !== 1 ? 's' : ''}
          </p>
        </div>
      )}

      {/* Weapons Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {filteredWeapons.length > 0 ? (
          filteredWeapons.map((weapon) => {
            const isCompleted = completedWeapons.includes(weapon.id);
            return (
              <div
                key={weapon.id}
                className={`group bg-[#1e1e1e] border rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col ${
                  isCompleted 
                    ? 'border-green-800/50 bg-green-950/10' 
                    : 'border-gray-800 hover:border-red-900/50'
                }`}
              >
                {/* Image */}
                {weapon.image_url && (
                  <div className="relative w-full h-48 border-b border-gray-800 overflow-hidden">
                    <Image
                      src={weapon.image_url}
                      alt={weapon.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      priority={false}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    
                    {/* Completion Badge */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        toggleCompleted(weapon.id);
                      }}
                      className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm transition-all z-10 ${
                        isCompleted
                          ? 'bg-green-600 hover:bg-green-700'
                          : 'bg-gray-900/60 hover:bg-gray-900/80'
                      }`}
                      title={isCompleted ? "Mark as not collected" : "Mark as collected"}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-5 h-5 text-white" />
                      ) : (
                        <Circle className="w-5 h-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                )}

                {/* Content */}
                <Link href={`/weapons/${weapon.slug}`} className="p-5 flex-grow flex flex-col">
                  <h2 className={`text-xl font-bold mb-3 ${
                    isCompleted ? 'text-green-400' : 'text-gray-100'
                  }`}>
                    {weapon.name}
                  </h2>

                  {/* Metadata */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {weapon.type && (
                      <span className="inline-flex items-center gap-1 text-xs bg-gray-800 text-gray-300 px-2.5 py-1 rounded-full">
                        <Sword className="w-3 h-3" />
                        {weapon.type.charAt(0).toUpperCase() + weapon.type.slice(1)}
                      </span>
                    )}
                    {weapon.cost && (
                      <span className="inline-flex items-center gap-1 text-xs bg-amber-950/50 text-amber-400 px-2.5 py-1 rounded-full border border-amber-800/50">
                        💰 {weapon.cost} Pesetas
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  {weapon.description && (
                    <p className="text-gray-400 text-sm mb-4 flex-grow line-clamp-3">
                      {weapon.description}
                    </p>
                  )}

                  {/* View Details Button */}
                  <div className="mt-auto">
                    <div className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white text-sm font-semibold py-2.5 px-4 rounded-lg transition-all duration-200 shadow-lg shadow-red-900/20 hover:shadow-red-900/40">
                      <Sword className="w-4 h-4" />
                      View Details
                    </div>
                  </div>
                </Link>
              </div>
            );
          })
        ) : (
          <div className="col-span-full p-12 bg-[#1e1e1e] rounded-lg border border-gray-800 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-800 mb-4">
              <Search className="w-8 h-8 text-gray-600" />
            </div>
            <p className="text-gray-400 text-lg mb-2">
              {searchTerm || selectedType !== 'all' 
                ? 'No weapons found matching your filters.' 
                : 'No weapons available yet.'}
            </p>
            {(searchTerm || selectedType !== 'all') && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedType('all');
                }}
                className="mt-4 text-red-500 hover:text-red-400 text-sm font-medium"
              >
                Clear filters
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}