import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapPin } from "lucide-react";
import { EVENTO_COLORS, EVENTO_GUTEMBERG, EVENTO_RIDE_LINKS } from "@/config/evento";
import { useIsMobile } from "@/hooks/use-mobile";

const markerIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export default function EventoMapa() {
  const isMobile = useIsMobile();
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: [EVENTO_GUTEMBERG.lat, EVENTO_GUTEMBERG.lng],
      zoom: 16,
      scrollWheelZoom: false,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    L.marker([EVENTO_GUTEMBERG.lat, EVENTO_GUTEMBERG.lng], { icon: markerIcon })
      .addTo(map)
      .bindPopup(`<strong>${EVENTO_GUTEMBERG.venue}</strong><br/>${EVENTO_GUTEMBERG.address}`)
      .openPopup();

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    <section className="border-t border-zinc-200 bg-white py-10">
      <div className="mx-auto max-w-6xl px-5">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.16em]" style={{ color: EVENTO_COLORS.green }}>
              Local do evento
            </p>
            <h2 className="mt-1 text-2xl font-black" style={{ color: EVENTO_COLORS.navy }}>
              {EVENTO_GUTEMBERG.venue}
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-zinc-600">{EVENTO_GUTEMBERG.address}</p>
          </div>
          <a
            href={EVENTO_GUTEMBERG.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-bold text-white"
            style={{ backgroundColor: EVENTO_COLORS.green }}
          >
            <MapPin className="h-4 w-4" />
            Abrir rota
          </a>
        </div>

        <div
          ref={mapContainerRef}
          className="relative isolate h-72 w-full overflow-hidden rounded-lg border border-zinc-200 md:h-96"
        />

        {isMobile && (
          <div className="mt-4 grid grid-cols-3 gap-3">
            <a href={EVENTO_RIDE_LINKS.uber} target="_blank" rel="noopener noreferrer" className="rounded-md border border-zinc-200 bg-zinc-50 px-2 py-3 text-center text-xs font-black" style={{ color: EVENTO_COLORS.navy }}>
              Uber
            </a>
            <a href={EVENTO_RIDE_LINKS.taxi99} target="_blank" rel="noopener noreferrer" className="rounded-md border border-zinc-200 bg-zinc-50 px-2 py-3 text-center text-xs font-black" style={{ color: EVENTO_COLORS.navy }}>
              99
            </a>
            <a href={EVENTO_RIDE_LINKS.taxiRio} target="_blank" rel="noopener noreferrer" className="rounded-md border border-zinc-200 bg-zinc-50 px-2 py-3 text-center text-xs font-black" style={{ color: EVENTO_COLORS.navy }}>
              Taxi.Rio
            </a>
          </div>
        )}
      </div>
    </section>
  );
}

