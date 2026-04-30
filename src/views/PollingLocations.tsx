import { useState, useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { MapPin, Search, Navigation, Info, Clock, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function PollingLocations() {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [loading, setLoading] = useState(true);
  const mapRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [locations, setLocations] = useState<any[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<any | null>(null);

  useEffect(() => {
    const loader = new Loader({
      apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
      version: 'weekly',
    });

    loader.load().then(() => {
      if (mapRef.current) {
        const initialMap = new google.maps.Map(mapRef.current, {
          center: { lat: 38.8977, lng: -77.0365 }, // DC Default
          zoom: 12,
          mapId: 'DEMOCRACY_ASSIST_MAP',
          styles: [
            {
              "featureType": "all",
              "elementType": "labels.text.fill",
              "stylers": [{ "color": "#000000" }]
            },
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [{ "color": "#e9e9e9" }, { "visibility": "on" }]
            }
          ]
        });
        setMap(initialMap);
        setLoading(false);
        
        // Mock locations for demo (would be real API in production)
        const mockLocs = [
          { 
            id: 1, 
            name: "Central Library Voting Center", 
            address: "901 G St. NW, Washington, DC 20001",
            lat: 38.8995, 
            lng: -77.0241,
            hours: "7:00 AM - 8:00 PM",
            phone: "(202) 727-0321",
            type: "Early Voting & Election Day"
          },
          { 
            id: 2, 
            name: "Columbia Heights Community Center", 
            address: "1480 Girard St. NW, Washington, DC 20009",
            lat: 38.9255, 
            lng: -77.0335,
            hours: "7:00 AM - 8:00 PM",
            phone: "(202) 671-0373",
            type: "Election Day Only"
          }
        ];
        setLocations(mockLocs);

        mockLocs.forEach(loc => {
          const marker = new google.maps.Marker({
            position: { lat: loc.lat, lng: loc.lng },
            map: initialMap,
            title: loc.name,
            icon: {
              path: google.maps.SymbolPath.CIRCLE,
              scale: 10,
              fillColor: "#000",
              fillOpacity: 1,
              strokeWeight: 2,
              strokeColor: "#FFF"
            }
          });

          marker.addListener('click', () => {
            setSelectedLocation(loc);
            initialMap.panTo({ lat: loc.lat, lng: loc.lng });
          });
        });
      }
    });
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In real app, use Geocoding API here
    console.log("Searching for:", searchQuery);
  };

  return (
    <div className="w-full flex flex-col gap-8 h-full overflow-hidden">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div>
          <h1 className="text-4xl font-black italic tracking-tighter">Locate Your Polling Station</h1>
          <p className="text-on-surface-variant font-medium mt-1">Found 4 centers near your election district.</p>
        </div>
        
        <form onSubmit={handleSearch} className="relative w-full sm:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input 
            type="text" 
            placeholder="Enter zip code or address..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border-2 border-black rounded-2xl pl-12 pr-4 py-3 font-bold text-sm focus:ring-0 shadow-bento"
          />
        </form>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row gap-8 min-h-0 overflow-hidden">
        {/* Map Container */}
        <div className="flex-1 bento-card-lg bg-slate-100 overflow-hidden relative min-h-[300px]">
          {loading && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-slate-50/50 backdrop-blur-sm">
              <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
                <p className="text-xs font-black uppercase tracking-widest">Loading Maps...</p>
              </div>
            </div>
          )}
          <div ref={mapRef} className="w-full h-full" />
        </div>

        {/* Sidebar Info */}
        <div className="w-full lg:w-96 flex flex-col gap-4 overflow-y-auto no-scrollbar pb-8 lg:pb-0">
          <AnimatePresence mode="wait">
            {selectedLocation ? (
              <motion.div 
                key="selected"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bento-card bg-accent-yellow p-6 border-b-8"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center shadow-bento shrink-0">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <button 
                    onClick={() => setSelectedLocation(null)}
                    className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-black"
                  >
                    Close
                  </button>
                </div>
                <h3 className="text-2xl font-black italic mb-2">{selectedLocation.name}</h3>
                <p className="text-sm font-bold mb-6 text-slate-700">{selectedLocation.address}</p>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-sm font-bold">
                    <Clock className="w-5 h-5 text-black" />
                    <span>{selectedLocation.hours}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm font-bold">
                    <Phone className="w-5 h-5 text-black" />
                    <span>{selectedLocation.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm font-bold">
                    <Info className="w-5 h-5 text-black" />
                    <span className="text-accent-blue font-black uppercase text-[10px] tracking-widest bg-white/50 px-2 py-1 rounded-lg border border-black/10">
                      {selectedLocation.type}
                    </span>
                  </div>
                </div>

                <button className="w-full bento-button mt-8 flex items-center justify-center gap-3">
                  <Navigation className="w-5 h-5" /> Get Directions
                </button>
              </motion.div>
            ) : (
              <div className="flex flex-col gap-4">
                <p className="text-xs font-black uppercase tracking-widest text-slate-400 px-2">Nearby Centers</p>
                {locations.map(loc => (
                  <button 
                    key={loc.id}
                    onClick={() => {
                      setSelectedLocation(loc);
                      map?.panTo({ lat: loc.lat, lng: loc.lng });
                      map?.setZoom(15);
                    }}
                    className={`bento-card p-5 text-left transition-all ${selectedLocation?.id === loc.id ? 'bg-accent-yellow' : 'bg-white hover:bg-slate-50'}`}
                  >
                    <h4 className="font-black italic text-lg mb-1">{loc.name}</h4>
                    <p className="text-xs font-bold text-slate-500 line-clamp-1">{loc.address}</p>
                  </button>
                ))}
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
