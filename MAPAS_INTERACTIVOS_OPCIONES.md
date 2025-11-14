# Mapas Interactivos SIN API de Google Maps - Guía Completa

## Resumen Ejecutivo

Existen **4 opciones principales** para crear mapas interactivos con múltiples marcadores sin necesidad de clave API de Google Maps. Todas son **gratis, de código abierto y fáciles de integrar en React/TypeScript**.

---

## 1. 🎯 LEAFLET + REACT-LEAFLET (RECOMENDADO)

### Ventajas
✅ **Más popular y maduro** para proyectos React  
✅ Librería Leaflet extremadamente ligera (~42 KB)  
✅ Excelente documentación y comunidad  
✅ Múltiples capas de mapa disponibles (OpenStreetMap, Stadia Maps, etc.)  
✅ Soporte completo para marcadores, popups, polígonos, líneas  
✅ Muy performante incluso con cientos de marcadores  

### Desventajas
❌ No compatible con Server-Side Rendering (SSR)  
❌ Requiere CSS adicional  

### Stack de Paquetes
```bash
npm install leaflet react-leaflet
npm install -D @types/leaflet
```

### Implementación Básica con React/TypeScript

```typescript
// components/MapComponent.tsx
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import React, { useState } from 'react';

// Fix para iconos de marcadores por defecto
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapMarker {
  id: string;
  position: LatLngExpression;
  title: string;
  description: string;
}

interface MapComponentProps {
  markers: MapMarker[];
  center?: LatLngExpression;
  zoom?: number;
}

export const MapComponent: React.FC<MapComponentProps> = ({
  markers,
  center = [51.505, -0.09],
  zoom = 13,
}) => {
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      scrollWheelZoom={false}
      style={{ height: '500px', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers.map((marker) => (
        <Marker key={marker.id} position={marker.position}>
          <Popup>
            <div>
              <h3>{marker.title}</h3>
              <p>{marker.description}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};
```

### Uso en tu aplicación

```typescript
// En tu página/componente principal
import { MapComponent } from '@/components/MapComponent';

const markers = [
  {
    id: '1',
    position: [18.741, -70.162],
    title: 'Hogar Macorisano',
    description: 'Ubicación principal'
  },
  {
    id: '2',
    position: [18.745, -70.160],
    title: 'Punto de interés',
    description: 'Descripción del punto'
  },
];

export default function MapPage() {
  return (
    <div>
      <h1>Mapa Interactivo</h1>
      <MapComponent 
        markers={markers}
        center={[18.741, -70.162]}
        zoom={13}
      />
    </div>
  );
}
```

### Capas Alternativas (Sin API Key)

```typescript
// OpenStreetMap (por defecto - GRATIS)
url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

// Stadia Maps (GRATIS, mejor calidad, requiere atribución)
url="https://tiles.stadiamaps.com/tiles/stamen_toner/{z}/{x}/{y}.png"

// CartoDB (GRATIS)
url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"

// Esri Satellite (GRATIS)
url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
```

---

## 2. 🗺️ OPENLAYERS

### Ventajas
✅ Librería muy poderosa para GIS profesional  
✅ Soporta múltiples formatos (GeoJSON, KML, TopoJSON, etc.)  
✅ Excelente para datos geoespaciales complejos  
✅ Totalmente gratis y open source  
✅ Sin dependencias externas  

### Desventajas
❌ Curva de aprendizaje más pronunciada  
❌ Menos comunidad en ecosistema React  
❌ Documentación menos amigable para principiantes  

### Implementación con React/TypeScript

