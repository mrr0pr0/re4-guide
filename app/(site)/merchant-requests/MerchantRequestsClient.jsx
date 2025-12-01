'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Gift, Search, Filter, CheckCircle2, Circle, BookOpen } from 'lucide-react';

export default function MerchantRequestsClient({ requests }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedChapter, setSelectedChapter] = useState('all');
    const [completedRequests, setCompletedRequests] = useState(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('completed_merchant_requests');
            return saved ? JSON.parse(saved) : [];
        }
        return [];
    });

    const chapters = useMemo(() => {
        const chapterSet = new Set(requests.map(r => r.chapter).filter(Boolean));
        return Array.from(chapterSet).sort((a, b) => a - b);
    }, [requests]);

    const filteredRequests = useMemo(() => {
        return requests.filter(req => {
            const matchesSearch = req.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                req.description?.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesChapter = selectedChapter === 'all' || req.chapter === parseInt(selectedChapter);
            return matchesSearch && matchesChapter;
        });
    }, [requests, searchTerm, selectedChapter]);

    const toggleCompleted = (id) => {
        const newCompleted = completedRequests.includes(id)
            ? completedRequests.filter(reqId => reqId !== id)
            : [...completedRequests, id];
        
        setCompletedRequests(newCompleted);
        if (typeof window !== 'undefined') {
            localStorage.setItem('completed_merchant_requests', JSON.stringify(newCompleted));
        }
    };

    const completionPercentage = requests.length > 0 
        ? Math.round((completedRequests.length / requests.length) * 100) 
        : 0;

    return (
        <>
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
                    {completedRequests.length} of {requests.length} requests completed
                </p>
            </div>

            {/* Filters */}
            <div className="max-w-4xl mx-auto mb-8 flex flex-col sm:flex-row gap-4">
                {/* Search */}
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                        type="text"
                        placeholder="Search merchant requests..."
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
                        Found {filteredRequests.length} result{filteredRequests.length !== 1 ? 's' : ''}
                    </p>
                </div>
            )}

            {/* Requests Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                {filteredRequests.length > 0 ? (
                    filteredRequests.map((req) => {
                        const isCompleted = completedRequests.includes(req.id);
                        return (
                            <div
                                key={req.id}
                                className={`group bg-[#1e1e1e] border rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col ${
                                    isCompleted 
                                        ? 'border-green-800/50 bg-green-950/10' 
                                        : 'border-gray-800 hover:border-red-900/50'
                                }`}
                            >
                                {/* Image */}
                                {req.image_url && (
                                    <div className="relative w-full h-48 border-b border-gray-800 overflow-hidden">
                                        <Image
                                            src={req.image_url}
                                            alt={req.name}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                                            priority={false}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                        
                                        {/* Completion Badge */}
                                        <button
                                            onClick={() => toggleCompleted(req.id)}
                                            className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm transition-all ${
                                                isCompleted
                                                    ? 'bg-green-600 hover:bg-green-700'
                                                    : 'bg-gray-900/60 hover:bg-gray-900/80'
                                            }`}
                                            title={isCompleted ? "Mark as incomplete" : "Mark as complete"}
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
                                <div className="p-5 flex-grow flex flex-col">
                                    <h2 className={`text-xl font-bold mb-3 ${
                                        isCompleted ? 'text-green-400' : 'text-gray-100'
                                    }`}>
                                        {req.name}
                                    </h2>

                                    {/* Metadata */}
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {req.chapter && (
                                            <span className="inline-flex items-center gap-1 text-xs bg-gray-800 text-gray-300 px-2.5 py-1 rounded-full">
                                                <BookOpen className="w-3 h-3" />
                                                Chapter {req.chapter}
                                            </span>
                                        )}
                                        {req.reward && (
                                            <span className="inline-flex items-center gap-1 text-xs bg-amber-950/50 text-amber-400 px-2.5 py-1 rounded-full border border-amber-800/50">
                                                <Gift className="w-3 h-3" />
                                                {req.reward}
                                            </span>
                                        )}
                                    </div>

                                    {/* Description */}
                                    {req.description && (
                                        <p className="text-gray-400 text-sm mb-4 flex-grow line-clamp-3">
                                            {req.description}
                                        </p>
                                    )}

                                    {/* Solution Hint */}
                                    {req.solution && (
                                        <div className="mb-4 p-3 bg-gray-900/50 border border-gray-800 rounded-lg">
                                            <p className="text-xs text-gray-500 uppercase font-semibold mb-1 flex items-center gap-1">
                                                <span>💡</span> Solution 
                                            </p>
                                            <p className="text-sm text-gray-300">{req.solution}</p>
                                        </div>
                                    )}

                                    {/* Actions - Link to map using slug */}
                                    <div className="mt-auto space-y-2">
                                        {req.slug && (
                                            <Link
                                                href={`/maps/${req.slug}`}
                                                className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white text-sm font-semibold py-2.5 px-4 rounded-lg transition-all duration-200 shadow-lg shadow-red-900/20 hover:shadow-red-900/40"
                                            >
                                                <MapPin className="w-4 h-4" />
                                                View on Interactive Map
                                            </Link>
                                        )}
                                    </div>
                                </div>
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
                                ? 'No merchant requests found matching your filters.' 
                                : 'No merchant requests available yet.'}
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
        </>
    );
}