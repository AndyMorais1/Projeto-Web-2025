"use client";

import { useEffect } from "react";
import { MapView } from "@/components/myComponents/MapView";
import { Houses } from "@/components/myComponents/Houses";
import { SearchFiltersBar } from "@/components/myComponents/searchfilterbar";
import { Footer } from "@/components/myComponents/Footer";

export default function Page() {

  return (
    <div className="flex flex-col h-screen w-full overflow-hidden ">

      {/* Conteúdo principal */}
      <div className="flex flex-grow overflow-hidden">
        {/* Mapa */}
        <div className="w-full md:w-[50%] h-full bg-gray-100">
          <MapView />
        </div>

        {/* Listagem */}{/* Barra de pesquisa */}
        <div className="w-full md:w-[50%] h-full bg-white border-l border-gray-200 flex flex-col">
          <div className="py-2 bg-white border-b shadow-sm z-10">
            <SearchFiltersBar />
          </div>
          <div className="flex-1 overflow-y-auto bg-gray-100 py-4 px-2">
            <Houses />
          </div>
        </div>
      </div>
    </div>
  );
}
