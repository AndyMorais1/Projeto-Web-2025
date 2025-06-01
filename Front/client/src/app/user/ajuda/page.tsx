"use client";
import { useState } from "react";
import Link from "next/link";
import {
  HelpCircle,
  Search,
  Heart,
  Home,
  LifeBuoy,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

export default function AjudaPage() {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const toggleStep = (step: number): void => {
    setActiveStep(activeStep === step ? null : step);
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10">
          Como Funciona a Plataforma
        </h1>

        <div className="space-y-8 mt-12">
          {/* Passo 1 */}
          <div className="bg-white shadow rounded-xl border">
            <button
              className="flex items-start gap-4 w-full p-6"
              onClick={() => toggleStep(1)}
            >
              <Search className="w-10 h-10 text-blue-600 shrink-0" />
              <div className="flex justify-between w-full">
                <h2 className="text-xl font-semibold">1. Pesquise Imóveis</h2>
                {activeStep === 1 ? (
                  <ChevronUp className="w-6 h-6 text-gray-600" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-gray-600" />
                )}
              </div>
            </button>
            {activeStep === 1 && (
              <div className="p-6 bg-white shadow rounded-xl ">
                <p className="text-gray-600 mb-2">
                  A busca é o primeiro passo para encontrar o imóvel ideal. Use o campo de pesquisa ou navegue pelas categorias.
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Filtre por localização, tipo de imóvel, valor ou número de quartos.</li>
                  <li>Use o mapa interativo para ver imóveis próximos a você.</li>
                  <li>Visualize resultados em tempo real, com atualizações instantâneas.</li>
                </ul>
              </div>
            )}
          </div>

          {/* Passo 2 */}
          <div className="bg-white shadow rounded-xl border">
            <button
              className="flex items-start gap-4 w-full p-6"
              onClick={() => toggleStep(2)}
            >
              <Heart className="w-10 h-10 text-red-500 shrink-0" />
              <div className="flex justify-between w-full">
                <h2 className="text-xl font-semibold">2. Adicione aos Favoritos</h2>
                {activeStep === 2 ? (
                  <ChevronUp className="w-6 h-6 text-gray-600" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-gray-600" />
                )}
              </div>
            </button>
            {activeStep === 2 && (
              <div className="p-6 bg-white shadow rounded-xl ">
                <p className="text-gray-600 mb-2">
                  Salve os imóveis que você gostou para acessá-los mais tarde com facilidade.
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Clique no ícone de coração ao lado do imóvel.</li>
                  <li>Todos os favoritos são armazenados no seu perfil.</li>
                  <li>Você pode comparar imóveis salvos e organizá-los por preferência.</li>
                </ul>
              </div>
            )}
          </div>

          {/* Passo 3 */}
          <div className="bg-white shadow rounded-xl border">
            <button
              className="flex items-start gap-4 w-full p-6"
              onClick={() => toggleStep(3)}
            >
              <Home className="w-10 h-10 text-green-600 shrink-0" />
              <div className="flex justify-between w-full">
                <h2 className="text-xl font-semibold">3. Veja os Detalhes</h2>
                {activeStep === 3 ? (
                  <ChevronUp className="w-6 h-6 text-gray-600" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-gray-600" />
                )}
              </div>
            </button>
            {activeStep === 3 && (
              <div className="p-6 bg-white shadow rounded-xl ">
                <p className="text-gray-600 mb-2">
                  Cada anúncio traz todas as informações necessárias para te ajudar na decisão.
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Fotos em alta qualidade dos ambientes internos e externos.</li>
                  <li>Informações detalhadas como área, número de quartos, vagas, IPTU, condomínio etc.</li>
                  <li>Nome e contato do agente responsável pelo imóvel.</li>
                  <li>Possibilidade de agendar visitas direto pela plataforma.</li>
                </ul>
              </div>
            )}
          </div>

          {/* Dúvidas Frequentes */}
          <div className="bg-white shadow rounded-xl border">
            <button
              className="flex items-start gap-4 w-full p-6"
              onClick={() => toggleStep(4)}
            >
              <HelpCircle className="w-10 h-10 text-purple-600 shrink-0" />
              <div className="flex justify-between w-full">
                <h2 className="text-xl font-semibold">4. Dúvidas Frequentes</h2>
                {activeStep === 4 ? (
                  <ChevronUp className="w-6 h-6 text-gray-600" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-gray-600" />
                )}
              </div>
            </button>
            {activeStep === 4 && (
              <div className="p-6 bg-white shadow rounded-xl ">
                <p className="text-gray-600 mb-2">
                  Respondemos as principais perguntas de nossos usuários:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li><strong>Como entro em contato com o agente?</strong> — Na página do imóvel há um botão para enviar mensagem ou agendar visita.</li>
                  <li><strong>Preciso pagar para usar a plataforma?</strong> — Não. A navegação, busca e favoritos são totalmente gratuitos.</li>
                  <li><strong>Como me torno um agente?</strong> — Basta clicar em “Seja um Agente” no menu e preencher seu cadastro.</li>
                  <li><strong>Esqueci minha senha. O que faço?</strong> — Vá até a página de login e clique em “Esqueceu a senha?”.</li>
                </ul>
              </div>
            )}
          </div>

          {/* Suporte */}
          <div className="flex items-center justify-between bg-blue-50 border border-blue-200 p-6 rounded-xl shadow mt-10">
            <div className="flex items-center gap-4">
              <LifeBuoy className="w-8 h-8 text-blue-600" />
              <div>
                <h3 className="text-lg font-semibold text-blue-900">
                  Ainda precisa de ajuda?
                </h3>
                <p className="text-sm text-blue-700">
                  Fale com nossa equipe de suporte técnico.
                </p>
              </div>
            </div>
            <Link
              href="/user/suporte"
              className="bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition"
            >
              Ir para Suporte
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
