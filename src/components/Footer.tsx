
const Footer = () => {
  return (
    <footer className="bg-primary text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Gutemberg Fonseca</h3>
            <p className="mb-4">Secretário Estadual de Defesa do Consumidor</p>
            <p className="text-sm opacity-75">
              Transformando as relações de consumo no estado do Rio de Janeiro.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li><a href="#sobre" className="hover:text-secondary transition-colors">Sobre</a></li>
              <li><a href="#legado" className="hover:text-secondary transition-colors">Legado</a></li>
              <li><a href="#programas" className="hover:text-secondary transition-colors">Programas</a></li>
              <li><a href="#numeros" className="hover:text-secondary transition-colors">Números</a></li>
              <li><a href="#depoimentos" className="hover:text-secondary transition-colors">Depoimentos</a></li>
              <li><a href="#contato" className="hover:text-secondary transition-colors">Contato</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Contato</h3>
            <p className="flex items-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              (21) 3333-3333
            </p>
            <p className="flex items-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              contato@sedcon.rj.gov.br
            </p>
            <p className="flex items-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Rua da República, 111, Centro, Rio de Janeiro - RJ
            </p>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-white/20 text-center">
          <p className="text-sm opacity-75">
            &copy; {new Date().getFullYear()} SEDCON - Secretaria de Estado de Defesa do Consumidor. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
