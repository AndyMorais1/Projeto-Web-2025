export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Fale Conosco</h1>

      <p className="mb-4">Se você tiver dúvidas, sugestões ou precisar de suporte, entre em contato conosco pelos canais abaixo:</p>

      <ul className="space-y-3 text-base">
        <li>
          <strong>Email:</strong>{" "}
          <a href="mailto:spothome@gmail.com" className="text-blue-600 hover:underline">
            spothome@gmail.com
          </a>
        </li>
        <li>
          <strong>Telefone:</strong> +351 931 414 252
        </li>
        <li>
          <strong>Endereço:</strong> Lisboa, Portugal
        </li>
        <li>
          <strong>Horário de atendimento:</strong> Segunda a Sexta, das 9h às 18h
        </li>
      </ul>

      <p className="mt-10 text-sm text-gray-500">Responderemos em até 48h úteis.</p>
    </div>
  );
}
