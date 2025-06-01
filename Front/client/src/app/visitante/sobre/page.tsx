
import { Button } from "@/components/ui/button";
export default function AboutUs() {
  return (
   <div className="min-h-screen bg-white text-gray-800">
      {/* Seção com imagem de fundo local */}
      <section
        className="px-6 md:px-20 py-16 flex flex-col lg:flex-row items-center gap-10 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/hero.jpg')" }}
      >
        <div className="flex-1 max-w-xl bg-white bg-opacity-80 backdrop-blur-md p-6 rounded-md shadow-md">
          <h2 className="text-3xl font-bold mb-6">Sobre nós</h2>
          <p className="text-base mb-4 leading-relaxed">
            Bem-vindo à Spot Home, sua plataforma inovadora para compra e venda de imóveis...
          </p>
          <p className="text-base mb-4 leading-relaxed">
            Acreditamos que encontrar ou vender não precisa ser complicado...
          </p>
          <ul className="list-disc list-inside text-base text-gray-700 space-y-1">
            <li>Consultoria especializada</li>
            <li>Design limpo</li>
            <li>Clientes satisfeitos</li>
          </ul>
        </div>
      </section>

      {/* Seção com categorias */}
      <section className="bg-gray-50 px-6 md:px-20 py-16 text-center">
        <p className="text-blue-600 font-medium mb-2">Nossa Experiência</p>
        <h3 className="text-2xl font-bold mb-12">O que você está procurando?</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 justify-center items-start">
          {[
            {
              icon: "🏢",
              title: "Apartamentos",
              text: "Imóveis residenciais com localização privilegiada.",
            },
            {
              icon: "🏠",
              title: "Casas",
              text: "Lar ideal para famílias, com design moderno e segurança.",
            },
            {
              icon: "🚗",
              title: "Garagens",
              text: "Espaços seguros e acessíveis para o seu veículo.",
            },
            {
              icon: "🏬",
              title: "Comercial",
              text: "Estabelecimentos prontos para receber o seu negócio.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white p-6 pt-12 rounded shadow-md relative flex flex-col items-center text-center hover:shadow-lg transition"
            >
              <div className="absolute -top-10 w-20 h-20 rounded-full bg-white shadow flex items-center justify-center text-3xl">
                {item.icon}
              </div>
              <h4 className="font-semibold text-lg mt-4 mb-2">{item.title}</h4>
              <p className="text-sm text-gray-600">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Seção comunidade */}
      <section className="bg-white px-6 md:px-20 py-16">
        <h3 className="text-center text-lg font-semibold mb-8">Faça parte da nossa comunidade</h3>
        <div className="flex flex-col md:flex-row gap-6 justify-center items-center md:items-start">
          <div className="bg-white border border-gray-200 rounded-md shadow-md p-6 w-full max-w-sm text-center">
            <h4 className="text-blue-600 font-bold text-lg mb-3">Clientes</h4>
            <p className="text-sm text-gray-700 mb-5">
              Encontre imóveis de forma rápida e eficiente, filtre por localização, preço, tipologia.
              Solicite visitas com facilidade e contacte agentes.
            </p>
            <a href="/cadastro">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-semibold shadow-lg transition">
              seja um cliente
            </Button>
          </a>
          </div>
          <div className="bg-white rounded-md shadow-md p-6 w-full max-w-sm text-center">
            <h4 className="text-blue-600 font-bold text-lg mb-3">Agente Imobiliário</h4>
            <p className="text-sm text-gray-700 mb-5">
              Divulgue imóveis com maior visibilidade, receba leads qualificados e interessados.
              Negocie diretamente com potenciais compradores.
            </p>
           <a href="/AgentCadastro">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-semibold shadow-lg transition">
              seja um agente
            </Button>
          </a>
          </div>
        </div>
      </section>
    </div>
  );
}
