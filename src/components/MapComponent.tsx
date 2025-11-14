import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface Location {
  name: string;
  lat: number;
  lng: number;
  address: string;
}

const locations: Location[] = [
  {
    name: 'San Francisco de Macorís',
    lat: 19.0593318,
    lng: -70.1514699,
    address: 'Sucursal Principal'
  },
  {
    name: 'Cotuí',
    lat: 19.0398517,
    lng: -70.1470676,
    address: 'Centro, Cotuí'
  },
  {
    name: 'Gaspar Hernández',
    lat: 19.6436279,
    lng: -70.2957958,
    address: 'Carr. Veragua-Gaspar Hernández'
  },
  {
    name: 'Moca',
    lat: 19.3946125,
    lng: -70.5271406,
    address: 'Centro, Moca'
  },
  {
    name: 'Nagua',
    lat: 19.2915771,
    lng: -70.2512833,
    address: 'Av. Central, Nagua'
  },
  {
    name: 'Tenares',
    lat: 19.2890928,
    lng: -70.3165703,
    address: 'Centro, Tenares'
  }
];

export function MapComponent() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    // Crear mapa
    map.current = L.map(mapContainer.current).setView([19.35, -70.34], 9);

    // Agregar tiles de OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(map.current);

    // Crear icono rojo personalizado
    const redIcon = new L.Icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });

    // Agregar marcadores
    locations.forEach((location) => {
      if (map.current) {
        const marker = L.marker([location.lat, location.lng], { icon: redIcon }).addTo(map.current);
        marker.bindPopup(
          `<div style="font-family: system-ui, -apple-system, sans-serif;">
            <h3 style="margin: 0 0 8px 0; color: #ff1e34; font-size: 15px; font-weight: 700;">
              ${location.name}
            </h3>
            <p style="margin: 0 0 10px 0; color: #555; font-size: 13px;">
              ${location.address}
            </p>
            <div style="display: flex; gap: 6px;">
              <a href="tel:+18095731234" style="flex: 1; padding: 6px; background: #ff1e34; color: white; text-decoration: none; border-radius: 4px; font-size: 12px; text-align: center; font-weight: 600;">Llamar</a>
              <a href="https://www.google.com/maps/search/${location.lat},${location.lng}" target="_blank" style="flex: 1; padding: 6px; background: #0073e6; color: white; text-decoration: none; border-radius: 4px; font-size: 12px; text-align: center; font-weight: 600;">Ruta</a>
            </div>
          </div>`
        );
      }
    });

    return () => {
      // No limpiar el mapa, solo dejarlo como está
    };
  }, []);

  return (
    <div
      ref={mapContainer}
      style={{
        width: '100%',
        height: '500px',
        borderRadius: '0.75rem',
        overflow: 'hidden',
        zIndex: 1
      }}
    />
  );
}
