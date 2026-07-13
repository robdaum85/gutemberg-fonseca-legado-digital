export const EVENTO_GUTEMBERG = {
  attention: "Atenção, lideranças e coordenadores!",
  title: "Palestra de Comunicação",
  theme: "Comunicação eficaz para a pré-campanha e foto oficial",
  name: "Gutemberg Fonseca",
  year: "2026",
  date: "13/07/2026",
  weekday: "segunda-feira",
  time: "16h30",
  venue: "Windsor Barra Hotel",
  address: "Av. Lúcio Costa, 2630 - Barra da Tijuca, Rio de Janeiro - RJ",
  slogan: "Juntos somos mais fortes",
  lat: -23.0114386,
  lng: -43.3217887,
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent(
      "Windsor Barra Hotel, Av. Lúcio Costa, 2630 - Barra da Tijuca, Rio de Janeiro - RJ",
    ),
};

export const EVENTO_COLORS = {
  backgroundLight: "#EFF1F6",
  navy: "#023578",
  navyDark: "#050F23",
  blue: "#254E78",
  gold: "#F2D697",
  green: "#016C28",
  darkGreen: "#064d28",
  yellow: "#F2D697",
  white: "#ffffff",
  lightGray: "#EFF1F6",
};

export const EVENTO_RIDE_LINKS = {
  uber: `https://m.uber.com/ul/?action=setPickup&dropoff[latitude]=${EVENTO_GUTEMBERG.lat}&dropoff[longitude]=${EVENTO_GUTEMBERG.lng}&dropoff[nickname]=${encodeURIComponent(EVENTO_GUTEMBERG.venue)}`,
  taxi99: "https://99app.com/",
  taxiRio: "https://taxi.rio/aplicativo/",
};
