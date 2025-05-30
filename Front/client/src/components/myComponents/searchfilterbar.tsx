"use client";

import { ChevronDown, Search } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Props = {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
};

export function SearchFiltersBar({ searchQuery, setSearchQuery }: Props) {
  return (
    <div className="w-full flex justify-center p-4">
      <div className="flex flex-wrap justify-center items-center gap-2 max-w-7xl w-full">
        <div className="relative w-full sm:w-72">
          <input
            type="text"
            placeholder="Endereço, bairro, cidade, CEP"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-4 pr-10 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
        </div>

        {/* Filtros simulados */}
        {["Preço", "Quartos", "Tipo", "Agente"].map((label) => (
          <DropdownMenu key={label}>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-1 px-3 py-2 border border-gray-300 rounded-md text-sm font-medium bg-white hover:bg-gray-100">
                {label}
                <ChevronDown className="h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48">
              <DropdownMenuItem>Option 1</DropdownMenuItem>
              <DropdownMenuItem>Option 2</DropdownMenuItem>
              <DropdownMenuItem>Option 3</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ))}

        <button className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-700">
          Aplicar filtros
        </button>
      </div>
    </div>
  );
}
