"use client";

import { useHouses } from "@/contexts/HousesContext";
import Link from "next/link";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function Page() {
  const { favorites, toggleFavorite } = useHouses();

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100 px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Minha Lista</h1>

      {favorites.length === 0 ? (
        <p className="text-gray-600 text-lg">Você ainda não adicionou casas aos favoritos.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-6xl">
          {favorites.map((house) => (
            <div
              key={house.id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden relative"
            >
              {/* Botão de remover dos favoritos */}
              <Button
                className="absolute top-3 right-3 bg-white text-red-500 hover:bg-red-50 shadow-sm z-10 border border-red-500"
                size="icon"
                onClick={(e) => {
                  e.preventDefault();
                  toggleFavorite(house);
                  toast.success("Removido dos favoritos 💔");
                }}
              >
                <Heart className="w-4 h-4 fill-red-500" />
              </Button>

              <Link href={`/user/comprar/${house.id}`}>
                <img
                  src={house.images?.[0] || "/placeholder.jpg"}
                  alt={house.title}
                  className="h-48 w-full object-cover"
                />
                <div className="p-4 space-y-1">
                  <h2 className="text-lg font-semibold">{house.title}</h2>
                  <p className="text-sm text-gray-600">
                    {house.details.rooms} quartos · {house.details.bathrooms} banheiros ·{" "}
                    {house.details.area} m²
                  </p>
                  <p className="text-sm text-gray-500">
                    {house.location.address}, {house.location.city}
                  </p>
                  <p className="text-base font-bold text-green-600">
                    {house.price.toLocaleString("pt-PT", {
                      style: "currency",
                      currency: "EUR",
                    })}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
