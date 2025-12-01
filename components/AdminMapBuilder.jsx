'use client';

import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { Plus, Save, Trash2, X, Check } from 'lucide-react';

const GameMap = dynamic(() => import('./GameMap'), {
    ssr: false,
    loading: () => <div className="w-full h-full flex items-center justify-center bg-gray-900 text-white">Loading Map Engine...</div>
});

export default function AdminMapBuilder({ imageUrl, initialPins = [], categories = [], onSave }) {
    const [pins, setPins] = useState(initialPins);
    const [selectedPin, setSelectedPin] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [addMode, setAddMode] = useState(false);
    const pinCounterRef = useRef(0);

    // Sync pins when initialPins change (after save)
    useEffect(() => {
        setPins(initialPins);
    }, [initialPins]);

    const handleMapClick = (e) => {
        // Only add new pin if in add mode
        if (!addMode) return;

        const { lat, lng } = e.latlng;
        pinCounterRef.current += 1;
        
        const newPin = {
            id: `temp-${pinCounterRef.current}`,
            x: lng,
            y: lat,
            title: 'New Pin',
            description: '',
            category: categories[0]?.slug || 'treasure',
            isNew: true
        };

        setPins([...pins, newPin]);
        setSelectedPin(newPin);
        setIsEditing(true);
        // Keep add mode active so user can continue adding pins
    };

    const handlePinClick = (pin) => {
        setSelectedPin(pin);
        setIsEditing(true);
    };

    const updateSelectedPin = (updates) => {
        if (!selectedPin) return;

        const updatedPin = { ...selectedPin, ...updates };
        setSelectedPin(updatedPin);

        setPins(pins.map(p => p.id === selectedPin.id ? updatedPin : p));
    };

    const deleteSelectedPin = () => {
        if (!selectedPin) return;
        setPins(pins.filter(p => p.id !== selectedPin.id));
        setSelectedPin(null);
        setIsEditing(false);
    };

    const closeEditPanel = () => {
        setSelectedPin(null);
        setIsEditing(false);
    };

    const saveChanges = async () => {
        await onSave(pins);
        // Don't close add mode or edit panel, let user continue working
    };

    const toggleAddMode = () => {
        setAddMode(!addMode);
        if (addMode) {
            // Exiting add mode, close edit panel
            setIsEditing(false);
            setSelectedPin(null);
        }
    };

    // Convert categories array to object for GameMap
    const categoriesMap = categories.reduce((acc, cat) => {
        acc[cat.slug] = { ...cat, visible: true };
        return acc;
    }, {});

    return (
        <div className="flex flex-col h-full">
            <div className="flex justify-between items-center p-4 bg-card border-b">
                <h2 className="text-xl font-bold">Map Builder</h2>
                <div className="flex gap-2">
                    <button
                        onClick={toggleAddMode}
                        className={`flex items-center gap-2 px-4 py-2 rounded transition-colors ${
                            addMode 
                                ? 'bg-green-600 text-white hover:bg-green-700' 
                                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                        }`}
                    >
                        {addMode ? (
                            <>
                                <Check size={16} /> Adding Pins (Click to Stop)
                            </>
                        ) : (
                            <>
                                <Plus size={16} /> Add Pin Mode
                            </>
                        )}
                    </button>
                    <button
                        onClick={saveChanges}
                        className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90"
                    >
                        <Save size={16} /> Save All Pins
                    </button>
                </div>
            </div>

            {addMode && (
                <div className="bg-green-600 text-white px-4 py-2 text-sm font-medium">
                    🎯 Click anywhere on the map to add a new pin. Click &quot;Adding Pins&quot; button to exit add mode.
                </div>
            )}

            <div className="flex-1 flex overflow-hidden">
                <div className="flex-1 relative bg-gray-950">
                    <GameMap
                        imageUrl={imageUrl}
                        pins={pins}
                        categories={categoriesMap}
                        onMapClick={handleMapClick}
                        onPinClick={handlePinClick}
                        isInteractive={false}
                    />
                </div>

                {isEditing && selectedPin && (
                    <div className="w-80 bg-card border-l p-4 overflow-y-auto">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold">Edit Pin</h3>
                            <button onClick={closeEditPanel} className="p-1 hover:bg-accent rounded">
                                <X size={16} />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Title</label>
                                <input
                                    type="text"
                                    value={selectedPin.title}
                                    onChange={(e) => updateSelectedPin({ title: e.target.value })}
                                    className="w-full p-2 rounded border bg-background"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Category</label>
                                <select
                                    value={selectedPin.category}
                                    onChange={(e) => updateSelectedPin({ category: e.target.value })}
                                    className="w-full p-2 rounded border bg-background"
                                >
                                    {categories.map(cat => (
                                        <option key={cat.slug} value={cat.slug}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Description</label>
                                <textarea
                                    value={selectedPin.description}
                                    onChange={(e) => updateSelectedPin({ description: e.target.value })}
                                    className="w-full p-2 rounded border bg-background h-24"
                                />
                            </div>

                            <div className="pt-4 border-t">
                                <button
                                    onClick={deleteSelectedPin}
                                    className="w-full flex items-center justify-center gap-2 p-2 text-destructive hover:bg-destructive/10 rounded"
                                >
                                    <Trash2 size={16} /> Delete Pin
                                </button>
                            </div>

                            <div className="text-xs text-muted-foreground mt-4">
                                <p>X: {selectedPin.x.toFixed(2)}</p>
                                <p>Y: {selectedPin.y.toFixed(2)}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}