"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog, DialogContent, DialogDescription,
  DialogFooter, DialogHeader, DialogTitle, DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pencil } from "lucide-react";
import { HouseData, Type } from "@/data/HouseData";
import { toast } from "sonner";
import { UserData } from "@/data/UserData";
import { useUsers } from "@/contexts/UsersContext";
import { useHouses } from "@/contexts/HousesContext";
import { housesServices } from "@/api/Houses";

export function DialogEditHouse({
  house,
  onSave,
}: {
  house: HouseData;
  onSave: (updatedHouse: HouseData) => void;
}) {
  const [isOpen, setIsOpen] = React.useState(false);

  const [form, setForm] = React.useState({
    title: house.title || "",
    description: house.description || "",
    type: house.type || Type.APARTMENT,
    price: house.price || "",
    address: house.location.address || "",
    city: house.location.city || "",
    zipCode: house.location.zipCode || "",
    rooms: house.details.rooms || "",
    bathrooms: house.details.bathrooms || "",
    area: house.details.area || "",
    agentId: house.agentId || "",
  });

  const { users, currentUser } = useUsers();
  const [images, setImages] = React.useState<string[]>(house.images || []);
  const [agents, setAgents] = React.useState<UserData[]>([]);
  const { refreshHouses } = useHouses();

  React.useEffect(() => {
    const filteredAgents = users.filter(user => user.role === "AGENT");
    setAgents(filteredAgents);

    if (isOpen && currentUser) {
      setForm(prev => ({
        ...prev,
        agentId: currentUser.id || "",
      }));
    }
  }, [isOpen, users, currentUser]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setForm(prev => ({ ...prev, [id]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + images.length <= 5) {
      const newImageURLs = files.map(file => URL.createObjectURL(file));
      setImages(prev => [...prev, ...newImageURLs]);
    } else {
      toast.error("Você pode enviar no máximo 5 imagens.");
    }
  };

  const handleSubmit = async () => {
    if (!form.title || !form.address || !form.price || !form.agentId) {
      toast.error("Preencha todos os campos obrigatórios.");
      return;
    }

    if (Number(form.price) < 0) {
      toast.error("O preço não pode ser negativo.");
      return;
    }

   const updatedHouse: Partial< HouseData> = {
      agentId: form.agentId,
      title: form.title,
      description: form.description,
      type: form.type,
      price: Number(form.price),
      location: {
        address: form.address,
        city: form.city,
        zipCode: form.zipCode,
      },
      details: {
        rooms: Number(form.rooms),
        bathrooms: Number(form.bathrooms),
        area: Number(form.area),
      },
      images: images,
    };

    try {
      if (!house.id) {
        toast.error("ID da casa não encontrado.");
        return;
      }
      const response = await housesServices.updateHouse(house.id, updatedHouse);
      if (response) {
        await refreshHouses();
        toast.success("Casa atualizada com sucesso!");
        onSave(response);
        setIsOpen(false);
      } else {
        toast.error("Erro ao atualizar a casa.");
      }
    } catch (error) {
      toast.error("Erro ao atualizar a casa.");
    }
  };

  const handleCloseDialog = () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setIsOpen(true)} variant="outline" size="icon">
          <Pencil className="text-blue-500" size={18} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar Imóvel</DialogTitle>
          <DialogDescription>
            Atualize os dados do imóvel abaixo.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-4 gap-4 py-4">
          {[
            { id: "title", label: "Título" },
            { id: "description", label: "Descrição" },
            { id: "price", label: "Preço" },
            { id: "rooms", label: "Quartos" },
            { id: "bathrooms", label: "Banheiros" },
            { id: "area", label: "Área (m²)" },
            { id: "address", label: "Endereço" },
            { id: "city", label: "Cidade" },
            { id: "zipCode", label: "CEP" },
          ].map(({ id, label }) => (
            <React.Fragment key={id}>
              <Label htmlFor={id} className="text-right col-span-1">{label}</Label>
              <Input
                id={id}
                type={["price", "rooms", "bathrooms", "area"].includes(id) ? "number" : "text"}
                className="col-span-3"
                value={(form as any)[id]}
                onChange={handleChange}
                min={["price", "rooms", "bathrooms", "area"].includes(id) ? 0 : undefined}
              />
            </React.Fragment>
          ))}

          {/* Agente */}
          <Label htmlFor="agentId" className="text-right col-span-1">Agente</Label>
          <select
            id="agentId"
            value={form.agentId}
            disabled
            className="col-span-3 p-2 border rounded bg-gray-100 text-gray-600 cursor-not-allowed"
          >
            <option value={currentUser?.id}>{currentUser?.name}</option>
          </select>

          {/* Tipo */}
          <Label htmlFor="type" className="text-right col-span-1">Tipo</Label>
          <select
            id="type"
            value={form.type}
            onChange={handleChange}
            className="col-span-3 p-2 border rounded"
          >
            {Object.values(Type).map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>

          {/* Upload de imagens */}
          <Label htmlFor="images" className="text-right col-span-1">Enviar fotos</Label>
          <Input
            id="images"
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            className="col-span-3"
          />

          {/* Preview das imagens */}
          {images.length > 0 && (
            <>
              <Label className="text-right col-span-1">Pré-visualização</Label>
              <div className="col-span-3 grid grid-cols-2 gap-2">
                {images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Preview ${index}`}
                    className="w-full h-24 object-cover rounded"
                  />
                ))}
              </div>
            </>
          )}
        </div>

        <DialogFooter>
          <Button type="button" onClick={handleSubmit}>Salvar Alterações</Button>
          <Button type="button" variant="outline" onClick={handleCloseDialog}>Cancelar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
