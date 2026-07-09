import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './styles/accessibility.css'

// Desregistra qualquer service worker antigo e limpa caches para evitar
// que versões antigas do app sejam servidas (preview e produção).
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.getRegistrations().then((regs) => {
    regs.forEach((r) => r.unregister());
  });
  if ("caches" in window) {
    caches.keys().then((keys) => keys.forEach((k) => caches.delete(k)));
  }
}

createRoot(document.getElementById("root")!).render(<App />);
