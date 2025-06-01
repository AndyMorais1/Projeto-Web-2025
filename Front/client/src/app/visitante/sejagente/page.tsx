import { Button } from "@/components/ui/button";

export default function SejaUmAgente() {
  return (
    <div className="bg-white text-gray-800 font-inter">

      {/* HERO */}
      <section className="relative bg-[url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1950&q=80')] bg-cover bg-center h-[90vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 text-center px-6 md:px-20 text-white max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Seja um Agente Imobiliário de Sucesso
          </h1>
          <p className="text-lg md:text-xl mb-8">
            Publique imóveis, receba leads qualificados e aumente a sua presença no mercado com a Spot Home.
          </p>
          <a href="/AgentCadastro">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-semibold shadow-lg transition">
              Cadastre-se agora
            </Button>
          </a>

        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section className="py-20 px-6 md:px-20 text-center bg-gray-50">
        <h2 className="text-2xl md:text-3xl font-bold mb-12">
          Como Funciona
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            {
              icon: "📝",
              title: "Cadastre-se",
              desc: "Crie sua conta como agente e configure seu perfil com informações profissionais."
            },
            {
              icon: "🏠",
              title: "Publique Imóveis",
              desc: "Adicione fotos, preços e características dos seus imóveis em poucos cliques."
            },
            {
              icon: "🤝",
              title: "Negocie com Clientes",
              desc: "Receba mensagens, agende visitas e feche negócios diretamente pela plataforma."
            }
          ].map((item, i) => (
            <div key={i} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition">
              <div className="text-5xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* BLOCO INFORMATIVO ADICIONAL */}
      <section className="bg-white py-20 px-6 md:px-20">
        <div className="max-w-5xl mx-auto text-center">
          <h3 className="text-3xl font-bold mb-6">Por que escolher a Spot Home?</h3>
          <p className="text-gray-700 text-lg mb-10">
            Nossa plataforma oferece uma solução completa para agentes: desde a gestão de imóveis até o contato direto com clientes interessados, tudo isso com uma interface simples, intuitiva e eficiente.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg shadow">
              <h4 className="text-blue-600 font-semibold mb-2">Dashboard Inteligente</h4>
              <p className="text-sm text-gray-600">Acompanhe o desempenho de seus imóveis, visitas e mensagens em um só lugar.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow">
              <h4 className="text-blue-600 font-semibold mb-2">Leads Qualificados</h4>
              <p className="text-sm text-gray-600">Receba apenas contatos relevantes e prontos para fechar negócio.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow">
              <h4 className="text-blue-600 font-semibold mb-2">Suporte Dedicado</h4>
              <p className="text-sm text-gray-600">Conte com nossa equipe para tirar dúvidas e otimizar sua presença na plataforma.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
