"use client";
import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Heart } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HouseData } from "@/data/HouseData";
import { useHouses } from "@/contexts/HousesContext";
import { useUsers } from "@/contexts/UsersContext";
import { housesServices } from "@/api/Houses";

export function Houses() {
  const {
    houses,
    refreshHouses,
    selectedHouse,
    setSelectedHouse,
    isDialogOpen,
    setIsDialogOpen,
    favorites,
    toggleFavorite,
  } = useHouses();

  const { users } = useUsers();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const priceFormatter = new Intl.NumberFormat("pt-PT", {
    style: "currency",
    currency: "EUR",
  });

  const handlePrevImage = () => {
    if (selectedHouse?.images?.length) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? selectedHouse.images.length - 1 : prev - 1
      );
    }
  };

  const handleNextImage = () => {
    if (selectedHouse?.images?.length) {
      setCurrentImageIndex((prev) =>
        prev === selectedHouse.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedHouse(null);
  };

  const handleDeleteHouse = async (houseId: string) => {
    try {
      await housesServices.deleteHouse(houseId);
      await refreshHouses();
      toast.success("Casa excluída com sucesso!");
    } catch (error) {
      toast.error("Erro ao excluir casa.");
    }
  };

  return (
    <div className="flex flex-col gap-4 items-center justify-center">
      {houses.length === 0 ? (
        <div className="text-center text-gray-500 text-lg mt-20">
          Nenhuma casa disponível no momento.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-4 auto-rows-fr">
          {houses.map((house) => {
            const isFavorited = favorites.some((fav) => fav.id === house.id);

            return (
              <Link
                href={`/user/comprar/${house.id}`}
                key={house.id}
                className="w-full h-full"
              >
                <Card className="w-full h-full flex flex-col hover:shadow-lg transition-shadow cursor-pointer relative">
                  {/* Botão coração */}
                  <Button
                    className="absolute top-5 right-5 bg-white text-red-500 hover:bg-red-50 shadow-sm z-10 border border-red-500"
                    size={"icon"}
                    onClick={(e) => {
                      e.preventDefault(); // evita navegação
                      toggleFavorite(house);
                      toast.success(
                        isFavorited
                          ? "Removido dos favoritos 💔"
                          : "Adicionado aos favoritos ❤️"
                      );
                    }}
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        isFavorited ? "fill-red-500" : "fill-none"
                      }`}
                    />
                  </Button>

                  <div className="p-3">
                    <img
                      src={house.images[0]}
                      alt={house.title}
                      className="w-full h-52 object-cover rounded-lg"
                    />
                  </div>
                  <div className="px-4 pb-4 space-y-2">
                    <div className="text-lg font-semibold">{house.title}</div>
                    <div className="text-xl font-semibold">
                      {priceFormatter.format(house.price)}
                    </div>
                    <div className="text-sm text-gray-700">
                      {house.details.rooms} quartos · {house.details.bathrooms} banheiros ·{" "}
                      {house.details.area} m² - {house.type}
                    </div>
                    <div className="text-sm text-gray-600">
                      {house.location.address}, {house.location.city}
                    </div>
                    <div className="text-sm text-gray-600">
                      Agente:{" "}
                      {users.find((u) => u.id === house.agentId)?.name || "Desconhecido"}
                    </div>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      )}

      {selectedHouse && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Informações da Casa</DialogTitle>
              <DialogDescription>
                Detalhes sobre {selectedHouse.title}
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4 text-sm space-y-2">
              <p><strong>Título:</strong> {selectedHouse.title}</p>
              <p><strong>Endereço:</strong> {selectedHouse.location.address}</p>
              <p><strong>Cidade:</strong> {selectedHouse.location.city}</p>
              <p><strong>Preço:</strong> {priceFormatter.format(selectedHouse.price)}</p>
              <p><strong>Agente:</strong> {users.find((u) => u.id === selectedHouse.agentId)?.name || "Desconhecido"}</p>
              <p><strong>Quartos:</strong> {selectedHouse.details.rooms}</p>
              <p><strong>Banheiros:</strong> {selectedHouse.details.bathrooms}</p>
              <p><strong>Área:</strong> {selectedHouse.details.area} m²</p>
              <p><strong>Tipo:</strong> {selectedHouse.type}</p>
              <p><strong>Descrição:</strong> {selectedHouse.description}</p>

              <div className="w-full h-60 overflow-hidden mt-4 relative">
                <img
                  src={selectedHouse.images[currentImageIndex]}
                  alt={selectedHouse.title}
                  className="object-cover w-full h-full"
                />
                <div
                  className="absolute top-1/2 left-2 text-white bg-black bg-opacity-50 p-2 rounded-full cursor-pointer"
                  onClick={handlePrevImage}
                >
                  {"<"}
                </div>
                <div
                  className="absolute top-1/2 right-2 text-white bg-black bg-opacity-50 p-2 rounded-full cursor-pointer"
                  onClick={handleNextImage}
                >
                  {">"}
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={handleCloseDialog}>
                Fechar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