```typescript
// components/OpenLayersMap.tsx
import React, { useEffect, useRef } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import Text from 'ol/style/Text';
import Fill from 'ol/style/Fill';
import 'ol/ol.css';

interface MapMarker {
  id: string;
  lon: number;
  lat: number;
  title: string;
  description: string;
}

interface OpenLayersMapProps {
  markers: MapMarker[];
  center?: [number, number];
  zoom?: number;
}

export const OpenLayersMap: React.FC<OpenLayersMapProps> = ({
  markers,
  center = [-70.162, 18.741],
  zoom = 13,
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    // Crear fuente vectorial para los marcadores
    const vectorSource = new VectorSource();

    // Agregar marcadores
    markers.forEach((marker) => {
      const feature = new Feature({
        geometry: new Point(fromLonLat([marker.lon, marker.lat])),
        name: marker.title,
        description: marker.description,
      });

      feature.setStyle(
        new Style({
          image: new Icon({
            anchor: [0.5, 1],
            src: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
            scale: 1,
          }),
        })
      );

      vectorSource.addFeature(feature);
    });

    // Crear capa vectorial
    const vectorLayer = new VectorLayer({
      source: vectorSource,
    });

    // Crear mapa
    map.current = new Map({
      target: mapContainer.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        vectorLayer,
      ],
      view: new View({
        center: fromLonLat(center),
        zoom: zoom,
      }),
    });

    return () => {
      if (map.current) {
        map.current.setTarget(undefined);
      }
    };
  }, [markers, center, zoom]);

  return <div ref={mapContainer} style={{ width: '100%', height: '500px' }} />;
};
```

---

## 3. 📍 MAPLIBRE GL JS (Alternativa a Mapbox)

### Ventajas
✅ Muy similar a Mapbox pero completamente gratis  
✅ Excelentes mapas vectoriales  
✅ Muy buena performance  
✅ Código abierto (fork de Mapbox)  

### Desventajas
❌ Requiere más configuración  
❌ Comunidad menor que Leaflet  

### Instalación
```bash
npm install maplibre-gl react-map-gl
npm install -D @types/maplibre-gl
```

### Implementación Básica

```typescript
// components/MapLibreComponent.tsx
import React from 'react';
import Map, { Marker, Popup } from 'react-map-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

interface MapMarker {
  id: string;
  latitude: number;
  longitude: number;
  title: string;
}

interface MapLibreComponentProps {
  markers: MapMarker[];
  initialViewState?: any;
}

export const MapLibreComponent: React.FC<MapLibreComponentProps> = ({
  markers,
  initialViewState = {
    longitude: -70.162,
    latitude: 18.741,
    zoom: 13,
  },
}) => {
  const [popupInfo, setPopupInfo] = React.useState<MapMarker | null>(null);

  return (
    <Map
      initialViewState={initialViewState}
      style={{ width: '100%', height: '500px' }}
      mapStyle="https://demotiles.maplibre.org/style.json"
    >
      {markers.map((marker) => (
        <Marker
          key={marker.id}
          longitude={marker.longitude}
          latitude={marker.latitude}
          onClick={(e) => {
            e.originalEvent.stopPropagation();
            setPopupInfo(marker);
          }}
        />
      ))}

      {popupInfo && (
        <Popup
          longitude={popupInfo.longitude}
          latitude={popupInfo.latitude}
          onClose={() => setPopupInfo(null)}
          closeButton={true}
        >
          <div>
            <h3>{popupInfo.title}</h3>
          </div>
        </Popup>
      )}
    </Map>
  );
};
```

---

## 4. 🌐 PIGEON MAPS (Minimalista)

### Ventajas
✅ Muy ligero y simple  
✅ Perfecto para aplicaciones pequeñas  
✅ Fácil de personalizar  
✅ Muy buen soporte para React  

### Desventajas
❌ Menos funcionalidades que Leaflet  
❌ Comunidad más pequeña  

### Instalación
```bash
npm install pigeon-maps
```

### Ejemplo

```typescript
import React from 'react';
import Map, { Marker, Popup } from 'pigeon-maps';
import { maptiler } from 'pigeon-maps/providers';

interface MapMarker {
  id: string;
  anchor: [number, number];
  title: string;
}

interface PigeonMapComponentProps {
  markers: MapMarker[];
  center?: [number, number];
  zoom?: number;
}

export const PigeonMapComponent: React.FC<PigeonMapComponentProps> = ({
  markers,
  center = [18.741, -70.162],
  zoom = 13,
}) => {
  const [popupMarker, setPopupMarker] = React.useState<string | null>(null);

  return (
    <Map center={center} zoom={zoom} provider={maptiler('YOUR_MAPTILER_KEY')}>
      {markers.map((marker) => (
        <Marker
          key={marker.id}
          anchor={marker.anchor}
          onClick={() => setPopupMarker(marker.id)}
        >
          {popupMarker === marker.id && (
            <Popup>{marker.title}</Popup>
          )}
        </Marker>
      ))}
    </Map>
  );
};
```

