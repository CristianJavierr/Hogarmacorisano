# EJEMPLOS DE CÓDIGO LISTOS PARA USAR

## 1️⃣ COMPONENTE LEAFLET COMPLETO Y FUNCIONAL

### `components/Map/InteractiveMap.tsx`

```typescript
import React, { useState, useCallback, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { LatLngExpression, Icon } from 'leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Tipos
interface LocationData {
  id: string;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  phone?: string;
  email?: string;
  category?: 'clinic' | 'pharmacy' | 'hospital' | 'other';
}

interface InteractiveMapProps {
  locations: LocationData[];
  center?: LatLngExpression;
  zoom?: number;
  onMarkerClick?: (location: LocationData) => void;
  tileLayer?: string;
}

// Fix para iconos por defecto
const setupLeafletIcons = () => {
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  });
};

setupLeafletIcons();

// Colores por categoría
const CATEGORY_COLORS: Record<string, string> = {
  clinic: '#3b82f6',      // Azul
  pharmacy: '#10b981',    // Verde
  hospital: '#ef4444',    // Rojo
  other: '#8b5cf6',       // Púrpura
};

// Componente auxiliar para centrarse en marcador
const FitBoundsComponent = ({ locations }: { locations: LocationData[] }) => {
  const map = useMap();

  React.useEffect(() => {
    if (locations.length === 0) return;

    if (locations.length === 1) {
      map.setView(
        [locations[0].latitude, locations[0].longitude],
        13
      );
    } else {
      const bounds = L.latLngBounds(
        locations.map(loc => [loc.latitude, loc.longitude])
      );
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [locations, map]);

  return null;
};

// Componente principal
export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  locations,
  center = [18.7405, -70.1617],
  zoom = 13,
  onMarkerClick,
  tileLayer = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
}) => {
  const [selectedLocationId, setSelectedLocationId] = useState<string | null>(null);

  const selectedLocation = useMemo(
    () => locations.find(loc => loc.id === selectedLocationId),
    [locations, selectedLocationId]
  );

  const createCustomIcon = useCallback((category?: string) => {
    const color = CATEGORY_COLORS[category || 'other'];
    const svgIcon = `
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="50" viewBox="0 0 40 50">
        <defs>
          <filter id="shadow">
            <feDropShadow dx="0" dy="2" stdDeviation="2" flood-opacity="0.3"/>
          </filter>
        </defs>
        <path fill="${color}" d="M20 0C9 0 0 9 0 20c0 15 20 30 20 30s20-15 20-30c0-11-9-20-20-20z" filter="url(#shadow)"/>
        <circle cx="20" cy="20" r="7" fill="white"/>
      </svg>
    `;

    return new Icon({
      iconUrl: `data:image/svg+xml;base64,${btoa(svgIcon)}`,
      iconSize: [40, 50],
      iconAnchor: [20, 50],
      popupAnchor: [0, -40],
    });
  }, []);

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      scrollWheelZoom={true}
      style={{
        height: '100%',
        width: '100%',
        borderRadius: '8px',
        overflow: 'hidden',
      }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url={tileLayer}
        maxZoom={19}
        minZoom={3}
      />

      {locations.map((location) => (
        <Marker
          key={location.id}
          position={[location.latitude, location.longitude]}
          icon={createCustomIcon(location.category)}
          eventHandlers={{
            click: () => {
              setSelectedLocationId(location.id);
              onMarkerClick?.(location);
            },
          }}
        >
          {selectedLocationId === location.id && (
            <Popup
              onClose={() => setSelectedLocationId(null)}
              maxWidth={300}
              minWidth={200}
            >
              <div className="map-popup">
                <h3 className="popup-title">{location.name}</h3>
                <p className="popup-description">{location.description}</p>
                <div className="popup-details">
                  {location.phone && (
                    <p>
                      <strong>📞</strong> {location.phone}
                    </p>
                  )}
                  {location.email && (
                    <p>
                      <strong>📧</strong>{' '}
                      <a href={`mailto:${location.email}`}>{location.email}</a>
                    </p>
                  )}
                </div>
              </div>
            </Popup>
          )}
        </Marker>
      ))}

      {locations.length > 1 && (
        <FitBoundsComponent locations={locations} />
      )}
    </MapContainer>
  );
};
```

### Estilos CSS para el Popup

