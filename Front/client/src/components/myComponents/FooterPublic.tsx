import { Button } from "@/components/ui/button";

export function FooterPublic() {
  return (
    <footer className="bg-white border-t p-6">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-gray-600 text-center md:text-left place-items-center md:place-items-start mb-6">

        {/* Coluna 1: Navegação (Acesso Rápido) */}
        <div>
          <h4 className="text-base font-semibold text-gray-900 mb-3">Navegação</h4>
          <ul className="space-y-2">
            <li><a href="/visitante/sejagente" className="hover:underline hover:text-blue-600 transition-colors">Seja um Agente</a></li>
            <li><a href="/visitante/comprar" className="hover:underline hover:text-blue-600 transition-colors">Comprar</a></li>
            <li><a href="/visitante/agentes" className="hover:underline hover:text-blue-600 transition-colors">Buscar Agentes</a></li>
            <li><a href="/visitante/sobre" className="hover:underline hover:text-blue-600 transition-colors">Sobre nós</a></li>
            <li><a href="/login" className="hover:underline hover:text-blue-600 transition-colors">Login</a></li>
            <li><a href="/cadastro" className="hover:underline hover:text-blue-600 transition-colors">Cadastrar</a></li>
          </ul>
        </div>

        {/* Coluna 2: Legal */}
        <div>
          <h4 className="text-base font-semibold text-gray-900 mb-3">Legal</h4>
          <ul className="space-y-2">
            <li><a href="/visitante/privacidade" className="hover:underline hover:text-blue-600 transition-colors">Política de Privacidade</a></li>
            <li><a href="/visitante/termos" className="hover:underline hover:text-blue-600 transition-colors">Termos de Uso</a></li>
            <li><a href="/visitante/contacto" className="hover:underline hover:text-blue-600 transition-colors">Contato</a></li>
          </ul>
        </div>

        {/* Coluna 3: Contato */}
        <div>
          <h4 className="text-base font-semibold text-gray-900 mb-3">Contacto</h4>
          <ul className="space-y-1">
            <li><a href="mailto:spothome@gmail.com" className="hover:underline text-blue-600">spothome@gmail.com</a></li>
            <li>+244 99912377</li>
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
