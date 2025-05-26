"use client";
import { useRef } from "react";
import { Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import { useHouses } from "@/contexts/HousesContext";
import { toast } from "sonner";
import Link from "next/link";
import { getTopViewedHouses, getTopSavedHouses } from "@/utils/stats";

export default function TrendingHomes() {
  const { houses, toggleFavorite, favorites, refreshHouses } = useHouses();

  const scrollRefViewed = useRef<HTMLDivElement>(null);
  const scrollRefSaved = useRef<HTMLDivElement>(null);

  const scroll = (ref: React.RefObject<HTMLDivElement>, direction: "left" | "right") => {
    if (ref.current) {
      const amount = ref.current.clientWidth * 0.9;
      ref.current.scrollBy({
        left: direction === "left" ? -amount : amount,
        behavior: "smooth",
      });
    }
  };

  const customTopValue = 10; // Defina aqui o valor personalizado para o "top"

  const topViewed = getTopViewedHouses(houses, 10);
  const topCount = Math.max(5, customTopValue); // Onde customTopValue é o número que você deseja passar para o "top"
const topSaved = Array.isArray(favorites) ? favorites.slice(0, topCount) : [];


  // Usamos Set para performance em .has()
  const favoritedIds = new Set(favorites.map((f) => f.id));

  const renderHouseCard = (house: any) => {
    const isFavorited = favoritedIds.has(house.id);

    const handleFavoriteClick = async (e: React.MouseEvent) => {
      e.preventDefault();
      await toggleFavorite(house);
      await refreshHouses(); // Atualiza casas
      toast.success(
        isFavorited
          ? "Casa removida dos favoritos 💔"
          : "Casa adicionada aos favoritos ❤️"
      );
    };

    return (
      <div key={house.id} className="min-w-[20%] max-w-[20%] flex-none">
        <div className="h-full rounded-xl bg-white shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer flex flex-col justify-between">
          <div className="relative">
            <Link href={`/user/comprar/${house.id}`}>
              <img
                src={house.images?.[0] || "/placeholder.jpg"}
                alt={house.title}
                className="h-48 w-full object-cover"
              />
              {house.type && (
                <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
                  {house.type}
                </span>
              )}
            </Link>

            <Button
              className="absolute top-2 right-2 bg-white text-red-500 hover:bg-red-50 shadow-sm z-10 border border-red-500"
              size="icon"
              onClick={async (e) => {
                e.preventDefault();

                const wasFavorited = favorites.some((fav) => fav.id === house.id);

                await toggleFavorite(house); // muda a UI primeiro
                toast.success(
                  wasFavorited
                    ? "Casa removida dos favoritos 💔"
                    : "Casa adicionada aos favoritos ❤️"
                );

                await refreshHouses(); // sincroniza depois
              }}
            >


              <Heart className={`w-4 h-4 ${isFavorited ? "fill-red-500" : "fill-none"}`} />
            </Button>
          </div>

          <div className="p-4">
            <h3 className="text-lg font-bold">
              {house.price.toLocaleString("pt-PT", {
                style: "currency",
                currency: "EUR",
              })}
            </h3>
            <p className="text-sm text-gray-600">
              {house.details.rooms} quartos · {house.details.bathrooms} banheiros ·{" "}
              {house.details.area} m² · Ativo
            </p>
            <p className="text-sm text-gray-500 mt-1">
              {house.location.address}, {house.location.city}
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      {/* MAIS VISUALIZADAS */}
      <div className="mb-10">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-2xl font-bold">As Casas Mais Visualizadas</h2>
            <p className="text-gray-500 text-sm">Casas que mais despertaram interesse</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="icon" onClick={() => scroll(scrollRefViewed, "left")}>
              <ChevronLeft />
            </Button>
            <Button variant="outline" size="icon" onClick={() => scroll(scrollRefViewed, "right")}>
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
