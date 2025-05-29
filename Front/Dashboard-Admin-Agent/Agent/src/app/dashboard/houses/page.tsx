"use client";
import { DialogCreateHouse } from "@/components/myComponents/DialogCreateHouse";
import { DialogFilterHouses } from "@/components/myComponents/DialogFilterHouses";
import { Houses } from "@/components/myComponents/Houses";
import { MapView } from "@/components/myComponents/MapView";

export default function MyHouses() {
  return (
    <div className="flex flex-col h-screen w-full overflow-hidden">
      {/* Navbar no topo */}
      <div className="px-6 py-4 border-b border-gray-200 bg-white z-10">
        <h1 className="text-2xl font-bold">Minhas Casas</h1>
      </div>

      {/* Botões abaixo da navbar com linha inferior colada ao conteúdo */}
      <div className="flex justify-end px-6 py-4 border-b border-gray-200 bg-white z-10">
        <div className="flex gap-2">
          <DialogFilterHouses />
          <DialogCreateHouse />
        </div>
      </div>

      {/* Mapa + Listagem */}
      <div className="flex flex-grow h-[calc(100vh-128px)] overflow-hidden">

        {/* Mapa */}
        <div className="w-full md:w-[65%] h-full bg-gray-100">
          <div className="w-full h-full">
            <MapView />
          </div>
        </div>



        {/* Listagem */}
        <div className="w-full md:w-[35%] h-full bg-white border-l border-gray-200 flex flex-col ">
          
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
            <Houses />
          </div>
        </div>
      </div>
    </div>
  );
}
