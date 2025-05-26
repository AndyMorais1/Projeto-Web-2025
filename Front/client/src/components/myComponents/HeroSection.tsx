import { Search } from "lucide-react";

export default function HeroSection() {
  return (
    <div className="relative h-[500px] w-full bg-cover bg-center" style={{ backgroundImage: "url('/hero.jpg')" }}>
      <div className="absolute inset-0 bg-black/30" /> {/* escurece a imagem para contraste */}

      <div className="relative z-10 flex flex-col items-start justify-center h-full px-6 md:px-24">
        <h1 className="text-white text-4xl md:text-6xl font-extrabold leading-tight mb-6">
          Agentes. Visitas. <br /> Imóveis.
        </h1>

        <div className="bg-white rounded-xl flex items-center px-4 py-3 w-full max-w-xl shadow-md">
          <input
            type="text"
            placeholder="Insira um endereço, bairro, cidade ou CEP"
            className="flex-1 bg-transparent outline-none text-gray-700 text-base"
          />
          <Search className="text-gray-500 w-5 h-5" />
        </div>
      </div>
    </div>
  );
}
