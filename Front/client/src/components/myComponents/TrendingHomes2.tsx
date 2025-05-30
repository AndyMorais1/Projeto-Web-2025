"use client";

import { useRef, useState } from "react";
import { Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import { useHouses } from "@/contexts/HousesContext";
import { toast } from "sonner";
import Link from "next/link";
import { getTopViewedHouses, getTopSavedHouses } from "@/utils/stats";
import { useHouseTypes } from "@/contexts/HouseTypesContext";
import Cookie from "js-cookie";
import { useRouter } from "next/navigation";

export default function TrendingHomes() {
  const { houses, toggleFavorite, favorites, refreshHouses } = useHouses();
  const { types } = useHouseTypes();

  const scrollRefViewed = useRef<HTMLDivElement>(null);
  const [carouselIndexes, setCarouselIndexes] = useState<Record<string, number>>({});
  const router = useRouter();

  const scroll = (
    ref: React.RefObject<HTMLDivElement>,
    direction: "left" | "right"
  ) => {
    if (ref.current) {
      const amount = ref.current.clientWidth * 0.9;
      ref.current.scrollBy({
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

  const customTopValue = 10;
  const topViewed = getTopViewedHouses(houses, customTopValue);
  const topCount = Math.max(5, customTopValue);
  const topSaved = Array.isArray(favorites) ? favorites.slice(0, topCount) : [];

  const favoritedIds = new Set(
    Array.isArray(favorites) ? favorites.map((f) => f.id) : []
  );

  const renderHouseCard = (house: any) => {
    if (!house || !house.id) return null;

    const isFavorited = favoritedIds.has(house.id);
    const currentIndex = carouselIndexes[house.id] ?? 0;
    const totalImages = house.images?.length || 1;
    const typeName = types.find(t => t.id === house.typeId)?.name || "Tipo desconhecido";
    const token = Cookie.get("token");

    const handleCardClick = () => {
      if (!token) {
        toast.warning("Você precisa estar logado para ver os detalhes.");
        router.push("/login");
        return;
      }

      router.push(`/user/comprar/${house.id}`);
    };

    const handleFavoriteClick = async (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      if (!token) {
        toast.warning("Faça login para favoritar casas.");
        router.push("/login");
        return;
      }

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
        <div
          onClick={handleCardClick}
          className="h-full rounded-xl bg-white shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer flex flex-col justify-between"
        >
          <div className="relative h-48 w-full overflow-hidden">
            <img
              src={house.images?.[currentIndex] || "/placeholder.jpg"}
              alt={house.title || "Casa"}
              className="h-48 w-full object-cover"
            />
            <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded">
              {typeName}
            </span>

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
              {house.details?.area} m² · Ativo
            </p>
            <p className="text-sm text-gray-500 mt-1">
              {house.location?.address}, {house.location?.city}
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-10">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-2xl font-bold">As Casas Mais Visualizadas</h2>
            <p className="text-gray-500 text-sm">
              As casas que mais despertaram o interesse dos nossos usuários
            </p>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll(scrollRefViewed, "left")}
            >
              <ChevronLeft />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll(scrollRefViewed, "right")}
            >
              <ChevronRight />
            </Button>
          </div>
        </div>

        <div
          ref={scrollRefViewed}
          className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide p-4"
        >
          {topViewed.map(renderHouseCard)}
        </div>
      </div>
    </section>
  );
}
