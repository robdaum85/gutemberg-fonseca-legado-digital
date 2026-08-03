import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useParams,
} from "react-router-dom";
import { lazy, Suspense } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { getPostBySlug, getCategorySlug } from "./lib/blogUtils";
import AccessibilityWidget from "./components/AccessibilityWidget";
import CookieConsent from "./components/CookieConsent";

const CategoryPage = lazy(() => import("./pages/CategoryPage"));
const CategoryPostPage = lazy(() => import("./pages/CategoryPostPage"));
const CodigoDeDefesaPage = lazy(() => import("./pages/CodigoDeDefesaPage"));
const SuperendividamentoPage = lazy(
  () => import("./pages/SuperendividamentoPage"),
);
const CatadoresDeLixoPage = lazy(() => import("./pages/CatadoresDeLixoPage"));
const MotociclistasPage = lazy(() => import("./pages/MotociclistasPage"));
const SegurancaPage = lazy(() => import("./pages/SegurancaPage"));
const AniversarioPage = lazy(() => import("./pages/AniversarioPage"));
const EventoPage = lazy(() => import("./pages/EventoPage"));
const EventoSucessoPage = lazy(() => import("./pages/EventoSucessoPage"));
const EventoCheckinPage = lazy(() => import("./pages/EventoCheckinPage"));
const EventoDashboardPage = lazy(() => import("./pages/EventoDashboardPage"));
const ApresentacaoFederalPage = lazy(
  () => import("./pages/ApresentacaoFederalPage"),
);

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

const App = () => {
  const normalizedPath = window.location.pathname.replace(/\/+$/, "") || "/";
  const isFederalPresentation = normalizedPath === "/apresentacao-federal";
  const isCheckinOperation = normalizedPath === "/evento/checkin";
  const hidesGlobalOverlays = isFederalPresentation || isCheckinOperation;
  const hidesAccessibility = isCheckinOperation;

  return (
    <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      {!hidesAccessibility && <AccessibilityWidget />}
      {!hidesGlobalOverlays && <CookieConsent />}
      {!hidesGlobalOverlays && (
        <a href="#conteudo-principal" className="skip-link">
          Ir para o conteudo principal
        </a>
      )}
      <div id="site-content">
        <BrowserRouter
          future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
        >
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
                <Route
                  path="/blog"
                  element={<Navigate to="/direitos-do-consumidor" replace />}
                />
                <Route path="/blog/:slug" element={<BlogPostRedirect />} />
                <Route
                  path="/direitos-do-consumidor"
                  element={<CategoryPage />}
                />
                <Route
                  path="/direitos-do-consumidor/:slug"
                  element={<CategoryPostPage />}
                />
                <Route
                  path="/direitos-do-cidadao"
                  element={
                    <CategoryPage
                      categoryLabel="Direitos do Cidadão"
                      categorySlug="direitos-do-cidadao"
                    />
                  }
                />
                <Route
                  path="/direitos-do-cidadao/:slug"
                  element={
                    <CategoryPostPage
                      categoryLabel="Direitos do Cidadão"
                      categorySlug="direitos-do-cidadao"
                    />
                  }
                />
                <Route
                  path="/codigodedefesa"
                  element={
                    <Navigate to="/codigo-de-defesa-do-consumidor" replace />
                  }
                />
                <Route
                  path="/codigo-de-defesa-do-consumidor"
                  element={<CodigoDeDefesaPage />}
                />
                <Route
                  path="/superendividamento"
                  element={<SuperendividamentoPage />}
                />
                <Route
                  path="/catadoresdelixo"
                  element={<CatadoresDeLixoPage />}
                />
                <Route path="/motociclistas" element={<MotociclistasPage />} />
                <Route path="/seguranca" element={<SegurancaPage />} />
                <Route path="/aniversario" element={<AniversarioPage />} />
                <Route path="/evento" element={<EventoPage />} />
                <Route
                  path="/evento/sucesso"
                  element={<EventoSucessoPage />}
                />
                <Route
                  path="/evento/checkin"
                  element={<EventoCheckinPage />}
                />
                <Route
                  path="/evento/dashboard"
                  element={<EventoDashboardPage />}
                />
                <Route
                  path="/apresentacao-federal"
                  element={<ApresentacaoFederalPage />}
                />
                <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </div>
    </TooltipProvider>
  </QueryClientProvider>
  );
};

export default App;
