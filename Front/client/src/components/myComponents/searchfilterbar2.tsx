"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

type Props = {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
};

export function SearchFiltersBar({ searchQuery, setSearchQuery }: Props) {
  return (
    <div className="w-full flex justify-center p-4">
      <div className="relative w-full sm:w-80">
        <Input
          type="text"
          placeholder="Endereço, bairro, cidade, CEP"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 pr-4 py-2"
        />
      </div>
    </div>
  );
}
