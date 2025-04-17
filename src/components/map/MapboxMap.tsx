import { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Loader2 } from 'lucide-react';

interface MapboxMapProps {
  className?: string;
  scenario?: 'normal' | 'heavy';
}

// To use a real Mapbox token, this would come from environment variables in a production app
const MAPBOX_TOKEN = 'pk.eyJ1IjoiZGVtby1mbGVldC1vcHRpbWEiLCJhIjoiY2xtdmRvM3FoMDAwMzJqbXh3OWx1emFpbSJ9.r4_R4Lf0v5kBpQApIa8L5A';

// Mock vehicle data
const vehiclesData = [
  { 
    id: 'V-001',
    type: 'SUV',
    model: 'Toyota Land Cruiser',
    status: 'in transit',
    fuel: 75,
    lat: 25.2048,
    lng: 55.2708,
    driver: 'Mohammed A.',
    route: 'Dubai - Abu Dhabi',
  },
  { 
    id: 'V-002',
    type: 'Sedan',
    model: 'Nissan Altima',
    status: 'idle',
    fuel: 45,
    lat: 25.1950,
    lng: 55.2808,
    driver: 'Ahmed H.',
    route: 'Local',
  },
  { 
    id: 'V-003',
    type: 'Truck',
    model: 'Mitsubishi Fuso',
    status: 'in transit',
    fuel: 60,
    lat: 25.2148,
    lng: 55.2608,
    driver: 'Fahad K.',
    route: 'Dubai - Sharjah',
  },
  { 
    id: 'V-004',
    type: 'SUV',
    model: 'Nissan Patrol',
    status: 'in transit',
    fuel: 82,
    lat: 25.1850,
    lng: 55.2350,
    driver: 'Saeed M.',
    route: 'Dubai - Al Ain',
  },
  { 
    id: 'V-005',
    type: 'Van',
    model: 'Toyota HiAce',
    status: 'maintenance',
    fuel: 30,
    lat: 25.2248,
    lng: 55.3108,
    driver: 'Unassigned',
    route: 'N/A',
  },
];

// Mock routes data - normal traffic
const normalRoutes = [
  {
    name: 'Dubai - Abu Dhabi',
    traffic: 'light',
    color: '#4CAF50', // green
    coordinates: [
      [55.2708, 25.2048], // Dubai
      [55.2000, 25.0000],
      [54.8500, 24.6000],
      [54.3773, 24.4539], // Abu Dhabi
    ]
  },
  {
    name: 'Dubai - Sharjah',
    traffic: 'moderate',
    color: '#FFC107', // yellow
    coordinates: [
      [55.2608, 25.2148], // Starting point
      [55.3000, 25.2500],
      [55.3925, 25.3464], // Sharjah
    ]
  },
  {
    name: 'Dubai - Al Ain',
    traffic: 'light',
    color: '#4CAF50', // green
    coordinates: [
      [55.2350, 25.1850], // Starting point
      [55.5000, 25.0000],
      [55.6000, 24.8000],
      [55.7600, 24.2000], // Al Ain
    ]
  },
];

// Mock routes data - heavy traffic
const heavyTrafficRoutes = [
  {
    name: 'Dubai - Abu Dhabi',
    traffic: 'heavy',
    color: '#F44336', // red
    coordinates: [
      [55.2708, 25.2048], // Dubai
      [55.2000, 25.0000],
      [54.8500, 24.6000],
      [54.3773, 24.4539], // Abu Dhabi
    ]
  },
  {
    name: 'Dubai - Sharjah',
    traffic: 'heavy',
    color: '#F44336', // red
    coordinates: [
      [55.2608, 25.2148], // Starting point
      [55.3000, 25.2500],
      [55.3925, 25.3464], // Sharjah
    ]
  },
  {
    name: 'Dubai - Al Ain',
    traffic: 'moderate',
    color: '#FFC107', // yellow
    coordinates: [
      [55.2350, 25.1850], // Starting point
      [55.5000, 25.0000],
      [55.6000, 24.8000],
      [55.7600, 24.2000], // Al Ain
    ]
  },
];

// Alternate route for AI optimization in heavy traffic
const aiOptimizedRoutes = [
  {
    name: 'Dubai - Abu Dhabi (AI Optimized)',
    traffic: 'moderate',
    color: '#1E88E5', // blue for AI optimized
    coordinates: [
      [55.2708, 25.2048], // Dubai
      [55.2200, 24.9800],
      [55.0000, 24.7500],
      [54.7000, 24.5800],
      [54.3773, 24.4539], // Abu Dhabi
    ]
  },
  {
    name: 'Dubai - Sharjah (AI Optimized)',
    traffic: 'moderate',
    color: '#1E88E5', // blue for AI optimized
    coordinates: [
      [55.2608, 25.2148], // Starting point
      [55.3100, 25.2300],
      [55.3400, 25.2800],
      [55.3925, 25.3464], // Sharjah
    ]
  },
];