---

## 📊 COMPARATIVA DE OPCIONES

| Característica | Leaflet | OpenLayers | MapLibre GL | Pigeon |
|---|---|---|---|---|
| **Facilidad React** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Tamaño** | 42 KB | ~200 KB | ~140 KB | ~30 KB |
| **Funcionalidades** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| **Comunidad** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| **Curva Aprendizaje** | Fácil | Media | Fácil | Muy Fácil |
| **Capas Gratis** | ✅ Múltiples | ✅ Múltiples | ✅ Múltiples | ⚠️ MapTiler |
| **Rendimiento** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |

---

## 🎨 CAPAS GRATIS DISPONIBLES

### Leaflet / OpenLayers / MapLibre

#### 1. **OpenStreetMap** (MEJOR OPCIÓN - SIN LÍMITES)
```
URL: https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png
Ventajas: Completamente gratis, sin límite de peticiones
Atribución obligatoria: © OpenStreetMap contributors
```

#### 2. **Stadia Maps** (MÁS ESTILIZADO - GRATIS)
```
URL: https://tiles.stadiamaps.com/tiles/stamen_toner/{z}/{x}/{y}.png
Ventajas: Mejor visualización, 600,000 requests/mes gratis
Requiere atribución
```

#### 3. **CartoDB** (MINIMALISTA - GRATIS)
```
URL: https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png
Ventajas: Muy limpio y moderno
Opciones: light_all, dark_all, voyager, voyager_no_labels
```

#### 4. **ESRI Satellite** (SATÉLITE - GRATIS)
```
URL: https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}
Ventajas: Imágenes satelitales gratuitas
```

#### 5. **USGS TopoMap** (TOPOGRÁFICO - GRATIS)
```
URL: https://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer/tile/{z}/{y}/{x}
Ventajas: Bueno para mapas detallados
```

---

## 🚀 PROYECTO COMPLETO CON LEAFLET (RECOMENDADO)

### Estructura de Carpetas
```
src/
├── components/
│   ├── Map/
│   │   ├── MapContainer.tsx
│   │   ├── MarkerCluster.tsx
│   │   ├── useMapData.ts
│   │   └── styles.css
│   └── ...
├── types/
│   ├── map.types.ts
├── data/
│   └── locations.ts
└── pages/
    └── MapPage.tsx
```

### Tipos TypeScript

```typescript
// types/map.types.ts
export interface Location {
  id: string;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  phone?: string;
  email?: string;
  website?: string;
  category?: 'clinic' | 'pharmacy' | 'hospital' | 'other';
}

export interface MapConfig {
  center: [number, number];
  zoom: number;
  minZoom?: number;
  maxZoom?: number;
}

export interface PopupData extends Location {
  isOpen: boolean;
}
```

### Hook Personalizado para Datos

```typescript
// components/Map/useMapData.ts
import { useState, useEffect } from 'react';
import { Location } from '@/types/map.types';

export const useMapData = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        // Obtener datos de tu API
        const response = await fetch('/api/locations');
        const data = await response.json();
        setLocations(data);
      } catch (err) {
        setError('Error cargando ubicaciones');
        // Fallback a datos locales
        setLocations(DEFAULT_LOCATIONS);
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  return { locations, loading, error };
};
```

### Datos de Ejemplo

```typescript
// data/locations.ts
export const DEFAULT_LOCATIONS = [
  {
    id: '1',
    name: 'Hogar Macorisano',
    description: 'Centro de atención principal',
    latitude: 18.7405,
    longitude: -70.1617,
    phone: '+1-809-xxx-xxxx',
    category: 'hospital',
  },
  {
    id: '2',
    name: 'Farmacia Central',
    description: 'Medicamentos y suministros',
    latitude: 18.7410,
    longitude: -70.1620,
    category: 'pharmacy',
  },
  {
    id: '3',
    name: 'Clínica Dental',
    description: 'Servicios dentales',
    latitude: 18.7400,
    longitude: -70.1610,
    category: 'clinic',
  },
];
```

