"use client";

import { DialogEditHouse } from "./DialogEditHouse";
import { toast } from "sonner";
import { DialogDeleteHouseType } from "./DialogDeleteHouseType";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Trash, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { DialogCreateHouse } from "./DialogCreateHouse";
import { HouseData } from "@/data/HouseData";
import { useHouses } from "@/contexts/HousesContext";
import { useUsers } from "@/contexts/UsersContext";
import { housesServices } from "@/api/Houses";
import { DialogFilterHouses } from "./DialogFilterHouses";
import { DialogCreateHouseType } from "./DialogCreateTypeHouse";
import { useHouseTypes } from "@/contexts/HouseTypesContext";

export function Houses() {
  const { houses, refreshHouses } = useHouses();
  const [selectedHouse, setSelectedHouse] = useState<HouseData | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { users } = useUsers();
  const { types, refreshTypes } = useHouseTypes();

  const priceFormatter = new Intl.NumberFormat("pt-PT", {
    style: "currency",
    currency: "EUR",
  });

  const handleInfoClick = (house: HouseData) => {
    setSelectedHouse(house);
    setCurrentImageIndex(0);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedHouse(null);
  };

  const handlePrevImage = () => {
    if (selectedHouse?.images?.length) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? selectedHouse.images.length - 1 : prevIndex - 1
      );
    }
  };

  const handleNextImage = () => {
    if (selectedHouse?.images?.length) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === selectedHouse.images.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const handleEditHouse = (updatedHouse: HouseData) => {
    // Use refreshHouses() se desejar forçar a atualização
  };

  const handleDeleteHouse = async (houseId: string) => {
    try {
      await housesServices.deleteHouse(houseId);
      await refreshHouses();
      toast.success("Casa excluída com sucesso!", {
        description: "A casa foi removida do sistema.",
        duration: 3000,
      });
    } catch (error: any) {
      console.error("Erro ao excluir casa:", error);
      toast.error("Erro ao excluir casa.");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-end gap-2 mb-6">
        <DialogFilterHouses />
        <DialogCreateHouse />
        <DialogCreateHouseType />
        <DialogDeleteHouseType onDeleted={refreshTypes} />
      </div>

      {houses.length === 0 ? (
        <div className="text-center text-gray-500 text-lg mt-20">
          Nenhuma casa disponível no momento.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {houses.map((house) => (
            <Card key={house.id} className="bg-white shadow-md rounded-xl p-4">
              <div className="p-3">
                <div className="relative rounded-lg overflow-hidden">
                  <img
                    src={house.images[0]}
                    alt={house.title}
                    className="w-full h-52 object-cover rounded-lg"
                  />
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
                    {house.images.slice(0, 5).map((_, index) => (
                      <div
                        key={index}
                        className={`w-2 h-2 rounded-full ${index === 0 ? "bg-gray-800" : "bg-gray-400"}`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="px-4 pb-4 space-y-2">
                <div className="text-lg font-semibold text-gray-800">
                  {house.title}
                </div>
                <div className="text-xl font-semibold text-gray-900">
                  {priceFormatter.format(house.price)}
                </div>

                <div className="text-gray-700 text-sm">
                  {house.details.rooms} quartos | {house.details.bathrooms} banheiros | {" "}
                  <span className="font-medium">{house.details.area} m²</span> - {" "}
                  {house.type?.name ?? "Tipo não especificado"}
                </div>

                <div className="text-sm text-gray-600">
                  {house.location.address}, {house.location.city}
                </div>

                <div className="text-sm text-gray-600">
                  Agente: {" "}
                  <span className="font-medium">
                    {users.find((user) => user.id === house.agentId)?.name ||
                      "Agente desconhecido"}
                  </span>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <DialogEditHouse house={house} onSave={handleEditHouse} />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleDeleteHouse(house.id || "")}
                  >
                    <Trash className="text-red-500" size={18} />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleInfoClick(house)}
                  >
                    <Info className="text-black" size={18} />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
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

            <div className="grid gap-4 py-4">
              <div className="flex flex-col space-y-1.5">
                <p><strong>Título:</strong> {selectedHouse.title}</p>
                <p><strong>Endereço:</strong> {selectedHouse.location.address}</p>
                <p><strong>Cidade:</strong> {selectedHouse.location.city}</p>
                <p><strong>Preço:</strong> {priceFormatter.format(selectedHouse.price)}</p>
                <p><strong>Agente:</strong> {users.find(user => user.id === selectedHouse.agentId)?.name || "Agente desconhecido"}</p>
                <p><strong>Quartos:</strong> {selectedHouse.details.rooms}</p>
                <p><strong>Banheiros:</strong> {selectedHouse.details.bathrooms}</p>
                <p><strong>Área:</strong> {selectedHouse.details.area} m²</p>
                <p><strong>Tipo:</strong> {selectedHouse.type?.name ?? "Tipo não especificado"}</p>
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