export function MapboxMap({ className, scenario = 'normal' }: MapboxMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<mapboxgl.Marker[]>([]);
  const routeLayers = useRef<string[]>([]);
  const [loading, setLoading] = useState(true);

  // Clean up existing markers and routes
  const cleanupMapObjects = () => {
    // Remove existing markers
    markers.current.forEach(marker => marker.remove());
    markers.current = [];

    // Remove existing route layers and sources
    if (map.current) {
      routeLayers.current.forEach(id => {
        if (map.current?.getLayer(id)) {
          map.current.removeLayer(id);
        }
        if (map.current?.getSource(id)) {
          map.current.removeSource(id);
        }
      });
      routeLayers.current = [];
    }
  };

  // Function to add vehicles to map
  const addVehiclesToMap = () => {
    if (!map.current) return;

    vehiclesData.forEach(vehicle => {
      // Create vehicle marker element
      const el = document.createElement('div');
      el.className = 'vehicle-marker';
      el.style.width = '32px';
      el.style.height = '32px';
      el.style.borderRadius = '50%';
      el.style.background = vehicle.status === 'in transit' 
        ? '#4CAF50' 
        : vehicle.status === 'idle' 
        ? '#FFC107' 
        : '#F44336';
      el.style.cursor = 'pointer';
      el.style.border = '3px solid #fff';
      el.style.boxShadow = '0 2px 6px rgba(0,0,0,0.3)';
      el.style.display = 'flex';
      el.style.alignItems = 'center';
      el.style.justifyContent = 'center';
      el.style.fontWeight = 'bold';
      el.style.color = '#fff';
      el.style.fontSize = '10px';
      el.innerText = vehicle.type.charAt(0);
      
      // Create popup with vehicle information
      const popup = new mapboxgl.Popup({ offset: 25, closeButton: true })
        .setHTML(`
          <div class="p-3 min-w-[200px]">
            <h4 class="font-bold text-base">${vehicle.model} (${vehicle.id})</h4>
            <div class="grid grid-cols-2 gap-2 mt-2 text-sm">
              <div>
                <p class="font-medium">Status:</p>
                <p class="capitalize">${vehicle.status}</p>
              </div>
              <div>
                <p class="font-medium">Fuel:</p>
                <p>${vehicle.fuel}%</p>
              </div>
              <div>
                <p class="font-medium">Driver:</p>
                <p>${vehicle.driver}</p>
              </div>
              <div>
                <p class="font-medium">Route:</p>
                <p>${vehicle.route}</p>
              </div>
            </div>
            <button class="mt-3 text-xs bg-awr-primary text-white px-3 py-1 rounded w-full">View Details</button>
          </div>
        `);
      
      // Add marker to map
      const marker = new mapboxgl.Marker(el)
        .setLngLat([vehicle.lng, vehicle.lat])
        .setPopup(popup)
        .addTo(map.current!);
      
      markers.current.push(marker);
    });
  };

  // Function to add routes to map
  const addRoutesToMap = (scenario: 'normal' | 'heavy') => {
    if (!map.current) return;
    
    // Determine which routes to display based on scenario
    let routesToShow = scenario === 'normal' ? normalRoutes : [...heavyTrafficRoutes, ...aiOptimizedRoutes];
    
    // Add routes to the map
    routesToShow.forEach((route, index) => {
      const sourceId = `route-${index}-${scenario}`;
      const layerId = `route-layer-${index}-${scenario}`;
      
      // Add source for route
      map.current!.addSource(sourceId, {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {
            name: route.name,
            traffic: route.traffic
          },
          geometry: {
            type: 'LineString',
            coordinates: route.coordinates
          }
        }
      });
      
      // Add line layer for route
      map.current!.addLayer({
        id: layerId,
        type: 'line',
        source: sourceId,
        layout: {
          'line-join': 'round',
          'line-cap': 'round',
          'line-sort-key': route.name.includes('AI Optimized') ? 10 : 1 // Ensure AI routes are on top
        },
        paint: {
          'line-color': route.color,
          'line-width': route.name.includes('AI Optimized') ? 5 : 4,
          'line-opacity': route.name.includes('AI Optimized') ? 0.9 : 0.7,
          'line-dasharray': route.name.includes('AI Optimized') ? [2, 1] : [1, 0]
        }
      });
      
      // Keep track of layers and sources for later removal
      routeLayers.current.push(sourceId);
      routeLayers.current.push(layerId);
    });
  };

  // Function to update map for selected scenario
  const updateMapForScenario = (newScenario: 'normal' | 'heavy') => {
    cleanupMapObjects();
    addVehiclesToMap();
    addRoutesToMap(newScenario);
    
    // Add the traffic legend
    addTrafficLegend();
  };

  // Add traffic legend to map
  const addTrafficLegend = () => {
    if (!map.current) return;
    
    // Remove existing legend if any
    const existingLegend = document.getElementById('map-legend');
    if (existingLegend) {
      existingLegend.remove();
    }
    
    // Create legend container
    const legend = document.createElement('div');
    legend.id = 'map-legend';
    legend.className = 'map-legend';
    legend.style.position = 'absolute';
    legend.style.bottom = '25px';
    legend.style.right = '10px';
    legend.style.backgroundColor = 'white';
    legend.style.padding = '10px';
    legend.style.borderRadius = '4px';
    legend.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
    legend.style.zIndex = '1';
    legend.style.maxWidth = '200px';
    legend.style.fontSize = '12px';
    
    // Create legend title
    const title = document.createElement('div');
    title.innerHTML = 'Traffic Conditions';
    title.style.fontWeight = 'bold';
    title.style.marginBottom = '8px';
    legend.appendChild(title);
    
    // Legend items
    const items = [
      { color: '#4CAF50', label: 'Light Traffic' },
      { color: '#FFC107', label: 'Moderate Traffic' },
      { color: '#F44336', label: 'Heavy Traffic' },
      { color: '#1E88E5', label: 'AI Optimized Route' }
    ];
    
    // Add legend items
    items.forEach(item => {
      const row = document.createElement('div');
      row.style.display = 'flex';
      row.style.alignItems = 'center';
      row.style.marginBottom = '5px';
      
      const colorBox = document.createElement('div');
      colorBox.style.width = '12px';
      colorBox.style.height = '3px';
      colorBox.style.backgroundColor = item.color;
      colorBox.style.marginRight = '8px';
      
      const label = document.createElement('span');
      label.textContent = item.label;
      
      row.appendChild(colorBox);
      row.appendChild(label);
      legend.appendChild(row);
    });
    
    // Add vehicle status markers
    const vehicleTitle = document.createElement('div');
    vehicleTitle.innerHTML = 'Vehicle Status';
    vehicleTitle.style.fontWeight = 'bold';
    vehicleTitle.style.marginTop = '10px';
    vehicleTitle.style.marginBottom = '8px';
    legend.appendChild(vehicleTitle);
    
    const vehicleItems = [
      { color: '#4CAF50', label: 'In Transit' },
      { color: '#FFC107', label: 'Idle' },
      { color: '#F44336', label: 'Maintenance' }
    ];
    
    vehicleItems.forEach(item => {
      const row = document.createElement('div');
      row.style.display = 'flex';
      row.style.alignItems = 'center';
      row.style.marginBottom = '5px';
      
      const marker = document.createElement('div');
      marker.style.width = '10px';
      marker.style.height = '10px';
      marker.style.borderRadius = '50%';
      marker.style.backgroundColor = item.color;
      marker.style.marginRight = '8px';
      
      const label = document.createElement('span');
      label.textContent = item.label;
      
      row.appendChild(marker);
      row.appendChild(label);
      legend.appendChild(row);
    });
    
    // Add legend to map container
    mapContainer.current?.appendChild(legend);
  };

  useEffect(() => {
    if (!mapContainer.current || map.current) return;
    
    // Initialize map
    mapboxgl.accessToken = MAPBOX_TOKEN;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11', // Light style for better visibility of routes
      center: [55.2708, 25.2048], // Dubai coordinates
      zoom: 10,
      minZoom: 8,
      maxZoom: 18
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

      // Add vehicles and routes
      updateMapForScenario('normal');

      // Add points of interest for UAE context
      addPointsOfInterest();
    });
    
    return () => {
      cleanupMapObjects();
      map.current?.remove();
      map.current = null;
    };
  }, []);

  // Update map when scenario changes
  useEffect(() => {
    if (map.current && !loading) {
      updateMapForScenario(scenario);
    }
  }, [scenario, loading]);

  // Add major UAE landmarks for context
  const addPointsOfInterest = () => {
    if (!map.current) return;
    
    const pois = [
      { name: 'Burj Khalifa', lat: 25.197197, lng: 55.274376 },
      { name: 'Dubai Mall', lat: 25.198765, lng: 55.279503 },
      { name: 'Dubai International Airport', lat: 25.248665, lng: 55.352917 },
      { name: 'Sheikh Zayed Grand Mosque', lat: 24.412346, lng: 54.475308 }
    ];
    
    pois.forEach(poi => {
      // Create POI marker element
      const el = document.createElement('div');
      el.className = 'poi-marker';
      el.style.width = '10px';
      el.style.height = '10px';
      el.style.borderRadius = '50%';
      el.style.background = '#555';
      el.style.border = '2px solid #fff';
      
      // Create popup
      const popup = new mapboxgl.Popup({ offset: 15, closeButton: false })
        .setHTML(`<div class="p-1 text-xs font-medium">${poi.name}</div>`);
      
      // Add marker to map
      const marker = new mapboxgl.Marker(el)
        .setLngLat([poi.lng, poi.lat])
        .setPopup(popup)
        .addTo(map.current!);
      
      markers.current.push(marker);
    });
  };

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
        <p className="text-xs text-muted-foreground mt-1">
          {scenario === 'normal' 
            ? '13% fuel savings vs. competitors' 
            : '19% fuel savings with AI optimization'}
        </p>
      </div>
    </div>
  );
}
