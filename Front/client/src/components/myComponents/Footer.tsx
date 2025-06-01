import { navLinksMain } from "./NavBar";

export function Footer() {
  return (
    <footer className="bg-white border-t p-6">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-gray-600 text-center md:text-left place-items-center md:place-items-start mb-6">
        
        {/* Coluna 1: Navegação */}
        <div>
          <h4 className="text-base font-semibold text-gray-900 mb-3">Navegação</h4>
          <ul className="space-y-2">
            {navLinksMain.map((link, index) => (
              <li key={index}>
                <a href={link.href} className="hover:underline hover:text-blue-600 transition-colors">
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a href="/user/suporte" className="hover:underline hover:text-blue-600 transition-colors">
                Suporte
              </a>
            </li>
          </ul>
        </div>

        {/* Coluna 2: Legal */}
        <div>
          <h4 className="text-base font-semibold text-gray-900 mb-3">Legal</h4>
          <ul className="space-y-2">
            <li><a href="/user/privacidade" className="hover:underline hover:text-blue-600">Política de Privacidade</a></li>
            <li><a href="/user/termos" className="hover:underline hover:text-blue-600">Termos de Uso</a></li>
            <li><a href="/user/contacto" className="hover:underline hover:text-blue-600">Contato</a></li>
          </ul>
        </div>

        {/* Coluna 3: Contato */}
        <div>
          <h4 className="text-base font-semibold text-gray-900 mb-3">Contacto</h4>
          <ul className="space-y-1">
            <li>
              <a href="mailto:spothome@gmail.com" className="hover:underline text-blue-600">spothome@gmail.com</a>
            </li>
            <li>+351 931 414 252</li>
            <li>Lisboa, Portugal</li>
            <li>Seg a Sex, 9h - 18h</li>
          </ul>
        </div>
      </div>

      <div className="border-t text-center py-4 text-xs text-gray-500">
        © {new Date().getFullYear()} Spot Home. Todos os direitos reservados.
      </div>
    </footer>
  );
}
