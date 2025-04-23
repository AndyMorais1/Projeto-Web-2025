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
import { CirclePlus } from "lucide-react";

export function DialogCreateHouse() {
  const [images, setImages] = React.useState<File[]>([]);
  const [title, setTitle] = React.useState<string>(""); // Para o título
  const [address, setAddress] = React.useState<string>(""); // Para o endereço
  const [zip, setZip] = React.useState<string>(""); // Para o código postal (ZIP)
  const [price, setPrice] = React.useState<number | string>(""); // Para o preço
  const [isOpen, setIsOpen] = React.useState(false); // Controla se o diálogo está aberto

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length + images.length <= 5) {
      setImages([...images, ...files]);
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
    // Aqui você pode fazer o envio dos dados ou outras ações necessárias
    alert("House created successfully!");
    setIsOpen(false); // Fecha o diálogo após o envio
  };

  const handleCloseDialog = () => {
    setIsOpen(false); // Fecha o diálogo
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setIsOpen(true)}>
          <CirclePlus />
          Create House
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create House</DialogTitle>
          <DialogDescription>Fill in the details to create a new house listing.</DialogDescription>
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
              value={title} // Valor vindo do estado
              onChange={handleTitleChange} // Atualiza o estado quando o valor mudar
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
              value={address} // Valor vindo do estado
              onChange={handleAddressChange} // Atualiza o estado quando o valor mudar
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
              value={zip} // Valor vindo do estado
              onChange={handleZipChange} // Atualiza o estado quando o valor mudar
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">
              Price
            </Label>
            <Input
              id="price"
              type="number"
              value={price} // Valor vindo do estado
              onChange={handlePriceChange} // Atualiza o estado quando o valor mudar
              className="col-span-3"
              min={0} // Previne valores negativos
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" onClick={handleSubmit}>Create</Button>
          <Button type="button" variant="outline" onClick={handleCloseDialog}>Cancel</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
