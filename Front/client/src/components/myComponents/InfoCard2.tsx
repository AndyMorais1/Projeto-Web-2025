"use client";

import Image from "next/image";
import Link from "next/link";

export function InfoCards() {
  return (
    <section className="bg-white py-16 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Compre uma casa */}
        <div className="bg-white rounded-2xl shadow-sm p-6 border flex flex-col justify-between min-h-[440px] text-center">
          <div>
            <div className="mb-6 flex justify-center">
              <Image
                src="/HandsPinch.png"
                alt="Compre uma casa"
                width={120}
                height={120}
              />
            </div>
            <h3 className="text-lg font-bold mb-2">Compre uma Casa</h3>
            <p className="text-gray-600">
              Encontre o seu lugar com uma experiência fotográfica envolvente e a maioria de listagens, incluindo coisas que você não encontrará em nenhum outro lugar.
            </p>
          </div>
          <div className="mt-6">
            <Link
              href="/visitante/comprar"
              className="inline-block border border-[#2563EB] text-[#2563EB] font-medium px-4 py-2 rounded-md hover:bg-[#2563EB]/10 transition"
            >
              Comprar
            </Link>
          </div>
        </div>

        {/* Venda uma casa */}
        <div className="bg-white rounded-2xl shadow-sm p-6 border flex flex-col justify-between min-h-[440px] text-center">
          <div>
            <div className="mb-6 flex justify-center">
              <Image
                src="/HandsPinch2.png"
                alt="Venda uma casa"
                width={120}
                height={120}
              />
            </div>
            <h3 className="text-lg font-bold mb-2">Venda uma casa</h3>
            <p className="text-gray-600">
              Não importa o caminho que você escolher para vender sua casa, nós podemos ajudá-lo a ter uma venda bem-sucedida.
            </p>
          </div>
          <div className="mt-6">
            <Link
              href="/visitante/agentes"
              className="inline-block border border-[#2563EB] text-[#2563EB] font-medium px-4 py-2 rounded-md hover:bg-[#2563EB]/10 transition"
            >
              Fale com um agente
            </Link>
          </div>
        </div>

        {/* Seja um agente */}
        <div className="bg-white rounded-2xl shadow-sm p-6 border flex flex-col justify-between min-h-[440px] text-center">
          <div>
            <div className="mb-6 flex justify-center">
              <Image
                src="/HandsPinch3.png"
                alt="Seja um agente"
                width={120}
                height={120}
              />
            </div>
            <h3 className="text-lg font-bold mb-2">Seja um agente</h3>
            <p className="text-gray-600">
              Junte-se à nossa rede de especialistas e conecte-se com clientes em busca do imóvel ideal. Cresça com a Spot Home.
            </p>
          </div>
          <div className="mt-6">
            <Link
              href="#"
              className="inline-block border border-[#2563EB] text-[#2563EB] font-medium px-4 py-2 rounded-md hover:bg-[#2563EB]/10 transition"
            >
              Quero participar
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
