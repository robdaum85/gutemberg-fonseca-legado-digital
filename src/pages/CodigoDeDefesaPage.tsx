import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useSeo } from "@/lib/useSeo";

const CodigoDeDefesaPage = () => {
  useSeo({
    title: "Codigo de Defesa | Gutemberg Fonseca",
    description:
      "Pagina em preparacao para a landing page Codigo de Defesa, no site oficial de Gutemberg Fonseca.",
    canonical: "https://gutembergfonseca.com.br/codigodedefesa",
    type: "website",
  });

  useEffect(() => {
    const robots = document.createElement("meta");
    robots.name = "robots";
    robots.content = "noindex, nofollow";
    robots.setAttribute("data-temporary-page", "codigodedefesa");
    document.head.appendChild(robots);

    window.scrollTo(0, 0);

    return () => {
      robots.remove();
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main
        id="conteudo-principal"
        tabIndex={-1}
        className="flex min-h-[70vh] items-center bg-slate-50 px-4 py-20"
      >
        <section className="mx-auto w-full max-w-4xl text-center">
          <p className="mb-4 text-sm font-bold uppercase tracking-wide text-red-700">
            Codigo de Defesa
          </p>
          <h1 className="mx-auto max-w-3xl text-4xl font-extrabold leading-tight text-zinc-950 md:text-6xl">
            Esta pagina esta em preparacao
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-zinc-600 md:text-xl">
            Em breve, este endereco recebera a landing page oficial.
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              to="/"
              className="inline-flex min-h-11 items-center justify-center rounded-md bg-zinc-950 px-6 py-3 text-sm font-bold text-white transition hover:bg-zinc-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950"
            >
              Voltar ao inicio
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CodigoDeDefesaPage;
