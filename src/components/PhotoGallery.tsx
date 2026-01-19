import { useState } from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { X, ChevronLeft, ChevronRight, Camera, Users, Bus, Building2, Shield } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface Photo {
  id: number;
  src: string;
  alt: string;
  category: string;
  caption: string;
}

const photos: Photo[] = [
  {
    id: 1,
    src: "/lovable-uploads/424487f0-dee5-4f8e-bdab-8e3e234b08c7.png",
    alt: "Gutemberg Fonseca em ação",
    category: "Eventos",
    caption: "Secretário Gutemberg Fonseca durante evento oficial"
  },
  {
    id: 2,
    src: "/lovable-uploads/5118e141-56bb-4600-b3bb-86aec0a70a56.png",
    alt: "Atendimento ao consumidor",
    category: "Atendimento",
    caption: "Atendimento especializado ao consumidor"
  },
  {
    id: 3,
    src: "/lovable-uploads/a097c447-657b-430a-8653-0e7ce0db1524.png",
    alt: "Equipe SEDCON",
    category: "Equipe",
    caption: "Equipe da SEDCON em ação"
  },
  {
    id: 4,
    src: "/lovable-uploads/c003fb8b-1544-42bc-881b-af1b83f1ac15.png",
    alt: "Ação de fiscalização",
    category: "Fiscalização",
    caption: "Operação de fiscalização em andamento"
  }
];

const categories = [
  { id: 'all', label: 'Todas', icon: Camera },
  { id: 'Eventos', label: 'Eventos', icon: Users },
  { id: 'Atendimento', label: 'Atendimento', icon: Bus },
  { id: 'Equipe', label: 'Equipe', icon: Building2 },
  { id: 'Fiscalização', label: 'Fiscalização', icon: Shield }
];

const PhotoGallery = () => {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.1 });
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  const filteredPhotos = selectedCategory === 'all' 
    ? photos 
    : photos.filter(photo => photo.category === selectedCategory);

  const openLightbox = (index: number) => {
    setCurrentPhotoIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const goToPrevious = () => {
    setCurrentPhotoIndex((prev) => 
      prev === 0 ? filteredPhotos.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setCurrentPhotoIndex((prev) => 
      prev === filteredPhotos.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <section id="galeria" className="py-20 bg-background">
      <div className="section-container">
        <h2 className="section-title">Galeria de Fotos</h2>
        <p className="text-center text-muted-foreground max-w-3xl mx-auto mb-8">
          Registros das ações, eventos e operações realizadas pela SEDCON e PROCON-RJ em todo o estado.
        </p>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === cat.id
                  ? 'bg-gradient-primary text-primary-foreground shadow-lg'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              <cat.icon className="w-4 h-4" />
              {cat.label}
            </button>
          ))}
        </div>

        {/* Carousel for Mobile */}
        <div className="block md:hidden" ref={ref as React.RefObject<HTMLDivElement>}>
          <Carousel className="w-full">
            <CarouselContent>
              {filteredPhotos.map((photo, index) => (
                <CarouselItem key={photo.id}>
                  <div 
                    className={`relative overflow-hidden rounded-xl cursor-pointer transition-all duration-700 ${
                      isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
                    onClick={() => openLightbox(index)}
                  >
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                      <span className="text-xs text-secondary font-medium uppercase tracking-wider">
                        {photo.category}
                      </span>
                      <p className="text-white text-sm mt-1">{photo.caption}</p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>
        </div>

        {/* Grid for Desktop */}
        <div 
          className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-4"
          ref={ref as React.RefObject<HTMLDivElement>}
        >
          {filteredPhotos.map((photo, index) => (
            <div
              key={photo.id}
              className={`group relative overflow-hidden rounded-xl cursor-pointer transition-all duration-700 ${
                isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
              onClick={() => openLightbox(index)}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-48 lg:h-56 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <span className="text-xs text-secondary font-medium uppercase tracking-wider">
                  {photo.category}
                </span>
                <p className="text-white text-sm mt-1">{photo.caption}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {lightboxOpen && (
          <div 
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 p-2 text-white hover:text-secondary transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
            
            <button
              onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
              className="absolute left-4 p-2 text-white hover:text-secondary transition-colors"
            >
              <ChevronLeft className="w-10 h-10" />
            </button>

            <div className="max-w-4xl max-h-[80vh] flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
              <img
                src={filteredPhotos[currentPhotoIndex]?.src}
                alt={filteredPhotos[currentPhotoIndex]?.alt}
                className="max-w-full max-h-[70vh] object-contain rounded-lg"
              />
              <div className="mt-4 text-center">
                <span className="text-secondary text-sm font-medium uppercase tracking-wider">
                  {filteredPhotos[currentPhotoIndex]?.category}
                </span>
                <p className="text-white text-lg mt-1">
                  {filteredPhotos[currentPhotoIndex]?.caption}
                </p>
                <p className="text-muted-foreground text-sm mt-2">
                  {currentPhotoIndex + 1} / {filteredPhotos.length}
                </p>
              </div>
            </div>

            <button
              onClick={(e) => { e.stopPropagation(); goToNext(); }}
              className="absolute right-4 p-2 text-white hover:text-secondary transition-colors"
            >
              <ChevronRight className="w-10 h-10" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default PhotoGallery;
