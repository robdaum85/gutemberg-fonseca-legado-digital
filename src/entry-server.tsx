/* eslint-disable react-refresh/only-export-components */
import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { Route, Routes } from "react-router-dom";

import ApresentacaoFederalPage from "./pages/ApresentacaoFederalPage";
import CatadoresDeLixoPage from "./pages/CatadoresDeLixoPage";
import CategoryPage from "./pages/CategoryPage";
import CategoryPostPage from "./pages/CategoryPostPage";
import CodigoDeDefesaPage from "./pages/CodigoDeDefesaPage";
import EventoPage from "./pages/EventoPage";
import Index from "./pages/Index";
import MoldurasPage from "./pages/MoldurasPage";
import MotociclistasPage from "./pages/MotociclistasPage";
import NotFound from "./pages/NotFound";
import SegurancaPage from "./pages/SegurancaPage";
import SuperendividamentoPage from "./pages/SuperendividamentoPage";
import { getCategorySlug, getPublishedBlogPosts } from "./lib/blogUtils";
import { activePhotoFrames } from "./config/photoFrames";

export {
  AUTHOR_URL,
  DEFAULT_SOCIAL_IMAGE,
  PERSON_ID,
  SITE_NAME,
  SITE_URL,
  STATIC_PAGE_SEO,
  WEBSITE_ID,
  absoluteUrl,
  canonicalUrl,
  personJsonLd,
  websiteJsonLd,
} from "./lib/siteSeo";

export const publicPosts = getPublishedBlogPosts();
export const publicFrames = activePhotoFrames;

function StaticOperationalPage({ title }: { title: string }) {
  return (
    <main id="conteudo-principal">
      <h1>{title}</h1>
      <p>Área operacional não destinada à indexação.</p>
    </main>
  );
}

function RouteContent({ path }: { path: string }) {
  if (path === "/") return <ApresentacaoFederalPage />;
  if (path === "/institucional") return <Index />;
  if (path === "/direitos-do-consumidor") return <CategoryPage />;
  if (path === "/direitos-do-cidadao") {
    return <CategoryPage categoryLabel="Direitos do Cidadão" categorySlug="direitos-do-cidadao" />;
  }
  if (path.startsWith("/direitos-do-consumidor/")) return <CategoryPostPage />;
  if (path.startsWith("/direitos-do-cidadao/")) {
    return <CategoryPostPage categoryLabel="Direitos do Cidadão" categorySlug="direitos-do-cidadao" />;
  }
  if (path === "/seguranca-publica") {
    return <CategoryPage categoryLabel="Segurança Pública" categorySlug="seguranca-publica" />;
  }
  if (path.startsWith("/seguranca-publica/")) {
    return <CategoryPostPage categoryLabel="Segurança Pública" categorySlug="seguranca-publica" />;
  }
  if (path === "/codigo-de-defesa-do-consumidor") return <CodigoDeDefesaPage />;
  if (path === "/superendividamento") return <SuperendividamentoPage />;
  if (path === "/catadoresdelixo") return <CatadoresDeLixoPage />;
  if (path === "/motociclistas") return <MotociclistasPage />;
  if (path === "/seguranca") return <SegurancaPage />;
  if (path === "/molduras" || path.startsWith("/molduras/")) return <MoldurasPage />;
  if (path === "/aniversario") return <StaticOperationalPage title="Aniversário de Gutemberg Fonseca" />;
  if (path === "/evento") return <EventoPage />;
  if (path === "/evento/sucesso") return <StaticOperationalPage title="Inscrição realizada" />;
  if (path === "/evento/checkin") return <StaticOperationalPage title="Portaria do evento" />;
  if (path === "/evento/dashboard") return <StaticOperationalPage title="Lista de participantes" />;
  return <NotFound />;
}

export function render(path: string) {
  const routePattern = path.startsWith("/direitos-do-consumidor/")
    ? "/direitos-do-consumidor/:slug"
    : path.startsWith("/direitos-do-cidadao/")
      ? "/direitos-do-cidadao/:slug"
      : path.startsWith("/seguranca-publica/")
        ? "/seguranca-publica/:slug"
        : path.startsWith("/molduras/")
          ? "/molduras/:slug"
          : path;
  return renderToString(
    <StaticRouter location={path}>
      <Routes>
        <Route path={routePattern} element={<RouteContent path={path} />} />
      </Routes>
    </StaticRouter>,
  );
}

export function getPrerenderPaths() {
  const postPaths = publicPosts.flatMap((post) => {
    const categorySlug = getCategorySlug(post.category);
    return categorySlug ? [`/${categorySlug}/${post.slug}`] : [];
  });

  return [
    "/",
    "/institucional",
    "/direitos-do-consumidor",
    "/direitos-do-cidadao",
    "/seguranca-publica",
    "/codigo-de-defesa-do-consumidor",
    "/superendividamento",
    "/catadoresdelixo",
    "/motociclistas",
    "/seguranca",
    "/molduras",
    "/aniversario",
    "/evento",
    "/evento/sucesso",
    "/evento/checkin",
    "/evento/dashboard",
    ...postPaths,
    ...publicFrames.map((frame) => `/molduras/${frame.slug}`),
  ];
}
