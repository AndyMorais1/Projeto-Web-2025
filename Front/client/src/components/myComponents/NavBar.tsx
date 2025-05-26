import { Button } from "@/components/ui/button"
import { UserDropdown } from "./UserSidebar"

const navLinksMain = [
    { label: "Comprar", href: "/user/comprar" },
    { label: "Buscar Agentes", href: "/user/agentes" },
    { label: "Minha Lista", href: "/user/lista" },
    { label: "Ajuda", href: "/user/ajuda" },
];

export function Navbar() {
    return (
        <nav className="flex justify-between items-center px-8 py-4 shadow-sm bg-white w-full">
            {/* Logo à esquerda */}
            <div className="flex items-center space-x-2">
                <a href="/user">
                    <p className="text-xl font-bold text-blue-600">Spot Home</p>
                </a>

            </div>

            {/* Links à direita */}
            <div className="flex items-center space-x-6">
                {navLinksMain.map((link, index) => (
                    <a key={index} href={link.href} className="text-base font-normal text-gray-700 hover:text-blue-600 transition-colors">
                        {link.label}
                    </a>
                ))}
                <UserDropdown />
            </div>
        </nav>
    );
}
