"use client"; // Permite usar hooks no lado do cliente

import { DialogEditHouse } from "./DialogEditHouse";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Trash, Pencil, Filter, User, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { DialogCreateHouse } from "./DialogCreateHouse";
import { HouseData } from "@/data/HouseData";

// Lista de Casas com múltiplas imagens e agora com a interface HouseData
export const houses: HouseData[] = [
  {
    id: 1,
    title: "House 1",
    address: "Address 1",
    zipCode: "12345",
    latitude: 40.712776,
    longitude: -74.005974,
    price: "$100,000",
    agent: "John Doe",
    image: ["/house.webp", "/house0.avif", "/house2.jpeg"],
    area: 120,
    bedrooms: 3,
    bathrooms: 2,
    type: "Detached",
    description: "A beautiful family house in the city center.",
    agentId: "agent1",
  },
  {
    id: 2,
    title: "House 2",
    address: "Address 2",
    zipCode: "23456",
    latitude: 34.052235,
    longitude: -118.243683,
    price: "$200,000",
    agent: "Jane Smith",
    image: ["/house0.avif", "/house0.avif", "/house0.avif"],
    area: 150,
    bedrooms: 4,
    bathrooms: 3,
    type: "Semi-detached",
    description: "A spacious semi-detached home.",
    agentId: "agent2",
  },
  {
    id: 3,
    title: "House 3",
    address: "Address 3",
    zipCode: "34567",
    latitude: 51.507351,
    longitude: -0.127758,
    price: "$300,000",
    agent: "Emily Johnson",
    image: ["/house2.jpeg", "/house2.jpeg", "/house2.jpeg"],
    area: 200,
    bedrooms: 5,
    bathrooms: 4,
    type: "Terraced",
    description: "A modern terraced house with excellent facilities.",
    agentId: "agent3",
  },
];

export function Houses() {
  const [selectedHouse, setSelectedHouse] = useState<HouseData | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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
    if (selectedHouse?.image?.length) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? selectedHouse.image.length - 1 : prevIndex - 1
      );
    }
  };

  const handleNextImage = () => {
    if (selectedHouse?.image?.length) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === selectedHouse.image.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const handleEditHouse = (updatedHouse: HouseData) => {
    // Função para editar a casa
  };

  return (
    <div className="p-6">
      {/* Botões de Ação */}
      <div className="flex justify-end gap-2 mb-6">
        <Button variant="outline">
          <Filter className="mr-2" size={18} />
          Filter
        </Button>
        <DialogCreateHouse />
      </div>

      {/* Grid de Cards Responsivo */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
        {houses.map((house) => (
          <Card
            key={house.id}
            className="w-full sm:w-72 bg-gray-100 shadow-md rounded-xl border border-gray-300"
          >
            {/* Imagem do Card */}
            <CardHeader className="p-3 flex justify-center">
              <img
                src={house.image[0]}
                alt={house.title}
                className="w-full h-40 object-cover rounded-lg"
              />
            </CardHeader>

            {/* Conteúdo do Card */}
            <CardContent className="p-4">
              <CardTitle className="text-lg text-gray-800">
                {house.title}
              </CardTitle>
              <CardDescription className="text-sm text-gray-600">
                {house.address}
              </CardDescription>

              {/* Agente Responsável */}
              <div className="flex items-center gap-2 text-gray-700 mt-3">
                <User size={18} className="text-gray-500" />
                <span className="text-sm">{house.agent}</span>
              </div>

              {/* Botões de Ação */}
              <div className="flex justify-end gap-2 mt-4">
                {/* Botão Editar */}
                <DialogEditHouse house={house} onSave={handleEditHouse} />
                <Button variant="outline" size="icon">
                  <Trash className="text-red-500" size={18} />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleInfoClick(house)} // Abre o Dialog ao clicar
                >
                  <Info className="text-black" size={18} />
                </Button>
              </div>
            </CardContent>

            {/* Rodapé com Preço */}
            <CardFooter className="p-4 text-lg font-semibold text-right text-gray-800">
              {house.price}
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Dialog de Informações da Casa */}
      {selectedHouse && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>House Information</DialogTitle>
              <DialogDescription>Details about {selectedHouse.title}</DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="flex flex-col space-y-1.5">
                <p><strong>Title:</strong> {selectedHouse.title}</p>
                <p><strong>Address:</strong> {selectedHouse.address}</p>
                <p><strong>Price:</strong> {selectedHouse.price}</p>
                <p><strong>Agent:</strong> {selectedHouse.agent}</p>
                <p><strong>Rooms:</strong> {selectedHouse.bedrooms}</p>
                <p><strong>Bathrooms:</strong> {selectedHouse.bathrooms}</p>
                <p><strong>Area:</strong> {selectedHouse.area} m²</p>
                <p><strong>Type:</strong> {selectedHouse.type}</p>
                <p><strong>Description:</strong> {selectedHouse.description}</p>

                {/* Carrossel de Imagens */}
                <div className="w-full h-60 overflow-hidden mt-4 relative">
                  <img
                    src={selectedHouse.image[currentImageIndex]}
                    alt={selectedHouse.title}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute top-1/2 left-2 text-white bg-black bg-opacity-50 p-2 rounded-full cursor-pointer" onClick={handlePrevImage}>
                    {"<"}
                  </div>
                  <div className="absolute top-1/2 right-2 text-white bg-black bg-opacity-50 p-2 rounded-full cursor-pointer" onClick={handleNextImage}>
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
