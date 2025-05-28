export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      <section className="px-6 md:px-20 py-16 flex flex-col lg:flex-row items-center gap-10">
        <div className="flex-1 max-w-xl">
          <h2 className="text-3xl font-bold mb-6">Sobre nós</h2>
          <p className="text-base mb-4 leading-relaxed">
            Bem-vindo à Spot Home, sua plataforma inovadora para compra e venda de imóveis. Nosso objetivo é simplificar o processo imobiliário, conectando compradores, proprietários e agentes de maneira eficiente e intuitiva.
          </p>
          <p className="text-base mb-4 leading-relaxed">
            Acreditamos que encontrar ou vender não precisa ser complicado. Por isso, oferecemos ferramentas avançadas, como filtros inteligentes, fotos interativas e um sistema de recomendações personalizadas.
          </p>
          <ul className="list-disc list-inside text-base text-gray-700 space-y-1">
            <li>Consultoria especializada</li>
            <li>Design limpo</li>
            <li>Clientes satisfeitos</li>
          </ul>
        </div>
        <div className="flex-1 w-full max-w-md">
          <img
            src="https://www.sodecor.com.br/wp-content/uploads/2017/09/Aprenda-como-Fazer-Casas-Bonitas-12.jpg"
            alt="casas"
            className="rounded-xl w-full h-auto shadow"
          />
        </div>
      </section>

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

      <section className="bg-white px-6 md:px-20 py-16">
        <h3 className="text-center text-lg font-semibold mb-8">Faça parte da nossa comunidade</h3>
        <div className="flex flex-col md:flex-row gap-6 justify-center items-center md:items-start">
          <div className="bg-white border border-gray-200 rounded-md shadow-md p-6 w-full max-w-sm text-center">
            <h4 className="text-blue-600 font-bold text-lg mb-3">Clientes</h4>
            <p className="text-sm text-gray-700 mb-5">
              Encontre imóveis de forma rápida e eficiente, filtre por localização, preço, tipologia.
              Solicite visitas com facilidade e contacte agentes.
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded">
              Comece sua busca agora
            </button>
          </div>
          <div className="bg-white rounded-md shadow-md p-6 w-full max-w-sm text-center">
            <h4 className="text-blue-600 font-bold text-lg mb-3">Agente Imobiliário</h4>
            <p className="text-sm text-gray-700 mb-5">
              Divulgue imóveis com maior visibilidade, receba leads qualificados e interessados.
              Negocie diretamente com potenciais compradores.
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded">
              Cadastre-se agora
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
