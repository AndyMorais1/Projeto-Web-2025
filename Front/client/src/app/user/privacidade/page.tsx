export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Política de Privacidade</h1>
      <p className="mb-4">
        Esta política descreve como coletamos, usamos e protegemos suas informações pessoais. Ao utilizar o Spot Home, você concorda com esta política.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. Coleta de Informações</h2>
      <p className="mb-4">Coletamos informações como nome, e-mail, telefone e dados de uso da plataforma para melhorar sua experiência.</p>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. Uso de Informações</h2>
      <p className="mb-4">Utilizamos os dados para comunicação, análise de uso e melhorias do serviço. Não vendemos seus dados.</p>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. Armazenamento e Segurança</h2>
      <p className="mb-4">Adotamos medidas de segurança para proteger seus dados contra acesso não autorizado.</p>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. Seus Direitos</h2>
      <p className="mb-4">Você pode acessar, corrigir ou excluir suas informações pessoais a qualquer momento.</p>

      <p className="mt-8 text-sm text-gray-500">Última atualização: {new Date().toLocaleDateString()}</p>
    </div>
  );
}