```css
/* components/Map/map-popup.css */
.map-popup {
  padding: 12px 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.popup-title {
  margin: 0 0 8px 0;
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
  line-height: 1.3;
}

.popup-description {
  margin: 8px 0;
  font-size: 14px;
  color: #4b5563;
  line-height: 1.4;
}

.popup-details {
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid #e5e7eb;
}

.popup-details p {
  margin: 6px 0;
  font-size: 13px;
  color: #374151;
  display: flex;
  align-items: center;
  gap: 6px;
}

.popup-details strong {
  min-width: 20px;
}

.popup-details a {
  color: #3b82f6;
  text-decoration: none;
  word-break: break-all;
}

.popup-details a:hover {
  text-decoration: underline;
}

/* Estilos para Leaflet popup */
.leaflet-popup-content-wrapper {
  border-radius: 8px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

.leaflet-popup-tip {
  background-color: white;
}
```

---

## 2️⃣ PÁGINA DE EJEMPLO CON BÚSQUEDA Y FILTRADO

### `pages/LocationsPage.tsx`

```typescript
import React, { useState, useMemo } from 'react';
import { InteractiveMap } from '@/components/Map/InteractiveMap';

interface LocationData {
  id: string;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  phone?: string;
  email?: string;
  category?: 'clinic' | 'pharmacy' | 'hospital' | 'other';
}

// Datos de ejemplo
const MOCK_LOCATIONS: LocationData[] = [
  {
    id: '1',
    name: 'Hogar Macorisano',
    description: 'Centro de atención integral y cuidado',
    latitude: 18.7405,
    longitude: -70.1617,
    phone: '+1-809-574-2477',
    email: 'info@hogarmacorisano.do',
    category: 'hospital',
  },
  {
    id: '2',
    name: 'Farmacia Central Macoris',
    description: 'Medicamentos y suministros médicos',
    latitude: 18.7410,
    longitude: -70.1620,
    phone: '+1-809-574-5555',
    category: 'pharmacy',
  },
  {
    id: '3',
    name: 'Clínica Dental Sonrisa',
    description: 'Servicios dentales completos',
    latitude: 18.7400,
    longitude: -70.1610,
    phone: '+1-809-574-6666',
    category: 'clinic',
  },
  {
    id: '4',
    name: 'Centro Médico',
    description: 'Consultorios médicos y laboratorio',
    latitude: 18.7415,
    longitude: -70.1625,
    email: 'consultas@centromedico.do',
    category: 'clinic',
  },
];

export default function LocationsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredLocations = useMemo(() => {
    return MOCK_LOCATIONS.filter((location) => {
      const matchesSearch =
        location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        location.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === 'all' || location.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const categories = [
    { value: 'all', label: 'Todas' },
    { value: 'hospital', label: '🏥 Hospitales' },
    { value: 'clinic', label: '🏥 Clínicas' },
    { value: 'pharmacy', label: '💊 Farmacias' },
    { value: 'other', label: '📍 Otros' },
  ];

  return (
    <div className="locations-page">
      <div className="page-header">
        <h1>Ubicaciones Disponibles</h1>
        <p>Encuentra nuestros centros de atención en San Pedro de Macorís</p>
      </div>

      <div className="filters-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="Buscar ubicación..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="clear-button"
              aria-label="Limpiar búsqueda"
            >
              ✕
            </button>
          )}
        </div>

        <div className="category-filters">
          {categories.map((cat) => (
            <button
              key={cat.value}
              className={`filter-button ${
                selectedCategory === cat.value ? 'active' : ''
              }`}
              onClick={() => setSelectedCategory(cat.value)}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <div className="content-section">
        <div className="map-column">
          <div className="map-wrapper">
            <InteractiveMap
              locations={filteredLocations}
              center={[18.7405, -70.1617]}
              zoom={13}
              onMarkerClick={(location) => {
                console.log('Marcador seleccionado:', location.name);
              }}
            />
          </div>
        </div>

        <div className="list-column">
          <div className="locations-list">
            <h2>Resultados ({filteredLocations.length})</h2>

            {filteredLocations.length === 0 ? (
              <div className="no-results">
                <p>No se encontraron ubicaciones</p>
                <button onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}>
                  Limpiar filtros
                </button>
              </div>
            ) : (
              <ul className="location-items">
                {filteredLocations.map((location) => (
                  <li key={location.id} className="location-item">
                    <h3>{location.name}</h3>
                    <p className="description">{location.description}</p>
                    {location.phone && (
                      <p className="contact">
                        <span>📞</span> {location.phone}
                      </p>
                    )}
                    {location.email && (
                      <p className="contact">
                        <span>📧</span> {location.email}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
```

### Estilos para la Página

