import React, { useEffect } from 'react';
import { Head } from '@inertiajs/react';
import L from 'leaflet';

interface Hub {
    name: string;
    coordinates: [number, number];
    subHubs: string[];
    membersLink: string;
}

interface GeoJSONFeature {
    type: string;
    properties: { name: string };
    geometry: {
        type: string;
        coordinates: number[][][][];
    };
}

interface GeoJSONData {
    type: string;
    features: GeoJSONFeature[];
}

const hubs: Hub[] = [
    {
        name: "Adamawa",
        coordinates: [9.2084, 12.4810],
        subHubs: ["Numan", "Lamurde", "Gyawana"],
        membersLink: "https://dashboard.wimanigeria.com/adamawa/"
    },
    {
        name: "Gombe",
        coordinates: [10.2791, 11.1673],
        subHubs: ["Zambuk", "Malam Sidi", "Gyalengu"],
        membersLink: "https://dashboard.wimanigeria.com/gombe/"
    },
    {
        name: "Kaduna",
        coordinates: [10.5167, 7.4333],
        subHubs: ["Soba", "Kachia", "Zaria"],
        membersLink: "https://dashboard.wimanigeria.com/kaduna/"
    },
    {
        name: "Kano",
        coordinates: [12.0001, 8.5167],
        subHubs: ["Kura", "Bagwai", "Gwarzo"],
        membersLink: "https://dashboard.wimanigeria.com/kano/"
    }
];

// Simplified GeoJSON for Nigeria's borders
const nigeriaGeoJSON: GeoJSONData = {
    type: "FeatureCollection",
    features: [
        {
            type: "Feature",
            properties: { name: "Nigeria" },
            geometry: {
                type: "MultiPolygon",
                coordinates: [[[
                    [3.314, 6.426], [3.143, 6.469], [2.777, 6.742], [2.691, 7.289], [2.749, 7.912],
                    [3.221, 8.506], [3.606, 9.171], [3.978, 10.129], [4.351, 11.135], [4.949, 11.598],
                    [5.948, 12.031], [6.974, 12.435], [7.999, 12.631], [9.001, 12.438], [9.947, 12.271],
                    [10.999, 11.998], [11.999, 11.372], [12.999, 10.998], [13.582, 10.263], [13.885, 9.496],
                    [13.896, 8.996], [13.291, 8.006], [12.999, 7.497], [12.496, 7.003], [11.999, 6.501],
                    [11.001, 6.001], [10.001, 5.501], [9.001, 4.999], [8.001, 4.499], [7.001, 4.249],
                    [6.001, 4.249], [5.001, 4.499], [4.001, 4.999], [3.314, 6.426]
                ]]]
            }
        }
    ]
};

const Hubs: React.FC = () => {
    useEffect(() => {
        const map = L.map('map', {
            center: [9.0765, 7.3986],
            zoom: 6,
            minZoom: 6,
            maxZoom: 10,
            maxBounds: [[3, 2], [15, 15]], // tightly clamp to Nigeria
            maxBoundsViscosity: 1.0,
        });
    
        // Keep OSM tiles for visible roads and terrain
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);
    
        // Add Nigeria outline (to visually distinguish it)
        L.geoJSON(nigeriaGeoJSON, {
            style: {
                color: '#00a651',
                weight: 2,
                opacity: 1,
                fillColor: '#d0f5e3',
                fillOpacity: 0.3,
            }
        }).addTo(map);
    
        // Add WIMA hub markers
        hubs.forEach(hub => {
            const marker = L.marker(hub.coordinates).addTo(map);
            const popupContent = `
                <div class="p-2">
                    <h3 class="font-bold text-lg text-green-700">${hub.name}</h3>
                    <p class="text-sm mt-1"><strong>Sub-Hubs:</strong></p>
                    <ul class="list-disc list-inside text-sm">
                        ${hub.subHubs.map(subHub => `<li>${subHub}</li>`).join('')}
                    </ul>
                    <a href="${hub.membersLink}" target="_blank" class="mt-2 inline-block px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm">
                        View Members
                    </a>
                </div>
            `;
            marker.bindPopup(popupContent);
        });
    
        return () => {
            map.remove();
        };
    }, []);
    
    return (
        <>
            <Head title="WIMA Nigeria - Hubs Map" />
            <div className="flex flex-col min-h-screen">
                {/* Header */}
                <header className="bg-green-50 py-4 shadow-md">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <img
                                src="https://wimanigeria.com/wp-content/uploads/2022/04/WIMA_logo_png.png"
                                alt="WIMA Nigeria Logo"
                                className="h-12 sm:h-14 max-w-[150px] object-contain"
                            />
                            <div className="text-gray-800 text-sm font-medium">
                                <b>WIMA</b><br />
                                Empowering Women<br />
                                Driving Mechanization<br />
                                Transforming Agriculture
                            </div>
                        </div>
                        <h1 className="text-lg sm:text-xl font-bold text-gray-800">WIMA Hubs Map</h1>
                    </div>
                </header>

                {/* Map */}
                <main className="flex-grow">
                    <div id="map" className="w-full h-[calc(100vh-8rem)] sm:h-[calc(100vh-10rem)]"></div>
                </main>

                {/* Footer */}
                <footer className="bg-green-900 text-white py-4">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
                        <img
                            src="https://wimanigeria.com/wp-content/uploads/2022/04/WIMA_logo_png.png"
                            alt="WIMA Logo"
                            className="h-10 sm:h-12 mx-auto mb-4"
                        />
                        <p className="text-sm">House 2, Block B, Sani Zangon Daura Estate, Kado, Abuja, Nigeria.</p>
                        <p className="text-sm">Phone: +234-806-4237-096 | Email: info@wimanigeria.com</p>
                        <p className="text-sm mt-2">© 2025 WIMA. All Rights Reserved.</p>
                    </div>
                </footer>
            </div>
        </>
    );
};

export default Hubs;