"use client";

import { useEffect, useRef, useState } from "react";
import { useHouses } from "@/contexts/HousesContext";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { toast } from "sonner";
import { useHouseTypes } from "@/contexts/HouseTypesContext"; // ✅ Importar

export function RandomDistrictHomes() {
  const { houses, toggleFavorite, favorites, refreshHouses } = useHouses();
  const { types } = useHouseTypes(); // ✅ Usar contexto
  const scrollRef = useRef<HTMLDivElement>(null);
  const [carouselIndexes, setCarouselIndexes] = useState<Record<string, number>>({});
  const [randomDistrict, setRandomDistrict] = useState<string | null>(null);

  useEffect(() => {
    if (houses.length === 0) return;

    const countByDistrict: Record<string, number> = {};

    houses.forEach((house) => {
      const city = house.location.city?.toUpperCase();
      if (!city) return;
      countByDistrict[city] = (countByDistrict[city] || 0) + 1;
    });

    const topDistrict = Object.entries(countByDistrict).sort((a, b) => b[1] - a[1])[0]?.[0];
    if (topDistrict) setRandomDistrict(topDistrict);
  }, [houses]);

  const filteredHouses = houses.filter(
    (h) => h.location.city?.toLowerCase() === randomDistrict?.toLowerCase()
  );

  const favoritedIds = new Set(favorites?.map((f) => f.id));

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const amount = scrollRef.current.clientWidth * 0.9;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -amount : amount,
        behavior: "smooth",
      });
    }
  };

  const handlePrevImage = (houseId: string, total: number) => {
    setCarouselIndexes((prev) => ({
      ...prev,
      [houseId]: (prev[houseId] ?? 0) === 0 ? total - 1 : (prev[houseId] ?? 0) - 1,
    }));
  };

  const handleNextImage = (houseId: string, total: number) => {
    setCarouselIndexes((prev) => ({
      ...prev,
      [houseId]: (prev[houseId] ?? 0) === total - 1 ? 0 : (prev[houseId] ?? 0) + 1,
    }));
  };

  const renderCard = (house: any) => {
    const currentIndex = carouselIndexes[house.id] ?? 0;
    const isFavorited = favoritedIds.has(house.id);
    const totalImages = house.images?.length || 1;
    const houseType = types.find((t) => t.id === house.typeId)?.name || "Tipo desconhecido"; // ✅ Aqui

    const handleFavoriteClick = async (e: React.MouseEvent) => {
      e.preventDefault();
      await toggleFavorite(house);
      await refreshHouses();
      toast.success(
        isFavorited
          ? "Casa removida dos favoritos 💔"
          : "Casa adicionada aos favoritos ❤️"
      );
    };

    return (
      <div key={house.id} className="min-w-[20%] max-w-[20%] flex-none">
        <div className="h-full rounded-xl bg-white shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer flex flex-col justify-between">
          <div className="relative h-48 w-full overflow-hidden">
            <Link href={`/user/comprar/${house.id}`}>
              <img
                src={house.images?.[currentIndex] || "/placeholder.jpg"}
                alt={house.title || "Casa"}
                className="h-48 w-full object-cover"
              />
              <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded">
                {houseType}
              </span>
            </Link>

            {totalImages > 1 && (
              <>
                <button
                  className="absolute top-1/2 left-2 -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-100 text-gray-800 p-1 rounded-full shadow-md"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handlePrevImage(house.id, totalImages);
                  }}
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  className="absolute top-1/2 right-2 -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-100 text-gray-800 p-1 rounded-full shadow-md"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleNextImage(house.id, totalImages);
                  }}
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </>
            )}

            <Button
              className="absolute top-2 right-2 bg-white text-red-500 hover:bg-red-50 shadow-sm z-10 border border-red-500"
              size="icon"
              onClick={handleFavoriteClick}
            >
              <Heart
                className={`w-4 h-4 ${isFavorited ? "fill-red-500" : "fill-none"}`}
              />
            </Button>
          </div>

          <div className="p-4">
            <h3 className="text-lg font-bold">
              {house.price?.toLocaleString("pt-PT", {
                style: "currency",
                currency: "EUR",
              })}
            </h3>
            <p className="text-sm text-gray-600">
              {house.details?.rooms} quartos · {house.details?.bathrooms} banheiros ·{" "}
              {house.details?.area} m²
            </p>
            <p className="text-sm text-gray-500 mt-1">
              {house.location?.address}, {house.location?.city}
            </p>
          </div>
        </div>
      </div>
    );
  };

  if (!randomDistrict || filteredHouses.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-10">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-2xl font-bold">
              Imóveis em destaque em {randomDistrict}
            </h2>
            <p className="text-gray-500 text-sm">
              Selecionamos casas no distrito de <strong>{randomDistrict}</strong> para você explorar
            </p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="icon" onClick={() => scroll("left")}>
              <ChevronLeft />
            </Button>
            <Button variant="outline" size="icon" onClick={() => scroll("right")}>
              <ChevronRight />
            </Button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide p-4"
        >
          {filteredHouses.map(renderCard)}
        </div>
      </div>
    </section>
  );
}
