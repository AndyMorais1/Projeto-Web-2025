"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pencil } from "lucide-react";
import { HouseData } from "@/data/HouseData";
import { toast } from "sonner"; 

export function DialogEditHouse({
  house,
  onSave,
}: {
  house: HouseData;
  onSave: (updatedHouse: any) => void;
}) {
  // Inicializando os estados com as informações da casa
  const [images, setImages] = React.useState<string[]>(house.image || []);
  const [title, setTitle] = React.useState<string>(house.title || "");  // Mudando de `name` para `title`
  const [address, setAddress] = React.useState<string>(house.address || "");
  const [zip, setZip] = React.useState<string>("");  // Defina o valor padrão do `zip` se necessário
  const [price, setPrice] = React.useState<number | string>(house.price || "");
  const [isOpen, setIsOpen] = React.useState(false); // Controle de abertura do diálogo

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    // Se você deseja lidar com o arquivo como string (URL), você pode convertê-los com um FileReader aqui
    if (files.length + images.length <= 5) {
      // Adicionar o nome do arquivo ou URL da imagem ao estado
      setImages([...images, ...files.map(file => URL.createObjectURL(file))]);
    } else {
      alert("You can only upload up to 5 images.");
    }
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(event.target.value);
  };

  const handleZipChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setZip(event.target.value);
  };

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    // Garantir que o preço não seja negativo
    if (Number(value) >= 0 || value === "") {
      setPrice(value);
    }
  };

  const handleSubmit = () => {
    if (Number(price) < 0) {
      alert("Price cannot be negative.");
      return;
    }
    const updatedHouse = { name: title, address, zip, price, image: images };
    onSave(updatedHouse); // Passa os dados da casa atualizados para a função onSave
    setIsOpen(false); // Fecha o diálogo após o envio
  };

  const handleCloseDialog = () => {
    setIsOpen(false); // Fecha o diálogo
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setIsOpen(true)} variant="outline" size="icon">
          <Pencil className="text-blue-500" size={18} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit House</DialogTitle>
          <DialogDescription>
            Update the details to edit the house listing.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              type="text"
              className="col-span-3"
              value={title}
              onChange={handleTitleChange}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="images" className="text-right">
              Upload Photos
            </Label>
            <Input
              id="images"
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="address" className="text-right">
              Address
            </Label>
            <Input
              id="address"
              type="text"
              className="col-span-3"
              value={address}
              onChange={handleAddressChange}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="zip" className="text-right">
              ZIP Code
            </Label>
            <Input
              id="zip"
              type="text"
              className="col-span-3"
              value={zip}
              onChange={handleZipChange}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">
              Price
            </Label>
            <Input
              id="price"
              type="number"
              value={price}
              onChange={handlePriceChange}
              className="col-span-3"
              min={0}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" onClick={handleSubmit}>
            Save Changes
          </Button>
          <Button type="button" variant="outline" onClick={handleCloseDialog}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
