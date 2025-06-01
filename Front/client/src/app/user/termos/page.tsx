export default function TermsOfUse() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Termos de Uso</h1>
      <p className="mb-4">Estes termos regem o uso da plataforma Spot Home. Ao acessar ou utilizar o serviço, você concorda com os termos abaixo.</p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. Uso Permitido</h2>
      <p className="mb-4">Você se compromete a utilizar a plataforma apenas para fins legais e em conformidade com estes termos.</p>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. Conta de Usuário</h2>
      <p className="mb-4">Você é responsável por manter a confidencialidade de sua conta e senha.</p>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. Propriedade Intelectual</h2>
      <p className="mb-4">Todo o conteúdo da plataforma é protegido por direitos autorais e não pode ser reproduzido sem permissão.</p>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. Alterações nos Termos</h2>
      <p className="mb-4">Reservamos o direito de atualizar estes termos a qualquer momento.</p>

      <p className="mt-8 text-sm text-gray-500">Última atualização: {new Date().toLocaleDateString()}</p>
    </div>
  );
}
