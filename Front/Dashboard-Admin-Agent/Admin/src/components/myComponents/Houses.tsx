"use client";

import { DialogEditHouse } from "./DialogEditHouse";
import { toast } from "sonner";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Trash, Filter, User, Info } from "lucide-react";
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

export function Houses() {
  const { houses, refreshHouses } = useHouses();
  const [selectedHouse, setSelectedHouse] = useState<HouseData | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { users } = useUsers();

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
    // Se necessário, usar refreshHouses aqui depois da edição
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
        <DialogFilterHouses onFilter={refreshHouses} />
        <DialogCreateHouse />
      </div>

      {houses.length === 0 ? (
        <div className="text-center text-gray-500 text-lg mt-20">
          Nenhuma casa disponível no momento.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
          {houses.map((house) => (
            <Card
              key={house.id}
              className="w-full sm:w-72 bg-gray-100 shadow-md rounded-xl border border-gray-300"
            >
              <CardHeader className="p-3 flex justify-center">
                <img
                  src={house.images[0]}
                  alt={house.title}
                  className="w-full h-40 object-cover rounded-lg"
                />
              </CardHeader>

              <CardContent className="p-4">
                <CardTitle className="text-lg text-gray-800">
                  {house.title}
                </CardTitle>
                <CardDescription className="text-sm text-gray-600">
                  {house.location.address}
                </CardDescription>

                <div className="flex items-center gap-2 text-gray-700 mt-3">
                  <User size={18} className="text-gray-500" />
                  <span className="text-sm">
                    {users.find((user) => user.id === house.agentId)?.name ||
                      "Agente desconhecido"}
                  </span>
                </div>

                <div className="flex justify-end gap-2 mt-4">
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
              </CardContent>

              <CardFooter className="p-4 text-lg font-semibold text-right text-gray-800">
                {priceFormatter.format(house.price)}
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {selectedHouse && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>House Information</DialogTitle>
              <DialogDescription>
                Details about {selectedHouse.title}
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="flex flex-col space-y-1.5">
                <p>
                  <strong>Title:</strong> {selectedHouse.title}
                </p>
                <p>
                  <strong>Address:</strong> {selectedHouse.location.address}
                </p>
                <p>
                  <strong>City:</strong> {selectedHouse.location.city}
                </p>
                <p>
                  <strong>Price:</strong>{" "}
                  {priceFormatter.format(selectedHouse.price)}
                </p>
                <p>
                  <strong>Agent:</strong>{" "}
                  {users.find((user) => user.id === selectedHouse.agentId)
                    ?.name || "Agente desconhecido"}
                </p>
                <p>
                  <strong>Rooms:</strong> {selectedHouse.details.rooms}
                </p>
                <p>
                  <strong>Bathrooms:</strong> {selectedHouse.details.bathrooms}
                </p>
                <p>
                  <strong>Area:</strong> {selectedHouse.details.area} m²
                </p>
                <p>
                  <strong>Type:</strong> {selectedHouse.type}
                </p>
                <p>
                  <strong>Description:</strong> {selectedHouse.description}
                </p>

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
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
