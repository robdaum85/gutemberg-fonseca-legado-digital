import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const CategoryPage = lazy(() => import("./pages/CategoryPage"));
const CategoryPostPage = lazy(() => import("./pages/CategoryPostPage"));

const queryClient = new QueryClient();

const ExternalRedirect = ({ to }: { to: string }) => {
  useEffect(() => {
    window.location.replace(to);
  }, [to]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      Redirecionando...
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />

      <BrowserRouter>
        <Suspense
          fallback={
            <div className="min-h-screen flex items-center justify-center">
              Carregando...
            </div>
          }
        >
          <Routes>
            {/* HOME */}
            <Route path="/" element={<Index />} />

            {/* LANDING PAGES EXTERNAS */}
            <Route
              path="/motociclistas"
              element={<ExternalRedirect to="https://motos-livres.vercel.app/" />}
            />
            <Route
              path="/seguranca"
              element={<ExternalRedirect to="https://foco-democr.vercel.app/" />}
            />
            <Route
              path="/catadoresdelixo"
              element={<ExternalRedirect to="https://lp-lixo.vercel.app/" />}
            />

            {/* REDIRECT DO BLOG */}
            <Route
              path="/blog"
              element={<Navigate to="/direitos-do-consumidor" replace />}
            />

            {/* POSTS ANTIGOS DO BLOG */}
            <Route path="/blog/:slug" element={<CategoryPostPage />} />

            {/* NOVA ESTRUTURA SEO */}
            <Route path="/direitos-do-consumidor" element={<CategoryPage />} />
            <Route
              path="/direitos-do-consumidor/:slug"
              element={<CategoryPostPage />}
            />

            {/* FALLBACK */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;