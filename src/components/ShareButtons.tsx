import { useState } from 'react';
import { Facebook, Twitter, Copy, Check, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

interface ShareButtonsProps {
  title: string;
  url: string;
  fixed?: boolean;
}

const ShareButtons = ({ title, url, fixed = false }: ShareButtonsProps) => {
  const [copied, setCopied] = useState(false);

  const shareUrl = encodeURIComponent(url);
  const shareTitle = encodeURIComponent(title);

  const whatsappUrl = `https://wa.me/?text=${shareTitle}%20${shareUrl}`;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${shareTitle}&url=${shareUrl}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
      const input = document.createElement('input');
      input.value = url;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const buttons = (
    <div className="flex items-center gap-2 flex-wrap">
      <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
        <Button variant="outline" size="sm" className="gap-2 text-foreground hover:bg-accent">
          <MessageCircle className="h-4 w-4 text-green-600" />
          <span className="hidden sm:inline">WhatsApp</span>
        </Button>
      </a>
      <a href={facebookUrl} target="_blank" rel="noopener noreferrer">
        <Button variant="outline" size="sm" className="gap-2 text-foreground hover:bg-accent">
          <Facebook className="h-4 w-4 text-blue-600" />
          <span className="hidden sm:inline">Facebook</span>
        </Button>
      </a>
      <a href={twitterUrl} target="_blank" rel="noopener noreferrer">
        <Button variant="outline" size="sm" className="gap-2 text-foreground hover:bg-accent">
          <Twitter className="h-4 w-4" />
          <span className="hidden sm:inline">X</span>
        </Button>
      </a>
      <Button variant="outline" size="sm" className="gap-2 text-foreground hover:bg-accent" onClick={handleCopy}>
        {copied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
        <span>{copied ? 'Link copiado!' : 'Copiar link'}</span>
      </Button>
    </div>
  );

  return buttons;
};

export const MobileFixedShare = ({ title, url }: { title: string; url: string }) => {
  const isMobile = useIsMobile();
  if (!isMobile) return null;

  const shareUrl = encodeURIComponent(url);
  const shareTitle = encodeURIComponent(title);
  const whatsappUrl = `https://wa.me/?text=${shareTitle}%20${shareUrl}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 left-4 right-4 z-[60] flex items-center justify-center gap-2 bg-green-600 text-white py-3 px-4 rounded-xl shadow-lg font-semibold text-sm hover:bg-green-700 transition-colors"
    >
      <MessageCircle className="h-5 w-5" />
      Compartilhar no WhatsApp
    </a>
  );
};

export default ShareButtons;
