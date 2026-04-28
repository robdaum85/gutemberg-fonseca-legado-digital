import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Lazy loading das páginas
const BlogPage = lazy(() => import("./pages/BlogPage"));
const CategoryPage = lazy(() => import("./pages/CategoryPage"));
const CategoryPostPage = lazy(() => import("./pages/CategoryPostPage"));

const queryClient = new QueryClient();

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

            {/* REDIRECT DO BLOG PARA NOVA ESTRUTURA */}
            <Route
              path="/blog"
              element={<Navigate to="/direitos-do-consumidor" replace />}
            />

            {/* POSTS ANTIGOS DO BLOG (mantém compatibilidade) */}
            <Route path="/blog/:slug" element={<CategoryPostPage />} />

            {/* NOVA ESTRUTURA SEO */}
            <Route
              path="/direitos-do-consumidor"
              element={<CategoryPage />}
            />
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