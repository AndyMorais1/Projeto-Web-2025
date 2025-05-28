export function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-700 px-6 md:px-20 py-10 text-sm">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-8">
        
        <div>
          <h4 className="text-base font-semibold text-gray-900 mb-2">Spot Home</h4>
          <p className="leading-relaxed">
            Plataforma moderna que conecta compradores, vendedores e agentes de imóveis com segurança, praticidade e inovação.
          </p>
        </div>

        <div>
          <h4 className="text-base font-semibold text-gray-900 mb-2">Receba novidades</h4>
          <p className="mb-2">Cadastre-se para receber ofertas exclusivas por e-mail.</p>
          <div className="flex items-center gap-2">
            <input
              type="email"
              placeholder="Seu e-mail"
              className="flex-1 px-3 py-2 border border-gray-300 rounded"
            />
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-medium">
              Inscrever
            </button>
          </div>
        </div>

        <div>
          <h4 className="text-base font-semibold text-gray-900 mb-2">Contacto</h4>
          <ul className="space-y-1">
            <li><a href="mailto:spothome@gmail.com" className="hover:underline text-blue-600">spothome@gmail.com</a></li>
            <li>+244 99912377</li>
            <li>Lisboa, Portugal</li>
            <li>Seg a Sex, 9h - 18h</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-300 pt-6 mt-4 flex flex-col md:flex-row justify-between items-center text-gray-600 text-sm gap-4 flex-wrap">
        <div className="flex flex-wrap justify-center gap-5 font-medium">
          <a href="/visitante/sejagente" className="hover:underline">Seja um Agente</a>
          <a href="/visitante/comprar" className="hover:underline">Comprar</a>
          <a href="/visitante/agentes" className="hover:underline">Buscar Agentes</a>
          <a href="/visitante/sobre" className="hover:underline">Sobre nós</a>
          <a href="/login" className="hover:underline">Login</a>
          <a href="/cadastro" className="hover:underline">Cadastrar</a>
        </div>
        <p className="text-center mt-4 md:mt-0">
          © {new Date().getFullYear()} Spot Home. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
