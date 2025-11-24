'use client';

import { MapContainer, ImageOverlay, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import { useEffect, useState } from 'react';

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

                return (
                    <Marker
                        key={pin.id}
                        position={[pin.y, pin.x]}
                        eventHandlers={{
                            click: () => {
                                if (onPinClick) onPinClick(pin);
                            },
                        }}
                    >
                        <Popup>
                            <div className="p-2">
                                <h3 className="font-bold text-lg">{pin.title}</h3>
                                <p className="text-sm text-gray-600">{pin.description}</p>
                                {pin.category && (
                                    <span className="inline-block mt-2 px-2 py-1 text-xs rounded bg-gray-200">
                                        {categories[pin.category]?.name || pin.category}
                                    </span>
                                )}
                                {isInteractive && (
                                    <div className="mt-2 pt-2 border-t">
                                        <button
                                            onClick={() => onPopupAction && onPopupAction(pin)}
                                            className="text-xs text-blue-500 hover:underline"
                                        >
                                            {pin.title.startsWith('✓') ? 'Mark as Unfound' : 'Mark as Found'}
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
