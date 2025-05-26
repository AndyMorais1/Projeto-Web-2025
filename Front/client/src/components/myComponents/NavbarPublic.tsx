import { Button } from "@/components/ui/button";

const navLinksMain = [
  { label: "Comprar", href: "/visitante/comprar" },
  { label: "Buscar Agentes", href: "/visitante/agentes" },
  { label: "Sobre nós", href: "/visitante/sobre" },
];

export function NavbarPublic() {
  return (
    <nav className="flex justify-between items-center px-8 py-4 shadow-sm bg-white w-full">
      {/* Logo à esquerda */}
      <div className="flex items-center space-x-2">
        <a href="/visitante">
          <p className="text-xl font-bold text-blue-600">Spot Home</p>
        </a>
      </div>

      {/* Links + botões à direita */}
      <div className="flex items-center space-x-6">

        {/* Botão Seja um Agente */}
        <a href="/visitante/seja-agente">
          <Button className="bg-blue-600 text-white font-semibold px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition-all">
            Seja um Agente
          </Button>
        </a>
        
        {navLinksMain.map((link, index) => (
          <a
            key={index}
            href={link.href}
            className="text-base font-normal text-gray-700 hover:text-blue-600 transition-colors"
          >
            {link.label}
          </a>
        ))}

        {/* Botões de Acesso */}
        <a href="/login">
          <Button variant="outline">Login</Button>
        </a>
        <a href="/cadastro">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white transition-colors">
            Cadastrar
          </Button>
        </a>
      </div>
    </nav>
  );
}