```css
/* pages/LocationsPage.css */
.locations-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
  padding: 20px;
}

.page-header {
  text-align: center;
  margin-bottom: 40px;
}

.page-header h1 {
  font-size: 32px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 8px 0;
}

.page-header p {
  font-size: 16px;
  color: #6b7280;
  margin: 0;
}

.filters-section {
  max-width: 1200px;
  margin: 0 auto 30px;
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.search-box {
  position: relative;
  margin-bottom: 20px;
}

.search-input {
  width: 100%;
  padding: 12px 40px 12px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.3s ease;
}

.search-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.clear-button {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #9ca3af;
  transition: color 0.2s;
}

.clear-button:hover {
  color: #6b7280;
}

.category-filters {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.filter-button {
  padding: 8px 16px;
  border: 2px solid #e5e7eb;
  background: white;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.filter-button:hover {
  border-color: #3b82f6;
  color: #3b82f6;
}

.filter-button.active {
  background: #3b82f6;
  border-color: #3b82f6;
  color: white;
}

.content-section {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;
}

.map-column {
  height: 600px;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.map-wrapper {
  width: 100%;
  height: 100%;
}

.list-column {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.locations-list {
  padding: 20px;
  height: 100%;
  overflow-y: auto;
  flex: 1;
}

.locations-list h2 {
  margin: 0 0 16px 0;
  font-size: 18px;
  font-weight: 600;
  color: #111827;
}

.location-items {
  list-style: none;
  padding: 0;
  margin: 0;
}

.location-item {
  padding: 16px 0;
  border-bottom: 1px solid #e5e7eb;
}

.location-item:last-child {
  border-bottom: none;
}

.location-item h3 {
  margin: 0 0 6px 0;
  font-size: 15px;
  font-weight: 600;
  color: #111827;
}

.location-item .description {
  margin: 6px 0;
  font-size: 13px;
  color: #6b7280;
}

.contact {
  margin: 6px 0;
  font-size: 13px;
  color: #374151;
  display: flex;
  align-items: center;
  gap: 8px;
}

.contact span {
  font-size: 16px;
}

.no-results {
  text-align: center;
  padding: 40px 20px;
}

.no-results p {
  font-size: 16px;
  color: #6b7280;
  margin-bottom: 16px;
}

.no-results button {
  padding: 8px 16px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: background 0.3s;
}

.no-results button:hover {
  background: #2563eb;
}

/* Responsivo */
@media (max-width: 768px) {
  .content-section {
    grid-template-columns: 1fr;
  }

  .map-column {
    height: 400px;
  }

  .category-filters {
    gap: 8px;
  }

  .filter-button {
    padding: 6px 12px;
    font-size: 13px;
  }

  .page-header h1 {
    font-size: 24px;
  }
}
```

---

## 3️⃣ DATOS DE EJEMPLO EN JSON

### `data/locations.json`

```json
{
  "locations": [
    {
      "id": "1",
      "name": "Hogar Macorisano",
      "description": "Centro de atención integral y cuidado",
      "latitude": 18.7405,
      "longitude": -70.1617,
      "phone": "+1-809-574-2477",
      "email": "info@hogarmacorisano.do",
      "website": "https://www.hogarmacorisano.do",
      "category": "hospital",
      "address": "Calle Principal, San Pedro de Macorís"
    },
    {
      "id": "2",
      "name": "Farmacia Central Macoris",
      "description": "Medicamentos y suministros médicos",
      "latitude": 18.7410,
      "longitude": -70.1620,
      "phone": "+1-809-574-5555",
      "category": "pharmacy",
      "address": "Av. Constitución, San Pedro de Macorís"
    },
    {
      "id": "3",
      "name": "Clínica Dental Sonrisa",
      "description": "Servicios dentales completos",
      "latitude": 18.7400,
      "longitude": -70.1610,
      "phone": "+1-809-574-6666",
      "email": "citas@clinicasonrisa.do",
      "category": "clinic",
      "address": "Calle Duarte, San Pedro de Macorís"
    },
    {
      "id": "4",
      "name": "Centro Médico Integral",
      "description": "Consultorios médicos y laboratorio",
      "latitude": 18.7415,
      "longitude": -70.1625,
      "phone": "+1-809-574-7777",
      "email": "consultas@centromedico.do",
      "category": "clinic",
      "address": "Av. Independencia, San Pedro de Macorís"
    },
    {
      "id": "5",
      "name": "Farmacia Express",
      "description": "Farmacia 24 horas",
      "latitude": 18.7395,
      "longitude": -70.1605,
      "phone": "+1-809-574-8888",
      "category": "pharmacy",
      "address": "Centro Comercial, San Pedro de Macorís"
    }
  ]
}
```

---

## 4️⃣ HOOK PERSONALIZADO PARA OBTENER DATOS

### `hooks/useLocations.ts`

