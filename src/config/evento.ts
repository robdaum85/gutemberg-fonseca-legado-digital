export const EVENTO_GUTEMBERG = {
  title: "Lancamento pre-campanha",
  office: "Deputado Federal",
  name: "Gutemberg Fonseca",
  year: "2026",
  date: "27/07",
  time: "19h",
  venue: "Espaco Hall",
  address: "Av. Ayrton Senna, 5850 - Gardenia Azul, Rio de Janeiro - RJ",
  lat: -22.9608319,
  lng: -43.3565454,
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent(
      "Av. Ayrton Senna, 5850 - Gardenia Azul, Rio de Janeiro - RJ",
    ),
};

export const EVENTO_COLORS = {
  navy: "#041f46",
  blue: "#052d63",
  green: "#0fa13a",
  darkGreen: "#064d28",
  yellow: "#f4d000",
  white: "#ffffff",
  lightGray: "#f4f4f5",
};

export const EVENTO_RIDE_LINKS = {
  uber: `https://m.uber.com/ul/?action=setPickup&dropoff[latitude]=${EVENTO_GUTEMBERG.lat}&dropoff[longitude]=${EVENTO_GUTEMBERG.lng}&dropoff[nickname]=${encodeURIComponent(EVENTO_GUTEMBERG.venue)}`,
  taxi99: "https://99app.com/",
  taxiRio: "https://taxi.rio/aplicativo/",
};
