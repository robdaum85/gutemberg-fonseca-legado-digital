export const EVENTO_GUTEMBERG = {
  title: "Lançamento pré-campanha",
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
  navy: "#002B5B",
  blue: "#052d63",
  green: "#016C28",
  darkGreen: "#064d28",
  yellow: "#F1DA67",
  white: "#ffffff",
  lightGray: "#f4f4f5",
};

export const EVENTO_RIDE_LINKS = {
  uber: `https://m.uber.com/ul/?action=setPickup&dropoff[latitude]=${EVENTO_GUTEMBERG.lat}&dropoff[longitude]=${EVENTO_GUTEMBERG.lng}&dropoff[nickname]=${encodeURIComponent(EVENTO_GUTEMBERG.venue)}`,
  taxi99: "https://99app.com/",
  taxiRio: "https://taxi.rio/aplicativo/",
};
