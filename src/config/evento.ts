export const EVENTO_GUTEMBERG = {
  attention: "Inscrições abertas",
  title: "Grande Evento São Gonçalo",
  theme: "Grande Evento São Gonçalo - Luiz Social",
  name: "Gutemberg Fonseca",
  year: "2026",
  date: "17/07/2026",
  weekday: "sexta-feira",
  time: "20h",
  venue: "Luiz Social",
  address: "Av. Humberto de Alencar Castelo Branco, 2820 - Rocha, São Gonçalo - RJ",
  slogan: "Juntos somos mais fortes",
  lat: -22.8269,
  lng: -43.0634,
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent(
      "Luiz Social, Av. Humberto de Alencar Castelo Branco, 2820 - Rocha, São Gonçalo - RJ",
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
