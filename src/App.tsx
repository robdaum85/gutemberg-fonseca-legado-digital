import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useParams } from "react-router-dom";
import { lazy, Suspense } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { getPostBySlug, getCategorySlug } from "./lib/blogUtils";
import { ThemeCopaProvider } from "./contexts/ThemeCopaContext";
import ThemeCopaToggle from "./components/ThemeCopaToggle";
import AccessibilityWidget from "./components/AccessibilityWidget";
import CookieConsent from "./components/CookieConsent";

const CategoryPage = lazy(() => import("./pages/CategoryPage"));
const CategoryPostPage = lazy(() => import("./pages/CategoryPostPage"));
const CodigoDeDefesaPage = lazy(() => import("./pages/CodigoDeDefesaPage"));
const SuperendividamentoPage = lazy(() => import("./pages/SuperendividamentoPage"));

const queryClient = new QueryClient();

// Redirects legacy /blog/:slug URLs to the canonical category URL.
const BlogPostRedirect = () => {
  const { slug } = useParams<{ slug: string }>();
  if (!slug) return <Navigate to="/direitos-do-consumidor" replace />;
  const post = getPostBySlug(slug);
  if (!post) return <Navigate to="/direitos-do-consumidor" replace />;
  const categorySlug = getCategorySlug(post.category);
  const target = categorySlug
    ? `/${categorySlug}/${post.slug}`
    : `/direitos-do-consumidor`;
  return <Navigate to={target} replace />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ThemeCopaProvider>
      <Toaster />
      <Sonner />
      <ThemeCopaToggle />
      <AccessibilityWidget />
      <CookieConsent />
      <a href="#conteudo-principal" className="skip-link">
        Ir para o conteudo principal
      </a>
      <div id="site-content">
      <BrowserRouter>
        <Suspense
          fallback={
            <div className="min-h-screen flex items-center justify-center">
              Carregando...
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Index />} />
            {/* Legacy /blog routes redirect to the consolidated hub */}
            <Route path="/blog" element={<Navigate to="/direitos-do-consumidor" replace />} />
            <Route path="/blog/:slug" element={<BlogPostRedirect />} />
            <Route path="/direitos-do-consumidor" element={<CategoryPage />} />
            <Route path="/direitos-do-consumidor/:slug" element={<CategoryPostPage />} />
            <Route path="/codigodedefesa" element={<CodigoDeDefesaPage />} />
            <Route path="/superendividamento" element={<SuperendividamentoPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
      </div>
      </ThemeCopaProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
