
import { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Loader2 } from 'lucide-react';

interface MapboxMapProps {
  className?: string;
}

// To use a real Mapbox token, this would come from environment variables in a production app
const MAPBOX_TOKEN = 'pk.eyJ1IjoiZGVtby1mbGVldC1vcHRpbWEiLCJhIjoiY2xtdmRvM3FoMDAwMzJqbXh3OWx1emFpbSJ9.r4_R4Lf0v5kBpQApIa8L5A';

export function MapboxMap({ className }: MapboxMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!mapContainer.current) return;
    
    // Initialize map
    mapboxgl.accessToken = MAPBOX_TOKEN;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [55.2708, 25.2048], // Dubai coordinates
      zoom: 10
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
      }),
      'top-right'
    );

    // Add scale control
    map.current.addControl(
      new mapboxgl.ScaleControl()
    );

    map.current.on('load', () => {
      setLoading(false);
      
      if (!map.current) return;

      // Add sample vehicles (would come from real-time data in production)
      const vehicles = [
        { id: 'v1', type: 'SUV', status: 'in transit', lat: 25.2048, lng: 55.2708 },
        { id: 'v2', type: 'Van', status: 'idle', lat: 25.1950, lng: 55.2808 },
        { id: 'v3', type: 'Truck', status: 'in transit', lat: 25.2148, lng: 55.2608 },
      ];
      
      vehicles.forEach(vehicle => {
        // Create a DOM element for the marker
        const el = document.createElement('div');
        el.className = 'vehicle-marker';
        el.style.width = '24px';
        el.style.height = '24px';
        el.style.borderRadius = '50%';
        el.style.background = vehicle.status === 'in transit' ? '#4CAF50' : '#FFC107';
        el.style.cursor = 'pointer';
        el.style.border = '2px solid #fff';
        el.style.boxShadow = '0 2px 4px rgba(0,0,0,0.3)';
        
        // Add a popup
        const popup = new mapboxgl.Popup({ offset: 25 })
          .setHTML(`
            <div class="p-2">
              <h4 class="font-bold">${vehicle.type} (${vehicle.id})</h4>
              <p>Status: ${vehicle.status}</p>
              <p class="text-xs mt-1">Click for details</p>
            </div>
          `);
        
        // Add marker to map
        new mapboxgl.Marker(el)
          .setLngLat([vehicle.lng, vehicle.lat])
          .setPopup(popup)
          .addTo(map.current!);
      });

      // Add a simple optimized route (would be calculated in production)
      map.current.addSource('route', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: [
              [55.2708, 25.2048],
              [55.3052, 25.2285],
              [55.3310, 25.1836],
              [55.2708, 25.1972],
              [55.2708, 25.2048],
            ]
          }
        }
      });
      
      map.current.addLayer({
        id: 'route',
        type: 'line',
        source: 'route',
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': '#1E88E5',
          'line-width': 4,
          'line-opacity': 0.8
        }
      });
    });
    
    return () => {
      map.current?.remove();
    };
  }, []);

  return (
    <div className={`relative h-[70vh] rounded-lg overflow-hidden border ${className}`}>
      {loading && (
        <div className="absolute inset-0 bg-background/50 flex items-center justify-center z-10">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-8 w-8 animate-spin text-awr-primary" />
            <p className="text-sm text-muted-foreground">Loading map data...</p>
          </div>
        </div>
      )}
      <div ref={mapContainer} className="absolute inset-0" />
      
      {/* Map overlay badge */}
      <div className="absolute top-4 left-4 z-20 bg-white/90 rounded-lg shadow-lg p-3">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-awr-primary animate-pulse-soft"></div>
          <span className="text-sm font-medium">Route Optimization</span>
        </div>
        <p className="text-xs text-muted-foreground mt-1">13% fuel savings vs. competitors</p>
      </div>
    </div>
  );
}
