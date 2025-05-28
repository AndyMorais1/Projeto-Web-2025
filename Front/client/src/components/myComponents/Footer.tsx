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
      </div>
    </footer>
  );
}
