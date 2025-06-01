"use client";

import { ChevronDown, Search } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useHouseTypes } from "@/contexts/HouseTypesContext";

type Props = {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  filters: {
    priceMin: number | null;
    priceMax: number | null;
    rooms: number | null;
    type: string | null;
  };
  setFilters: (filters: Props["filters"]) => void;
};

export function SearchFiltersBar({
  searchQuery,
  setSearchQuery,
  filters,
  setFilters,
}: Props) {
  const { types } = useHouseTypes();

  const clearAllFilters = () => {
    setSearchQuery("");
    setFilters({
      priceMin: null,
      priceMax: null,
      rooms: null,
      type: null,
    });
  };

  return (
    <div className="w-full flex justify-center p-4">
      <div className="flex flex-wrap justify-center items-center gap-2 max-w-7xl w-full">
        {/* 🔍 Campo de pesquisa */}
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

        {/* 🏠 Filtro por tipo de casa */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-1 px-3 py-2 border border-gray-300 rounded-md text-sm font-medium bg-white hover:bg-gray-100">
              {filters.type || "Tipo"}
              <ChevronDown className="h-4 w-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48">
            <DropdownMenuItem onClick={() => setFilters({ ...filters, type: null })}>
              Todos os tipos
            </DropdownMenuItem>
            {types.map((type) => (
              <DropdownMenuItem
                key={type.id}
                onClick={() => setFilters({ ...filters, type: type.name })}
              >
                {type.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* 🛏️ Filtro por quantidade de quartos */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-1 px-3 py-2 border border-gray-300 rounded-md text-sm font-medium bg-white hover:bg-gray-100">
              {filters.rooms ? `${filters.rooms} quarto(s)` : "Quartos"}
              <ChevronDown className="h-4 w-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-40">
            <DropdownMenuItem onClick={() => setFilters({ ...filters, rooms: null })}>
              Qualquer quantidade
            </DropdownMenuItem>
            {[1, 2, 3, 4, 5].map((num) => (
              <DropdownMenuItem
                key={num}
                onClick={() => setFilters({ ...filters, rooms: num })}
              >
                {num} quarto{num > 1 ? "s" : ""}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* 💰 Filtro por faixa de preço */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-1 px-3 py-2 border border-gray-300 rounded-md text-sm font-medium bg-white hover:bg-gray-100">
              Preço
              <ChevronDown className="h-4 w-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-64 p-2 space-y-2">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Mínimo (€)</label>
              <Input
                type="number"
                placeholder="Ex: 100000"
                value={filters.priceMin ?? ""}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    priceMin: e.target.value ? Number(e.target.value) : null,
                  })
                }
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Máximo (€)</label>
              <Input
                type="number"
                placeholder="Ex: 500000"
                value={filters.priceMax ?? ""}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    priceMax: e.target.value ? Number(e.target.value) : null,
                  })
                }
              />
            </div>
            <button
              className="mt-2 text-sm text-blue-600 hover:underline self-end"
              onClick={() =>
                setFilters({
                  ...filters,
                  priceMin: null,
                  priceMax: null,
                })
              }
            >
              Limpar preço
            </button>
          </DropdownMenuContent>
        </DropdownMenu>


        {/* 🧹 Botão de limpar filtros */}
        <button
          className="bg-gray-200 text-gray-700 font-medium px-4 py-2 rounded-md hover:bg-gray-300"
          onClick={clearAllFilters}
        >
          Limpar filtros
        </button>
      </div>
    </div>
  );
}
