"use client";
import { useState } from "react";
import Link from "next/link";
import { HelpCircle, Search, Heart, Home, LifeBuoy, ChevronDown, ChevronUp } from "lucide-react";

export default function AjudaPage() {
  // Tipando explicitamente o parâmetro step como número
  const [activeStep, setActiveStep] = useState<number | null>(null); // O tipo pode ser number ou null

  // Função para alternar a visibilidade de um passo
  const toggleStep = (step: number): void => {
    setActiveStep(activeStep === step ? null : step); // Se o passo estiver aberto, fecha ele, senão abre
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="max-w-4xl mx-auto ">
        <h1 className="text-4xl font-bold text-center mb-10">Como Funciona a Plataforma</h1>

        <div className="space-y-8 mt-12" >
          {/* Passo 1 */}
          <div className="bg-white shadow rounded-xl border">
            <button
              className="flex items-start gap-4 w-full p-6"
              onClick={() => toggleStep(1)} // Alterna o estado de visibilidade
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
                <p className="text-gray-600">
                  Use os filtros de localização, tipo, preço e mais para encontrar imóveis que
                  atendam às suas preferências.
                </p>
              </div>
            )}
          </div>

          {/* Passo 2 */}
          <div className="bg-white shadow rounded-xl border">
            <button
              className="flex items-start gap-4 w-full p-6"
              onClick={() => toggleStep(2)} // Alterna o estado de visibilidade
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
                <p className="text-gray-600">
                  Clique no ícone de coração para salvar imóveis que você gostou. Eles aparecerão na
                  sua lista pessoal.
                </p>
              </div>
            )}
          </div>

          {/* Passo 3 */}
          <div className="bg-white shadow rounded-xl border">
            <button
              className="flex items-start gap-4 w-full p-6"
              onClick={() => toggleStep(3)} // Alterna o estado de visibilidade
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
                <p className="text-gray-600">
                  Clique em um imóvel para visualizar mais informações, fotos, localização e detalhes
                  do agente responsável.
                </p>
              </div>
            )}
          </div>

          {/* Dúvidas */}
          <div className="bg-white shadow rounded-xl border">
            <button
              className="flex items-start gap-4 w-full p-6"
              onClick={() => toggleStep(4)} // Alterna o estado de visibilidade
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
                <p className="text-gray-600">
                  Leia as perguntas frequentes para tirar dúvidas comuns sobre o funcionamento da
                  plataforma.
                </p>
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
