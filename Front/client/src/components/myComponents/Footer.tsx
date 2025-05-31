export function Footer() {
  return (

    <footer className="bg-white border-t ">
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
        <p>© {new Date().getFullYear()} Spot Home. Todos os direitos reservados.</p>

        <div className="flex space-x-6 mt-4 md:mt-0">
          <a href="/privacy" className="hover:underline">Privacidade</a>
          <a href="/terms" className="hover:underline">Termos</a>
          <a href="/about" className="hover:underline">Sobre</a>
          <a href="/contact" className="hover:underline">Contato</a>

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

     
    </footer>
  );
}
