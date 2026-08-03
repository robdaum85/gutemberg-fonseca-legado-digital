export const EVENTO_GUTEMBERG = {
  attention: "Inscrições abertas",
  title: "Lançamento da Campanha",
  theme: "Lançamento da Campanha a Deputado Federal",
  name: "Gutemberg Fonseca",
  year: "2026",
  office: "Deputado Federal",
  date: "24/08/2026",
  dateLong: "24 de agosto de 2026",
  weekday: "segunda-feira",
  time: "19h",
  venue: "Espaço Hall",
  address: "Av. Ayrton Senna, 5850 - Gardênia Azul, Rio de Janeiro - RJ, 22775-005",
  slogan: "O Federal do Consumidor",
  lat: -22.9608319,
  lng: -43.3565454,
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent(
      "Espaço Hall, Av. Ayrton Senna, 5850 - Gardênia Azul, Rio de Janeiro - RJ, 22775-005",
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
