import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useIsMobile } from "@/hooks/use-mobile";
import { EVENT, RIDE_LINKS } from "@/config/aniversario";

const markerIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export default function MapaEvento() {
  const isMobile = useIsMobile();
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: [EVENT.lat, EVENT.lng],
      zoom: 16,
      scrollWheelZoom: false,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    L.marker([EVENT.lat, EVENT.lng], { icon: markerIcon })
      .addTo(map)
      .bindPopup(`<strong>${EVENT.venue}</strong><br/>${EVENT.address}`)
      .openPopup();

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    <div className="mt-6">
      <div
        ref={mapContainerRef}
        className="relative isolate h-64 w-full overflow-hidden rounded-2xl border border-slate-200 md:h-80"
      />

      {isMobile && (
        <>
          <p className="mt-4 text-sm text-slate-500">
            Peça sua corrida direto para o {EVENT.venue}:
          </p>

          <div className="mt-3 grid grid-cols-3 gap-3">
            <a
              href={RIDE_LINKS.uber}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center rounded-xl border border-slate-200 bg-slate-50 px-2 py-3 text-center text-xs font-bold text-primary"
            >
              Uber
            </a>
            <a
              href={RIDE_LINKS.taxi99}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center rounded-xl border border-slate-200 bg-slate-50 px-2 py-3 text-center text-xs font-bold text-primary"
            >
              99
            </a>
            <a
              href={RIDE_LINKS.taxiRio}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center rounded-xl border border-slate-200 bg-slate-50 px-2 py-3 text-center text-xs font-bold text-primary"
            >
              Taxi.Rio
            </a>
          </div>

          <p className="mt-3 text-xs text-slate-400">
            O Uber já abre com o destino preenchido. No 99 e no Taxi.Rio, cole o
            endereço acima ao pedir a corrida — esses apps não oferecem link direto
            com destino.
          </p>
        </>
      )}
    </div>
  );
}
