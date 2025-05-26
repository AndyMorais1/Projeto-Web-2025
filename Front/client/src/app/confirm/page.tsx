'use client';

import { useRouter } from 'next/navigation';

export default function ConfirmEmail() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4">Confirme seu e-mail</h1>
        <p className="text-gray-600 mb-6">
          Enviamos um link de confirmação para o seu e-mail. Por favor, verifique sua caixa de entrada ou spam e clique no link para continuar.
          Após a confirmação, faça o login.
        </p>
        <button
          onClick={() => router.push('/visitante')}
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-xl"
        >
          Voltar
        </button>
      </div>
    </div>
  );
}
