"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useHouses } from "@/contexts/HousesContext";

export default function HeroSection() {
  const { houses } = useHouses();
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();

  const priceFormatter = new Intl.NumberFormat("pt-PT", {
    style: "currency",
    currency: "EUR",
  });

  const filteredHouses = query
    ? houses.filter((house) =>
      [
        house.title,
        house.location.address,
        house.location.city,
        house.location.zipCode,
      ]
        .filter(Boolean)
        .some((field) =>
          field.toLowerCase().includes(query.toLowerCase())
        )
    )
    : [];

  const handleSelect = (houseId: string) => {
    setQuery("");
    setIsFocused(false);
    router.push(`/user/comprar/${houseId}`);
  };

  const handleSearchClick = () => {
    if (!query.trim()) return;
    router.push(`/user/comprar?search=${encodeURIComponent(query.trim())}`);
  };

  return (
    <div
      className="relative h-[500px] w-full bg-cover bg-center"
      style={{ backgroundImage: "url('/hero.jpeg')" }}
    >
      <div className="absolute inset-0 bg-black/30" />

      <div className="relative z-10 flex flex-col items-start justify-center h-full px-6 md:px-24">
        <h1 className="text-white text-4xl md:text-6xl font-extrabold leading-tight mb-6">
          Agentes. Visitas. <br /> Imóveis.
        </h1>

        <div className="relative w-full max-w-xl">
          <div className="bg-white rounded-xl flex items-center px-4 py-3 w-full shadow-md">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setTimeout(() => setIsFocused(false), 150)}
              placeholder="Insira um endereço, bairro, cidade ou CEP"
              className="flex-1 bg-transparent outline-none text-gray-700 text-base"
            />
            <button onClick={handleSearchClick}>
              <Search className="text-gray-500 w-5 h-5" />
            </button>
          </div>

          {isFocused && filteredHouses.length > 0 && (
            <ul className="absolute mt-1 w-full bg-white shadow-lg rounded-lg overflow-hidden z-20 max-h-64 overflow-y-auto border border-gray-200">
              {filteredHouses.map((house) => (
                <li
                  key={house.id}
                  onClick={() => handleSelect(house.id!)}
                  className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                >
                  <div className="font-semibold">{house.title}</div>
                  <div className="text-xs text-gray-500">
                    {house.location.address}, {house.location.city}
                  </div>
                </li>
              ))}
            </ul>
          )}

        </div>
      </div>
    </div>
  );
}
