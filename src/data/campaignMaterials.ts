export type CampaignMaterialCategory =
  | "Instagram"
  | "Stories"
  | "WhatsApp"
  | "Impressos"
  | "Vídeos"
  | "Documentos"
  | "Marca";

export type CampaignMaterial = {
  id: string;
  category: CampaignMaterialCategory;
  thumbnailAvif: string;
  thumbnailWebp: string;
  thumbnailAlt: string;
  title: string;
  format: string;
  size: string;
  dimensions: string;
  downloadUrl: string;
  date: string | null;
  isFeatured: boolean;
  isApproved: boolean;
};

const thumbnail = (name: string, extension: "avif" | "webp") =>
  `/images/federal/materials/${name}-640x420.${extension}`;

const material = (
  id: string,
  category: CampaignMaterialCategory,
  name: string,
  title: string,
  format: string,
  dimensions: string,
  downloadUrl: string,
  isFeatured = false,
): CampaignMaterial => ({
  id,
  category,
  thumbnailAvif: thumbnail(name, "avif"),
  thumbnailWebp: thumbnail(name, "webp"),
  thumbnailAlt: `Prévia provisória do material ${title}`,
  title,
  format,
  size: "A confirmar",
  dimensions,
  downloadUrl,
  date: null,
  isFeatured,
  isApproved: false,
});

export const campaignMaterials: CampaignMaterial[] = [
  material("kit-completo", "Documentos", "section-10-material-kit-completo", "Kit completo de campanha", "ZIP", "Diversos formatos", "/downloads/kit-completo.zip", true),
  material("instagram-feed", "Instagram", "section-10-material-instagram", "Post para Instagram", "PNG", "1080 × 1080 px", "/downloads/instagram-feed.png"),
  material("instagram-stories", "Stories", "section-10-material-stories", "Story vertical", "PNG", "1080 × 1920 px", "/downloads/instagram-stories.png"),
  material("whatsapp-card", "WhatsApp", "section-10-material-whatsapp", "Card para WhatsApp", "JPG", "1200 × 1200 px", "/downloads/whatsapp-card.jpg"),
  material("impresso-a4", "Impressos", "section-10-material-impressos", "Folheto para impressão", "PDF", "A4", "/downloads/folheto-a4.pdf"),
  material("video-horizontal", "Vídeos", "section-10-material-video", "Vídeo horizontal", "MP4", "1920 × 1080 px", "/downloads/video-horizontal.mp4"),
  material("documento-propostas", "Documentos", "section-10-material-documentos", "Documento de propostas", "PDF", "A4", "/downloads/propostas.pdf"),
  material("marca-oficial", "Marca", "section-10-material-marca", "Arquivos de marca", "ZIP", "Vetorial e raster", "/downloads/marca.zip"),
];
