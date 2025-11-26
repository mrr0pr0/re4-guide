'use client';

import { MapContainer, ImageOverlay, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import { useEffect, useState } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Gem, ShoppingBag, Save, Skull, Key, MapPin, Watch, Heart, Flag, Box, KeyRound, FileText, Crosshair, Award } from 'lucide-react';

// Fix for default marker icons in Next.js
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const MapController = ({ bounds, onMapClick }) => {
    const map = useMap();

    useMapEvents({
        click(e) {
            if (onMapClick) {
                onMapClick(e);
            }
        },
    });

    useEffect(() => {
        if (bounds) {
            map.fitBounds(bounds);
        }
    }, [map, bounds]);
    return null;
};

// Icon mapping
const iconMap = {
    'Gem': Gem,
    'ShoppingBag': ShoppingBag,
    'Save': Save,
    'Skull': Skull,
    'Key': Key,
    'Watch': Watch,
    'Heart': Heart,
    'Flag': Flag,
    'Box': Box,
    'KeyRound': KeyRound,
    'FileText': FileText,
    'Crosshair': Crosshair,
    'Award': Award,
    'default': MapPin
};

const createCustomIcon = (category) => {
    const IconComponent = iconMap[category?.icon] || iconMap['default'];
    const color = category?.color || '#ffffff';

    const iconHtml = renderToStaticMarkup(
        <div style={{
            backgroundColor: color,
            width: '30px',
            height: '30px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px solid white',
            boxShadow: '0 2px 4px rgba(0,0,0,0.3)'
        }}>
            <IconComponent size={18} color="black" />
        </div>
    );

    return L.divIcon({
        html: iconHtml,
        className: 'custom-pin-icon',
        iconSize: [30, 30],
        iconAnchor: [15, 15],
        popupAnchor: [0, -15]
    });
};

export default function GameMap({ imageUrl, pins = [], categories = {}, onMapClick, onPinClick, onPopupAction, isInteractive = false }) {
    const [bounds, setBounds] = useState(null);

    useEffect(() => {
        if (imageUrl) {
            const img = new Image();
            img.src = imageUrl;
            img.onload = () => {
                const w = img.width;
                const h = img.height;
                // Create bounds for the image [ [0,0], [height, width] ]
                setBounds([[0, 0], [h, w]]);
            };
        }
    }, [imageUrl]);

    if (!bounds) {
        return <div className="w-full h-full flex items-center justify-center bg-gray-900 text-white">Loading Map...</div>;
    }

    return (
        <MapContainer
            center={[bounds[1][0] / 2, bounds[1][1] / 2]}
            zoom={0}
            minZoom={-2}
            maxZoom={2}
            scrollWheelZoom={true}
            crs={L.CRS.Simple}
            style={{ height: '100%', width: '100%', background: '#000' }}
        >
            <ImageOverlay
                url={imageUrl}
                bounds={bounds}
            />
            <MapController bounds={bounds} onMapClick={onMapClick} />

            {pins.map((pin) => {
                // If category is hidden, don't render
                if (pin.category && categories[pin.category] && !categories[pin.category].visible) return null;

                const categoryData = categories[pin.category];
                const customIcon = createCustomIcon(categoryData);

                return (
                    <Marker
                        key={pin.id}
                        position={[pin.y, pin.x]}
                        icon={customIcon}
                        eventHandlers={{
                            click: () => {
                                if (onPinClick) onPinClick(pin);
                            },
                        }}
                    >
                        <Popup>
                            <div className="p-2 min-w-[200px]">
                                <h3 className="font-bold text-lg flex items-center gap-2">
                                    {categoryData?.icon && iconMap[categoryData.icon] && (
                                        (() => {
                                            const Icon = iconMap[categoryData.icon];
                                            return <Icon size={16} />;
                                        })()
                                    )}
                                    {pin.title}
                                </h3>
                                <p className="text-sm text-gray-600 my-2">{pin.description || 'No description.'}</p>
                                {pin.category && (
                                    <span
                                        className="inline-block px-2 py-1 text-xs rounded font-medium text-black"
                                        style={{ backgroundColor: categoryData?.color || '#eee' }}
                                    >
                                        {categoryData?.name || pin.category}
                                    </span>
                                )}
                                {isInteractive && (
                                    <div className="mt-3 pt-2 border-t flex justify-end">
                                        <button
                                            onClick={() => onPopupAction && onPopupAction(pin)}
                                            className={`text-xs px-3 py-1 rounded border transition-colors ${pin.title.startsWith('✓')
                                                    ? 'bg-green-100 text-green-700 border-green-200 hover:bg-green-200'
                                                    : 'bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100'
                                                }`}
                                        >
                                            {pin.title.startsWith('✓') ? '✓ Found' : 'Mark as Found'}
                                        </button>
                                    </div>
                                )}
                            </div>
                        </Popup>
                    </Marker>
                );
            })}
        </MapContainer>
    );
}