### Componente Principal

```typescript
// components/Map/MapContainer.tsx
import React, { useState, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import L from 'leaflet';
import { Location, PopupData } from '@/types/map.types';
import { useMapData } from './useMapData';
import 'leaflet/dist/leaflet.css';
import './styles.css';

// Fix iconos
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapContainerProps {
  initialCenter?: LatLngExpression;
  initialZoom?: number;
}

export const MapComponent: React.FC<MapContainerProps> = ({
  initialCenter = [18.7405, -70.1617],
  initialZoom = 13,
}) => {
  const { locations, loading } = useMapData();
  const [selectedPopup, setSelectedPopup] = useState<string | null>(null);

  const getCategoryColor = (category?: string) => {
    const colors: Record<string, string> = {
      clinic: '#3b82f6',
      pharmacy: '#10b981',
      hospital: '#ef4444',
      other: '#8b5cf6',
    };
    return colors[category || 'other'];
  };

  if (loading) {
    return <div className="map-loading">Cargando mapa...</div>;
  }

  return (
    <div className="map-wrapper">
      <MapContainer
        center={initialCenter}
        zoom={initialZoom}
        scrollWheelZoom={false}
        className="map-container"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {locations.map((location) => (
          <Marker
            key={location.id}
            position={[location.latitude, location.longitude]}
            onClick={() => setSelectedPopup(location.id)}
            icon={L.icon({
              iconUrl: `data:image/svg+xml;base64,${btoa(`
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="50" viewBox="0 0 40 50">
                  <path fill="${getCategoryColor(location.category)}" d="M20 0C9 0 0 9 0 20c0 15 20 30 20 30s20-15 20-30c0-11-9-20-20-20z"/>
                  <circle cx="20" cy="20" r="8" fill="white"/>
                </svg>
              `)}`,
              iconSize: [40, 50],
              iconAnchor: [20, 50],
              popupAnchor: [0, -50],
            })}
          >
            {selectedPopup === location.id && (
              <Popup onClose={() => setSelectedPopup(null)}>
                <div className="popup-content">
                  <h3>{location.name}</h3>
                  <p className="description">{location.description}</p>
                  {location.phone && <p>📞 {location.phone}</p>}
                  {location.email && <p>📧 {location.email}</p>}
                  {location.website && (
                    <p>
                      🌐 <a href={location.website} target="_blank" rel="noopener noreferrer">
                        Visitar sitio
                      </a>
                    </p>
                  )}
                </div>
              </Popup>
            )}
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};
```

### Estilos

```css
/* components/Map/styles.css */
.map-wrapper {
  width: 100%;
  height: 600px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.map-container {
  width: 100% !important;
  height: 100% !important;
}

.map-loading {
  width: 100%;
  height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f3f4f6;
  border-radius: 8px;
  font-size: 16px;
  color: #6b7280;
}

.popup-content {
  padding: 8px 0;
}

.popup-content h3 {
  margin: 0 0 8px 0;
  font-size: 16px;
  font-weight: 600;
  color: #111827;
}

.popup-content .description {
  margin: 6px 0;
  color: #4b5563;
  font-size: 14px;
}

.popup-content p {
  margin: 4px 0;
  font-size: 13px;
  color: #374151;
}

.popup-content a {
  color: #3b82f6;
  text-decoration: none;
}

.popup-content a:hover {
  text-decoration: underline;
}
```

---

## ⚙️ INSTALACIÓN COMPLETA PASO A PASO

### 1. Instalar dependencias
```bash
npm install leaflet react-leaflet
npm install -D @types/leaflet
```

### 2. Importar CSS global
```typescript
// main.tsx o index.tsx
import 'leaflet/dist/leaflet.css'
```

### 3. Configurar TypeScript (si es necesario)
```json
// tsconfig.json
{
  "compilerOptions": {
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "types": ["leaflet", "node"]
  }
}
```

### 4. Usar el componente
```tsx
import { MapComponent } from '@/components/Map/MapContainer'

export default function LocationsPage() {
  return (
    <div>
      <h1>Ubicaciones</h1>
      <MapComponent 
        initialZoom={13}
        initialCenter={[18.7405, -70.1617]}
      />
    </div>
  )
}
```

