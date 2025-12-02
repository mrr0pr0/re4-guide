'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from "next/link";
import Image from "next/image";
import { Search, Filter, Skull, CheckCircle2, Circle, BookOpen } from 'lucide-react';

export default function BossesPage() {
  const [bosses, setBosses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedChapter, setSelectedChapter] = useState('all');
  const [defeatedBosses, setDefeatedBosses] = useState([]);

  useEffect(() => {
    async function fetchBosses() {
      try {
        const response = await fetch('/api/bosses');
        const data = await response.json();
        setBosses(data || []);
      } catch (err) {
        console.error('Error fetching bosses:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    fetchBosses();

    // Load defeated bosses from localStorage
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('defeated_bosses');
      setDefeatedBosses(saved ? JSON.parse(saved) : []);
    }
  }, []);

  const chapters = useMemo(() => {
    const chapterSet = new Set(bosses.map(b => b.chapter).filter(Boolean));
    return Array.from(chapterSet).sort((a, b) => a - b);
  }, [bosses]);

  const filteredBosses = useMemo(() => {
    return bosses.filter(boss => {
      const matchesSearch = boss.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        boss.description?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesChapter = selectedChapter === 'all' || boss.chapter === parseInt(selectedChapter);
      return matchesSearch && matchesChapter;
    });
  }, [bosses, searchTerm, selectedChapter]);

  const toggleDefeated = (id) => {
    const newDefeated = defeatedBosses.includes(id)
      ? defeatedBosses.filter(bossId => bossId !== id)
      : [...defeatedBosses, id];
    
    setDefeatedBosses(newDefeated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('defeated_bosses', JSON.stringify(newDefeated));
    }
  };

  const completionPercentage = bosses.length > 0 
    ? Math.round((defeatedBosses.length / bosses.length) * 100) 
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
      <h1 className="text-4xl font-bold mb-4 text-gray-100">Boss Guides</h1>
      <p className="text-gray-400 mb-8">
        Strategies and tips for defeating all bosses in Resident Evil 4.
      </p>

      {error && (
        <div className="bg-red-950/50 border border-red-800 text-red-300 px-4 py-3 rounded-lg mb-6">
          <strong className="font-bold">Error loading bosses: </strong>
          <span className="block sm:inline">{error.message || JSON.stringify(error)}</span>
          <p className="mt-2 text-sm">Check your Supabase connection and RLS policies.</p>
        </div>
      )}

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
          {defeatedBosses.length} of {bosses.length} bosses defeated
        </p>
      </div>

      {/* Filters */}
      <div className="max-w-4xl mx-auto mb-8 flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search bosses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-[#1e1e1e] border border-gray-800 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all"
          />
        </div>

        {/* Chapter Filter */}
        <div className="relative sm:w-48">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
          <select
            value={selectedChapter}
            onChange={(e) => setSelectedChapter(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-[#1e1e1e] border border-gray-800 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all appearance-none cursor-pointer"
          >
            <option value="all">All Chapters</option>
            {chapters.map(chapter => (
              <option key={chapter} value={chapter}>
                Chapter {chapter}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results Count */}
      {searchTerm && (
        <div className="max-w-4xl mx-auto mb-4">
          <p className="text-sm text-gray-400">
            Found {filteredBosses.length} result{filteredBosses.length !== 1 ? 's' : ''}
          </p>
        </div>
      )}

      {/* Bosses Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {filteredBosses.length > 0 ? (
          filteredBosses.map((boss) => {
            const isDefeated = defeatedBosses.includes(boss.id);
            return (
              <div
                key={boss.id}
                className={`group bg-[#1e1e1e] border rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col ${
                  isDefeated 
                    ? 'border-green-800/50 bg-green-950/10' 
                    : 'border-gray-800 hover:border-red-900/50'
                }`}
              >
                {/* Image */}
                {boss.image_url && (
                  <div className="relative w-full h-48 border-b border-gray-800 overflow-hidden">
                    <Image
                      src={boss.image_url}
                      alt={boss.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      priority={false}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    
                    {/* Completion Badge */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        toggleDefeated(boss.id);
                      }}
                      className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm transition-all z-10 ${
                        isDefeated
                          ? 'bg-green-600 hover:bg-green-700'
                          : 'bg-gray-900/60 hover:bg-gray-900/80'
                      }`}
                      title={isDefeated ? "Mark as not defeated" : "Mark as defeated"}
                    >
                      {isDefeated ? (
                        <CheckCircle2 className="w-5 h-5 text-white" />
                      ) : (
                        <Circle className="w-5 h-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                )}

                {/* Content */}
                <Link href={`/bosses/${boss.slug}`} className="p-5 flex-grow flex flex-col">
                  <h2 className={`text-xl font-bold mb-3 ${
                    isDefeated ? 'text-green-400' : 'text-gray-100'
                  }`}>
                    {boss.name}
                  </h2>

                  {/* Metadata */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {boss.chapter && (
                      <span className="inline-flex items-center gap-1 text-xs bg-gray-800 text-gray-300 px-2.5 py-1 rounded-full">
                        <BookOpen className="w-3 h-3" />
                        Chapter {boss.chapter}
                      </span>
                    )}
                    {boss.difficulty && (
                      <span className="inline-flex items-center gap-1 text-xs bg-red-950/50 text-red-400 px-2.5 py-1 rounded-full border border-red-800/50">
                        <Skull className="w-3 h-3" />
                        {boss.difficulty}
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  {boss.description && (
                    <p className="text-gray-400 text-sm mb-4 flex-grow line-clamp-3">
                      {boss.description}
                    </p>
                  )}

                  {/* View Strategy Button */}
                  <div className="mt-auto">
                    <div className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white text-sm font-semibold py-2.5 px-4 rounded-lg transition-all duration-200 shadow-lg shadow-red-900/20 hover:shadow-red-900/40">
                      <Skull className="w-4 h-4" />
                      View Strategy
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
              {searchTerm || selectedChapter !== 'all' 
                ? 'No bosses found matching your filters.' 
                : 'No bosses available yet.'}
            </p>
            {(searchTerm || selectedChapter !== 'all') && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedChapter('all');
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