```typescript
import { useState, useEffect, useCallback } from 'react';

interface LocationData {
  id: string;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  phone?: string;
  email?: string;
  website?: string;
  category?: string;
  address?: string;
}

interface UseLocationsReturn {
  locations: LocationData[];
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export const useLocations = (
  apiUrl: string = '/api/locations'
): UseLocationsReturn => {
  const [locations, setLocations] = useState<LocationData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchLocations = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      const data = await response.json();
      setLocations(Array.isArray(data) ? data : data.locations || []);
    } catch (err) {
      console.error('Error fetching locations:', err);
      setError(err instanceof Error ? err : new Error('Unknown error'));
      // Fallback a datos vacíos
      setLocations([]);
    } finally {
      setLoading(false);
    }
  }, [apiUrl]);

  useEffect(() => {
    fetchLocations();
  }, [fetchLocations]);

  return {
    locations,
    loading,
    error,
    refetch: fetchLocations,
  };
};
```

### Uso del Hook

```typescript
import { useLocations } from '@/hooks/useLocations';

export default function LocationsPage() {
  const { locations, loading, error, refetch } = useLocations('/api/locations');

  if (loading) return <div>Cargando ubicaciones...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <InteractiveMap
      locations={locations}
      onMarkerClick={(location) => console.log(location)}
    />
  );
}
```

---

## 5️⃣ ENDPOINT API DE EJEMPLO

### `api/locations.ts` (Next.js)

```typescript
import type { NextApiRequest, NextApiResponse } from 'next';

interface LocationData {
  id: string;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  phone?: string;
  email?: string;
  category?: string;
}

const LOCATIONS: LocationData[] = [
  {
    id: '1',
    name: 'Hogar Macorisano',
    description: 'Centro de atención integral',
    latitude: 18.7405,
    longitude: -70.1617,
    phone: '+1-809-574-2477',
    email: 'info@hogarmacorisano.do',
    category: 'hospital',
  },
  // ... más ubicaciones
];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<LocationData[] | { error: string }>
) {
  if (req.method === 'GET') {
    try {
      // Agregar cache headers
      res.setHeader(
        'Cache-Control',
        'public, s-maxage=3600, stale-while-revalidate=86400'
      );
      res.status(200).json(LOCATIONS);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching locations' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
```

---

## 6️⃣ CONFIGURACIÓN DE TAILWIND (SI LO USAS)

### Estilos Tailwind para el Mapa

```html
<!-- Contenedor del mapa con Tailwind -->
<div class="h-screen w-full rounded-lg shadow-lg overflow-hidden bg-gray-100">
  <InteractiveMap
    locations={locations}
    center={[18.7405, -70.1617]}
    zoom={13}
  />
</div>

<!-- Layout responsivo -->
<div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
  <!-- Mapa -->
  <div class="lg:col-span-2 rounded-lg shadow-lg overflow-hidden h-600px">
    <InteractiveMap locations={locations} />
  </div>

  <!-- Sidebar con lista -->
  <div class="bg-white rounded-lg shadow-lg p-6 h-600px overflow-y-auto">
    <h2 class="text-xl font-bold mb-4">Ubicaciones ({locations.length})</h2>
    <ul class="space-y-4">
      {locations.map(loc => (
        <li key={loc.id} class="border-b pb-4">
          <h3 class="font-semibold text-gray-900">{loc.name}</h3>
          <p class="text-sm text-gray-600">{loc.description}</p>
        </li>
      ))}
    </ul>
  </div>
</div>
```

---

## 7️⃣ DEPLOYMENT CHECKLIST

### Antes de Desplegar

```bash
# 1. Verificar que todas las dependencias estén instaladas
npm install

# 2. Build de producción
npm run build

# 3. Pruebas
npm run test (si aplica)

# 4. Lint
npm run lint

# 5. Verificar que no haya errores de TypeScript
npx tsc --noEmit

# 6. Probar en local
npm run dev
```

### Variables de Entorno (si las necesitas)

```env
# .env.local
NEXT_PUBLIC_MAP_CENTER_LAT=18.7405
NEXT_PUBLIC_MAP_CENTER_LON=-70.1617
NEXT_PUBLIC_MAP_ZOOM=13
NEXT_PUBLIC_TILE_LAYER=https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png
API_URL=https://tu-api.com/locations
```

---

## 8️⃣ TROUBLESHOOTING

### Problema: Iconos de marcadores no se muestran
**Solución:**
```typescript
import L from 'leaflet';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});
```

### Problema: Mapa se ve gris
**Solución:**
```typescript
import 'leaflet/dist/leaflet.css'; // Asegúrate de importar el CSS
```

### Problema: Error "Cannot find module 'leaflet'"
**Solución:**
```bash
npm install --save leaflet react-leaflet
npm install --save-dev @types/leaflet
```

### Problema: Popup no aparece
**Solución:**
```typescript
// Asegúrate de que el Popup esté dentro del Marker
<Marker position={[lat, lon]}>
  <Popup>Contenido</Popup>
</Marker>
```

---

**Estos ejemplos están listos para copiar y usar. ¡Adaptlos a tu proyecto!**
