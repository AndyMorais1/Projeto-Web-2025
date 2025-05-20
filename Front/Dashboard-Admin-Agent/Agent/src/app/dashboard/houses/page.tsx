"use client";
import { DialogCreateHouse } from "@/components/myComponents/DialogCreateHouse";
import { DialogFilterHouses } from "@/components/myComponents/DialogFilterHouses";
import { Houses } from "@/components/myComponents/Houses";

export default function MyHouses() {
  return (
    <div className="p-4 md:p-6 h-screen flex flex-col w-full">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8">Minhas Casas</h1>

      <div className="flex justify-end gap-2 mb-6">
        <DialogFilterHouses />
        <DialogCreateHouse />
      </div>

      {/* Container principal com altura flexível */}
      <div className="flex flex-col md:flex-row gap-6 flex-1 min-h-0">
        
        {/* Mapa */}
        <div className="flex-1 flex items-center justify-center bg-gray-100 p-4 min-h-[200px]">
          <p className="text-center text-base md:text-lg text-gray-600">
            🗺️ Aqui ficará o <strong>mapa interativo</strong> com os marcadores.
          </p>
        </div>

        {/* Painel da listagem */}
        <div className="w-full md:w-[35%] bg-gray-100 p-0 flex flex-col min-h-0">
          {/* Aqui aplicamos a rolagem */}
          <div className="flex-1 overflow-auto p-4">
            <Houses />
          </div>
        </div>
      </div>
    </div>
  );
}
