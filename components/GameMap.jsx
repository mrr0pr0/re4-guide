'use client';

import { MapContainer, ImageOverlay, Marker, Popup, useMap } from 'react-leaflet';
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

const MapController = ({ bounds }) => {
    const map = useMap();
    useEffect(() => {
        if (bounds) {
            map.fitBounds(bounds);
        }
    }, [map, bounds]);
    return null;
};

export default function GameMap({ imageUrl, pins = [], categories = {} }) {
    const [bounds, setBounds] = useState(null);

    useEffect(() => {
        if (imageUrl) {
            const img = new Image();
            img.src = imageUrl;
            img.onload = () => {
                const w = img.width;
                const h = img.height;
                // Create bounds for the image [ [0,0], [height, width] ]
                // In Leaflet CRS.Simple, y goes up, so we might need to flip or just use standard rect
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
            <MapController bounds={bounds} />

            {pins.map((pin) => {
                // If category is hidden, don't render
                if (categories[pin.category] && !categories[pin.category].visible) return null;

                // Calculate position: Leaflet CRS.Simple usually maps (y, x)
                // If our data is x,y percentage or pixels, we need to convert.
                // Assuming pins are stored as absolute pixels relative to the image for now, or we can convert %
                // Let's assume the passed pins have x, y matching the image coordinate system
                // Note: Leaflet uses [lat, lng] which corresponds to [y, x] in CRS.Simple

                return (
                    <Marker
                        key={pin.id}
                        position={[pin.y, pin.x]}
                    >
                        <Popup>
                            <div className="p-2">
                                <h3 className="font-bold text-lg">{pin.title}</h3>
                                <p className="text-sm text-gray-600">{pin.description}</p>
                                <span className="inline-block mt-2 px-2 py-1 text-xs rounded bg-gray-200">
                                    {categories[pin.category]?.name || pin.category}
                                </span>
                            </div>
                        </Popup>
                    </Marker>
                );
            })}
        </MapContainer>
    );
}
