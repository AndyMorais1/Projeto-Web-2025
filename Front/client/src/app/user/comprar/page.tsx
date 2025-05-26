"use client";

import { useEffect } from "react";
import { MapView } from "@/components/myComponents/MapView";
import { Houses } from "@/components/myComponents/Houses";
import { SearchFiltersBar } from "@/components/myComponents/searchfilterbar";

export default function Page() {
  useEffect(() => {
    // Aplicar estilo apenas ao carregar esta página
    document.body.style.overflow = "hidden";

    return () => {
      // Restaurar comportamento padrão ao sair da página
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="flex flex-col h-screen w-full overflow-hidden">
      {/* Barra de pesquisa */}
      <div className="p-2 bg-white border-b shadow-sm z-10">
        <SearchFiltersBar />
      </div>

      {/* Conteúdo principal */}
      <div className="flex flex-grow overflow-hidden">
        {/* Mapa */}
        <div className="w-full md:w-[50%] h-full bg-gray-100">
          <MapView />
        </div>

        {/* Listagem */}
        <div className="w-full md:w-[50%] h-full bg-white border-l border-gray-200 flex flex-col">
          <div className="flex-1 overflow-y-auto bg-gray-50">
            <Houses />
          </div>
        </div>
      </div>
    </div>
  );
}
