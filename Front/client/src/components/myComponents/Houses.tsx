// Houses.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HouseData } from "@/data/HouseData";
import { useHouses } from "@/contexts/HousesContext";
import { useHouseTypes } from "@/contexts/HouseTypesContext";

type Filters = {
  priceMin: number | null;
  priceMax: number | null;
  rooms: number | null;
  type: string | null;
};

export function Houses({ searchQuery, filters }: { searchQuery: string; filters: Filters }) {
  const {
    houses,
    favorites,
    toggleFavorite,
    selectedDistrict,
    setSelectedDistrict,
  } = useHouses();

  const { types } = useHouseTypes();
  const [carouselIndexes, setCarouselIndexes] = useState<Record<string, number>>({});

  const priceFormatter = new Intl.NumberFormat("pt-PT", {
    style: "currency",
    currency: "EUR",
  });

  const filterHouses = (house: HouseData) => {
    const matchesDistrict = selectedDistrict
      ? house.location.city?.toLowerCase() === selectedDistrict.toLowerCase()
      : true;

    const matchesSearch = searchQuery
      ? [
          house.title,
          house.location.address,
          house.location.city,
          house.location.zipCode,
        ]
          .filter(Boolean)
          .some((field) =>
            field.toLowerCase().includes(searchQuery.toLowerCase())
          )
      : true;

    const matchesPrice =
      (filters.priceMin === null || house.price >= filters.priceMin) &&
      (filters.priceMax === null || house.price <= filters.priceMax);

    const matchesRooms =
      filters.rooms === null || house.details.rooms === filters.rooms;

    const matchesType =
      filters.type === null ||
      types.find((t) => t.id === house.typeId)?.name === filters.type;

    return (
      matchesDistrict &&
      matchesSearch &&
      matchesPrice &&
      matchesRooms &&
      matchesType
    );
  };

  const filteredHouses = houses.filter(filterHouses);

  return (
    <div className="flex flex-col gap-4 items-center justify-center">
      {selectedDistrict && (
        <div className="flex justify-between items-center bg-white px-4 py-2 rounded shadow text-sm w-full sm:w-96">
          <span>
            Filtrando por distrito: <strong>{selectedDistrict}</strong>
          </span>
          <Button variant="ghost" onClick={() => setSelectedDistrict(null)}>
            Limpar filtro
          </Button>
        </div>
      )}

      {filteredHouses.length === 0 ? (
        <div className="text-center text-gray-500 text-lg mt-20">
          Nenhuma casa encontrada.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-4 auto-rows-fr">
          {filteredHouses.map((house) => {
            const isFavorited = favorites.find((fav) => fav.id === house.id);
            const totalImages = house.images.length;
            const currentIndex = carouselIndexes[house.id!] ?? 0;
            const houseTypeName = types.find(t => t.id === house.typeId)?.name || "Tipo desconhecido";

            return (
              <Link href={`/user/comprar/${house.id}`} key={house.id} className="w-full h-full">
                <Card className="w-full h-full flex flex-col hover:shadow-lg transition-shadow cursor-pointer relative ">
                  <Button
                    className="absolute top-5 right-5 bg-white text-red-500 hover:bg-red-50 shadow-sm z-10 border border-red-500"
                    size={"icon"}
                    onClick={async (e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      await toggleFavorite(house);
                      toast.success(
                        isFavorited
                          ? "Removido dos favoritos 💔"
                          : "Adicionado aos favoritos ❤️"
                      );
                    }}
                  >
                    <Heart
                      className={`w-4 h-4 ${isFavorited ? "fill-red-500" : "fill-none"}`}
                    />
                  </Button>

                  <div className="relative w-full h-52 p-4">
                    <img
                      src={house.images[currentIndex]}
                      alt={house.title}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    {totalImages > 1 && (
                      <>
                        <button
                          className="absolute top-1/2 left-6 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-800 p-2 rounded-full shadow-md transition"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setCarouselIndexes((prev) => ({
                              ...prev,
                              [house.id!]: currentIndex === 0 ? totalImages - 1 : currentIndex - 1,
                            }));
                          }}
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                          className="absolute top-1/2 right-4 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-800 p-2 rounded-full shadow-md transition"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setCarouselIndexes((prev) => ({
                              ...prev,
                              [house.id!]: currentIndex === totalImages - 1 ? 0 : currentIndex + 1,
                            }));
                          }}
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </>
                    )}
                  </div>

                  <div className="px-4 pb-4 space-y-2">
                    <div className="text-lg font-semibold">{house.title}</div>
                    <div className="text-xl font-semibold">
                      {priceFormatter.format(house.price)}
                    </div>
                    <div className="text-sm text-gray-700">
                      {house.details.rooms} quartos · {house.details.bathrooms} banheiros · {house.details.area} m² - {houseTypeName}
                    </div>
                    <div className="text-sm text-gray-600">
                      {house.location.address}, {house.location.city}
                    </div>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