---

## 🔍 CARACTERÍSTICAS ADICIONALES

### Búsqueda de Ubicaciones
```typescript
const [searchTerm, setSearchTerm] = useState('')

const filteredLocations = locations.filter(loc =>
  loc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  loc.description.toLowerCase().includes(searchTerm.toLowerCase())
)
```

### Agrupamiento de Marcadores (Clustering)
```bash
npm install react-leaflet-cluster
```

```typescript
import { MarkerClusterGroup } from '@react-leaflet/cluster'

<MarkerClusterGroup>
  {locations.map(location => (
    <Marker key={location.id} position={[...]} />
  ))}
</MarkerClusterGroup>
```

### Dibujar Polígonos/Áreas
```typescript
import { Polygon } from 'react-leaflet'

<Polygon 
  positions={[[lat1, lon1], [lat2, lon2], ...]}
  pathOptions={{ color: 'blue' }}
/>
```

### Rutas
```typescript
import { Polyline } from 'react-leaflet'

<Polyline 
  positions={routePoints}
  pathOptions={{ color: 'red' }}
/>
```

---

## 📱 RESPONSIVE DESIGN

```typescript
const [windowSize, setWindowSize] = useState({
  width: typeof window !== 'undefined' ? window.innerWidth : 0,
  height: typeof window !== 'undefined' ? window.innerHeight : 0,
})

const mapHeight = windowSize.width < 768 ? 400 : 600

<div style={{ height: `${mapHeight}px` }}>
  <MapContainer ...>
    {/* contenido */}
  </MapContainer>
</div>
```

---

## 🎓 RECURSOS ÚTILES

### Documentación
- **Leaflet**: https://leafletjs.com/
- **React-Leaflet**: https://react-leaflet.js.org/
- **OpenLayers**: https://openlayers.org/
- **MapLibre GL**: https://maplibre.org/

### Ejemplos
- OpenStreetMap Tiles: https://wiki.openstreetmap.org/wiki/Tiles
- Leaflet Plugins: https://leafletjs.com/plugins.html

### Herramientas
- **Obtener coordenadas**: https://www.latlong.net/
- **GeoJSON Creator**: https://geojson.io/
- **Tile Preview**: https://server.arcgisonline.com/

---

## ✅ CHECKLIST FINAL

- [ ] Instalar dependencias (leaflet + react-leaflet)
- [ ] Importar CSS de Leaflet
- [ ] Crear tipos TypeScript
- [ ] Implementar componente base
- [ ] Agregar datos de ubicaciones
- [ ] Probar marcadores
- [ ] Agregar popups
- [ ] Personalizar iconos
- [ ] Hacer responsive
- [ ] Agregar búsqueda (opcional)
- [ ] Agregar clustering (opcional)
- [ ] Optimizar rendimiento

---

## 🤔 PREGUNTAS FRECUENTES

### ¿Puedo usar esto sin pagar nada?
**Sí**, OpenStreetMap y las demás capas mencionadas son completamente gratis sin límite de peticiones.

### ¿Qué pasa si necesito mejor calidad de mapa?
Puedes usar **Stadia Maps** (gratis hasta 600k requests/mes) o **CartoDB** que tiene excelente calidad.

### ¿Cuál es la mejor opción para mi caso?
Para la mayoría de proyectos React: **Leaflet + React-Leaflet**. Es simple, potente y tiene la mejor comunidad.

### ¿Puedo cambiar de capa de mapa fácilmente?
Sí, solo cambia la URL del TileLayer. Todos funcionan igual.

### ¿Hay límite de marcadores?
No hay límite técnico, pero se recomienda usar clustering si tienes +500 marcadores.

---

## 📝 PRÓXIMOS PASOS

1. Elige **Leaflet + React-Leaflet** (recomendado)
2. Instala las dependencias
3. Copia el código del componente
4. Integra tus datos de ubicaciones
5. Personaliza estilos según tu marca
6. Prueba en diferentes dispositivos
7. ¡Desplega y disfruta!

---

**Última actualización:** Noviembre 2025
**Versiones probadas:** 
- react-leaflet: v4.x
- leaflet: v1.9.x
- TypeScript: v5.x
