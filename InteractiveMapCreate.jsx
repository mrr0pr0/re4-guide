import React, { useState, useRef } from 'react';
import { Trash2, Plus, Save, Eye, EyeOff, Download, Upload, Edit2, Check, X } from 'lucide-react';

export default function RE4MapBuilder() {
  const [categories] = useState({
    treasure: { name: 'Treasure', color: '#FFD700' },
    merchant: { name: 'Merchant', color: '#00FF00' },
    request: { name: 'Request', color: '#FF6B6B' },
    medallion: { name: 'Blue Medallion', color: '#4A90E2' },
    weapon: { name: 'Weapon', color: '#9B59B6' },
    typewriter: { name: 'Typewriter', color: '#FF8C00' }
  });

  const [visibleCategories, setVisibleCategories] = useState(
    Object.keys(categories).reduce((acc, key) => ({ ...acc, [key]: true }), {})
  );

  const [pins, setPins] = useState([]);
  const [selectedPin, setSelectedPin] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [showExport, setShowExport] = useState(false);
  const mapRef = useRef(null);

  // Form state for new/editing pins
  const [pinForm, setPinForm] = useState({
    text: '',
    category: 'treasure',
    notes: '',
    done: false
  });

  const handleMapClick = (e) => {
    if (e.target.classList.contains('map-image')) {
      const rect = e.target.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      setEditMode(true);
      setSelectedPin({ x, y, isNew: true });
      setPinForm({ text: '', category: 'treasure', notes: '', done: false });
    }
  };

  const savePin = () => {
    if (!pinForm.text.trim()) {
      alert('Please enter a name for the pin');
      return;
    }

    if (selectedPin.isNew) {
      const newPin = {
        id: Date.now(),
        x: selectedPin.x,
        y: selectedPin.y,
        ...pinForm
      };
      setPins([...pins, newPin]);
    } else {
      setPins(pins.map(p =>
        p.id === selectedPin.id ? { ...p, ...pinForm } : p
      ));
    }

    setEditMode(false);
    setSelectedPin(null);
    setPinForm({ text: '', category: 'treasure', notes: '', done: false });
  };

  const editPin = (pin) => {
    setSelectedPin(pin);
    setPinForm({
      text: pin.text,
      category: pin.category,
      notes: pin.notes || '',
      done: pin.done
    });
    setEditMode(true);
  };

  const deletePin = (id) => {
    setPins(pins.filter(p => p.id !== id));
    setSelectedPin(null);
    setEditMode(false);
  };

  const togglePinDone = (id) => {
    setPins(pins.map(p => p.id === id ? { ...p, done: !p.done } : p));
  };

  const cancelEdit = () => {
    setEditMode(false);
    setSelectedPin(null);
    setPinForm({ text: '', category: 'treasure', notes: '', done: false });
  };

  const exportCode = () => {
    const code = `// RE4 Interactive Map - Generated Code
// Copy this into your final project

const mapData = {
  categories: ${JSON.stringify(categories, null, 2)},
  pins: ${JSON.stringify(pins, null, 2)}
};

// To use: Load this data in your app and render pins based on coordinates`;

    setShowExport(true);
  };

  const handleWheel = (e) => {
    e.preventDefault();
    const delta = e.deltaY * -0.001;
    setZoom(prev => Math.min(Math.max(0.5, prev + delta), 3));
  };

  const handleMouseDown = (e) => {
    if (e.target === mapRef.current || e.target.classList.contains('map-image')) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setPan({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const completedCount = (cat) => pins.filter(p => p.category === cat && p.done).length;
  const totalCount = (cat) => pins.filter(p => p.category === cat).length;

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <div className="w-80 bg-gray-800 overflow-y-auto flex flex-col">
        <div className="p-4 border-b border-gray-700">
          <h1 className="text-2xl font-bold mb-2 text-yellow-400">RE4 Map Builder</h1>
          <p className="text-sm text-gray-400">Click map to add pins visually</p>
        </div>

        {/* Action Buttons */}
        <div className="p-4 space-y-2 border-b border-gray-700">
          <button
            onClick={exportCode}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-3 rounded font-semibold"
          >
            <Download size={18} />
            Export Code
          </button>
          <button
            onClick={() => {
              localStorage.setItem('re4MapPins', JSON.stringify(pins));
              alert('Progress saved!');
            }}
            className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
          >
            <Save size={16} />
            Save Progress
          </button>
        </div>

        {/* Categories */}
        <div className="p-4 border-b border-gray-700">
          <h2 className="font-bold mb-3 text-lg">Categories</h2>
          <div className="space-y-2">
            {Object.entries(categories).map(([key, cat]) => (
              <div key={key} className="bg-gray-700 p-3 rounded">
                <div className="flex items-center justify-between mb-2">
                  <button
                    onClick={() => setVisibleCategories({
                      ...visibleCategories,
                      [key]: !visibleCategories[key]
                    })}
                    className="flex items-center gap-2 flex-1 hover:text-yellow-400"
                  >
                    {visibleCategories[key] ? <Eye size={16} /> : <EyeOff size={16} />}
                    <span className="font-semibold">{cat.name}</span>
                  </button>
                  <span className="text-sm text-gray-400">
                    {completedCount(key)}/{totalCount(key)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded-full border-2 border-gray-900"
                    style={{ backgroundColor: cat.color }}
                  />
                  <div className="flex-1 bg-gray-600 rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all"
                      style={{
                        width: `${totalCount(key) > 0 ? (completedCount(key) / totalCount(key)) * 100 : 0}%`,
                        backgroundColor: cat.color
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pin Editor Form */}
        {editMode && (
          <div className="p-4 bg-gray-700 border-b border-gray-600">
            <h3 className="font-bold mb-3 text-yellow-400">
              {selectedPin.isNew ? 'New Pin' : 'Edit Pin'}
            </h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm mb-1">Name *</label>
                <input
                  type="text"
                  value={pinForm.text}
                  onChange={(e) => setPinForm({ ...pinForm, text: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-800 rounded border border-gray-600 focus:border-yellow-400 outline-none"
                  placeholder="e.g., Velvet Blue"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Category</label>
                <select
                  value={pinForm.category}
                  onChange={(e) => setPinForm({ ...pinForm, category: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-800 rounded border border-gray-600 focus:border-yellow-400 outline-none"
                >
                  {Object.entries(categories).map(([key, cat]) => (
                    <option key={key} value={key}>{cat.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm mb-1">Notes (optional)</label>
                <textarea
                  value={pinForm.notes}
                  onChange={(e) => setPinForm({ ...pinForm, notes: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-800 rounded border border-gray-600 focus:border-yellow-400 outline-none"
                  rows="2"
                  placeholder="Extra info..."
                />
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={pinForm.done}
                  onChange={(e) => setPinForm({ ...pinForm, done: e.target.checked })}
                  className="w-4 h-4"
                />
                <span>Mark as completed</span>
              </label>
              <div className="flex gap-2">
                <button
                  onClick={savePin}
                  className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
                >
                  <Check size={16} />
                  Save
                </button>
                <button
                  onClick={cancelEdit}
                  className="flex-1 flex items-center justify-center gap-2 bg-gray-600 hover:bg-gray-500 px-4 py-2 rounded"
                >
                  <X size={16} />
                  Cancel
                </button>
              </div>
              {!selectedPin.isNew && (
                <button
                  onClick={() => deletePin(selectedPin.id)}
                  className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
                >
                  <Trash2 size={16} />
                  Delete Pin
                </button>
              )}
            </div>
          </div>
        )}

        {/* Pin List */}
        <div className="flex-1 p-4 overflow-y-auto">
          <h2 className="font-bold mb-3 text-lg">All Pins ({pins.length})</h2>
          <div className="space-y-2">
            {pins.length === 0 && (
              <p className="text-gray-400 text-sm">No pins yet. Click the map to add one!</p>
            )}
            {pins.map(pin => {
              const cat = categories[pin.category];
              return (
                <div
                  key={pin.id}
                  className="bg-gray-700 p-3 rounded hover:bg-gray-600 transition-colors"
                >
                  <div className="flex items-start gap-2">
                    <input
                      type="checkbox"
                      checked={pin.done}
                      onChange={() => togglePinDone(pin.id)}
                      className="mt-1 w-4 h-4 cursor-pointer"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: cat.color }}
                        />
                        <span className={`font-semibold ${pin.done ? 'line-through text-gray-400' : ''}`}>
                          {pin.text}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400">{cat.name}</p>
                      {pin.notes && (
                        <p className="text-xs text-gray-400 mt-1">{pin.notes}</p>
                      )}
                    </div>
                    <button
                      onClick={() => editPin(pin)}
                      className="p-1 hover:bg-gray-500 rounded"
                    >
                      <Edit2 size={14} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div
        ref={mapRef}
        className="flex-1 overflow-hidden bg-gray-950 relative cursor-move"
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onClick={handleMapClick}
      >
        <div
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            transformOrigin: 'center center',
            transition: isDragging ? 'none' : 'transform 0.1s',
            width: '100%',
            height: '100%',
            position: 'relative'
          }}
        >
          {/* Placeholder Map - Replace with your RE4 map image */}
          <img
            src="https://via.placeholder.com/1920x1080/1a1a1a/666666?text=Your+RE4+Map+Here"
            alt="RE4 Map"
            className="map-image w-full h-full object-contain pointer-events-auto"
            draggable={false}
          />

          {/* Pins */}
          {pins.map(pin => {
            const cat = categories[pin.category];
            if (!visibleCategories[pin.category]) return null;

            return (
              <div
                key={pin.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                style={{
                  left: `${pin.x}%`,
                  top: `${pin.y}%`,
                  pointerEvents: 'auto'
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  editPin(pin);
                }}
              >
                <div
                  className={`w-6 h-6 rounded-full border-2 border-white shadow-lg transition-transform group-hover:scale-125 ${pin.done ? 'opacity-50' : ''
                    }`}
                  style={{ backgroundColor: cat.color }}
                >
                  {pin.done && (
                    <Check size={16} className="text-white absolute inset-0 m-auto" />
                  )}
                </div>
                <div className="absolute left-8 top-0 bg-gray-900 px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-gray-700">
                  {pin.text}
                </div>
              </div>
            );
          })}
        </div>

        {/* Controls Overlay */}
        <div className="absolute top-4 right-4 bg-gray-800 p-3 rounded shadow-lg">
          <p className="text-sm mb-2">Zoom: {Math.round(zoom * 100)}%</p>
          <div className="space-y-1 text-xs text-gray-400">
            <p>🖱️ Click map = Add pin</p>
            <p>🎯 Click pin = Edit</p>
            <p>🔍 Scroll = Zoom</p>
            <p>✋ Drag = Pan</p>
          </div>
        </div>
      </div>

      {/* Export Modal */}
      {showExport && (
        <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4 text-yellow-400">Export Your Map Code</h2>
            <p className="text-sm text-gray-400 mb-4">
              Copy this code and use it in your final project:
            </p>
            <textarea
              readOnly
              value={`const mapData = {
  categories: ${JSON.stringify(categories, null, 2)},
  pins: ${JSON.stringify(pins, null, 2)}
};`}
              className="w-full h-64 p-4 bg-gray-900 rounded border border-gray-700 font-mono text-sm"
              onClick={(e) => e.target.select()}
            />
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(`const mapData = ${JSON.stringify({ categories, pins }, null, 2)};`);
                  alert('Code copied to clipboard!');
                }}
                className="flex-1 bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
              >
                Copy to Clipboard
              </button>
              <button
                onClick={() => setShowExport(false)}
                className="flex-1 bg-gray-600 hover:bg-gray-500 px-4 py-2 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}