"use client";

import { useState, useRef, useMemo, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMap, ZoomControl } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const customIcon = L.divIcon({
  className: "bg-transparent",
  html: `
    <div class="relative w-16 h-16 border-2 border-dashed border-emerald-400 rounded-full flex items-center justify-center bg-emerald-500/20 backdrop-blur-[2px] cursor-grab active:cursor-grabbing hover:bg-emerald-500/30 transition-colors">
      <div class="w-4 h-4 bg-emerald-500 rounded-full shadow-[0_0_15px_rgba(16,185,129,1)] animate-ping absolute opacity-75"></div>
      <div class="w-3 h-3 bg-emerald-500 rounded-full absolute shadow-[0_0_10px_rgba(16,185,129,1)]"></div>
      <div class="absolute top-[110%] left-1/2 transform -translate-x-1/2 px-3 py-1.5 bg-slate-900/90 text-white text-[10px] font-bold uppercase tracking-wider rounded-full border border-slate-700 shadow-xl backdrop-blur-md whitespace-nowrap pointer-events-none">
        Trascina
      </div>
    </div>
  `,
  iconSize: [64, 64],
  iconAnchor: [32, 32], 
});

// Componente per muovere la mappa in automatico
function MapController({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, 20, { duration: 1.5 });
  }, [center, map]);
  return null;
}

// NUOVO COMPONENTE: Pulsante "Porta il mirino qui"
function CenterMarkerButton({ onCenter }: { onCenter: (lat: number, lng: number) => void }) {
  const map = useMap();
  
  return (
    // Sfruttiamo le classi native di Leaflet per posizionare il pulsante in alto a destra
    <div className="leaflet-top leaflet-right" style={{ pointerEvents: 'auto', marginTop: '16px', marginRight: '16px' }}>
      <div className="leaflet-control">
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            const currentCenter = map.getCenter(); // Prende il centro visivo attuale della mappa
            onCenter(currentCenter.lat, currentCenter.lng); // Sposta il marker
          }}
          className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 px-4 rounded-xl shadow-xl border border-slate-700 transition-all flex items-center gap-2 text-sm"
        >
          <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Porta il mirino qui
        </button>
      </div>
    </div>
  );
}

export default function InteractiveMap({ searchCoords }: { searchCoords: [number, number] | null }) {
  const [position, setPosition] = useState<[number, number]>([37.5644, 15.0658]);
  const [prevSearch, setPrevSearch] = useState<[number, number] | null>(null);
  
  const markerRef = useRef<L.Marker>(null);

  if (searchCoords !== prevSearch) {
    setPrevSearch(searchCoords);
    if (searchCoords) {
      setPosition(searchCoords);
    }
  }

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          const newPos = marker.getLatLng();
          setPosition([newPos.lat, newPos.lng]);
        }
      },
    }),
    [],
  );

  return (
    <div style={{ width: "100%", height: "100%", position: "relative", zIndex: 10 }}>
      <MapContainer 
        center={position} 
        zoom={20} 
        maxZoom={22} 
        zoomControl={false} // <-- RISOLTO: Questo elimina il doppio zoom in alto a sinistra
        style={{ height: "100%", width: "100%", background: "#0f172a" }}
      >
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          attribution="Tiles &copy; Esri"
          maxNativeZoom={19}
          maxZoom={22}
        />
        
        {/* Manteniamo solo questo zoom in basso a destra */}
        <ZoomControl position="bottomright" />
        
        <MapController center={position} />
        
        {/* Il nostro nuovo pulsante che richiama la funzione setPosition */}
        <CenterMarkerButton onCenter={(lat, lng) => setPosition([lat, lng])} />

        <Marker
          draggable={true}
          eventHandlers={eventHandlers}
          position={position}
          ref={markerRef}
          icon={customIcon}
        />
      </MapContainer>
    </div>
  );
}