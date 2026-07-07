// Coordenadas confirmadas via geocodificação (OpenStreetMap/Nominatim) do endereço do Espaço Hall.
const VENUE_LAT = -22.9608319;
const VENUE_LNG = -43.3565454;

export const EVENT = {
  title: "Aniversário do Gutemberg Fonseca",
  dateLabel: "09 de Julho",
  timeLabel: "19h",
  venue: "Espaço Hall",
  address: "Av. Ayrton Senna, 5850 - Gardênia Azul, Rio de Janeiro - RJ, 22775-005",
  lat: VENUE_LAT,
  lng: VENUE_LNG,
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent(
      "Av. Ayrton Senna, 5850 - Gardênia Azul, Rio de Janeiro - RJ, 22775-005",
    ),
};

// Uber documenta oficialmente este formato de deep link para abrir uma corrida com
// destino pré-preenchido (developer.uber.com/docs/riders/ride-requests/tutorials/deep-links).
// 99 e Taxi.Rio não publicam um esquema de deep link equivalente para pré-preencher
// destino, então os links abaixo abrem o app/site oficial e o endereço fica visível
// na página para o usuário colar/selecionar manualmente.
export const RIDE_LINKS = {
  uber: `https://m.uber.com/ul/?action=setPickup&dropoff[latitude]=${VENUE_LAT}&dropoff[longitude]=${VENUE_LNG}&dropoff[nickname]=${encodeURIComponent(EVENT.venue)}`,
  taxi99: "https://99app.com/",
  taxiRio: "https://taxi.rio/aplicativo/",
};

// Lista FAKE para testes. Substituir pelos códigos reais das lideranças antes de publicar.
export const LIDERANCA_COUPONS: Record<string, string> = {
  "LID-JOAO01": "João Mendes",
  "LID-MARIA02": "Maria Aparecida",
  "LID-CARLOS03": "Carlos Eduardo",
  "LID-ANA04": "Ana Paula Ribeiro",
  "LID-ROBERTO05": "Roberto Lima",
  "LID-FERNANDA06": "Fernanda Costa",
};

export function findLideranca(code: string): string | null {
  const normalized = code.trim().toUpperCase();
  if (!normalized) return null;
  return LIDERANCA_COUPONS[normalized] ?? null;
}
