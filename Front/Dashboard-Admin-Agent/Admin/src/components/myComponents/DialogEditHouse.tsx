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

  // Inicializando o estado com os dados da casa
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
    agentId: house.agentId || "", // Adicionando o campo do agente responsável
  });

  const { users } = useUsers(); // Pegando os usuários do contexto
  const [images, setImages] = React.useState<string[]>(house.images || []);
  const [agents, setAgents] = React.useState<UserData[]>([]);
  const { refreshHouses } = useHouses();

  // Usando o hook useEffect para filtrar os agentes do contexto
  React.useEffect(() => {
    // Filtra os agentes a partir dos usuários carregados no contexto
    const filteredAgents = users.filter(user => user.role === "AGENT");
    setAgents(filteredAgents);
  }, [users]); // Isso vai ser executado sempre que 'users' mudar

  // Função para manipular as mudanças nos campos de entrada
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setForm(prev => ({ ...prev, [id]: value }));
  };

  // Função para lidar com o upload de imagens
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + images.length <= 5) {
      const newImageURLs = files.map(file => URL.createObjectURL(file));
      setImages(prev => [...prev, ...newImageURLs]);
    } else {
      toast.error("Você pode enviar no máximo 5 imagens.");
    }
  };

  // Função para enviar os dados e salvar a casa
  const handleSubmit = async () => {
    if (!form.title || !form.address || !form.price || !form.agentId) {
      toast.error("Preencha todos os campos obrigatórios.");
      return;
    }

    if (Number(form.price) < 0) {
      toast.error("O preço não pode ser negativo.");
      return;
    }

    const updatedHouse: HouseData = {
      agentId: form.agentId, // Incluindo o agente responsável
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
      if(!house.id) {
        toast.error("ID da casa não encontrado.");
        return;
      }
      const response = await housesServices.updateHouse(house.id, updatedHouse);  // Chama o updateHouse
      if (response) {
        await refreshHouses();  // Atualiza a lista de casas
        toast.success("Casa atualizada com sucesso!");
        onSave(response);  // Atualiza a casa no estado principal
        setIsOpen(false);  // Fecha o modal
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
          <DialogTitle>Edit House</DialogTitle>
          <DialogDescription>
            Modify the house details and click save to update.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {["title", "description", "price", "rooms", "bathrooms", "area", "address", "city", "zipCode"].map(field => (
            <div key={field} className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor={field} className="text-right">
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </Label>
              <Input
                id={field}
                type={field === "price" || field === "rooms" || field === "bathrooms" || field === "area" ? "number" : "text"}
                className="col-span-3"
                value={(form as any)[field]}
                onChange={handleChange}
                min={field === "price" || field === "rooms" || field === "bathrooms" || field === "area" ? 0 : undefined}
              />
            </div>
          ))}

          {/* Seletor de Agente Responsável */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="agentId" className="text-right">Agent</Label>
            <select
              id="agentId"
              value={form.agentId}
              onChange={handleChange}
              className="col-span-3 p-2 border rounded"
            >
              <option value="">Select Agent</option>
              {agents.map(agent => (
                <option key={agent.id} value={agent.id}>
                  {agent.name} {/* Aqui você pode adicionar o nome do agente */}
                </option>
              ))}
            </select>
          </div>

          {/* Tipo da casa */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="type" className="text-right">Type</Label>
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
          </div>

          {/* Upload de imagens */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="images" className="text-right">Upload Photos</Label>
            <Input
              id="images"
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="col-span-3"
            />
          </div>

          {images.length > 0 && (
            <div className="col-span-4 grid grid-cols-2 gap-2 px-4">
              {images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Preview ${index}`}
                  className="w-full h-24 object-cover rounded"
                />
              ))}
            </div>
          )}
        </div>

        <DialogFooter>
          <Button type="button" onClick={handleSubmit}>Save Changes</Button>
          <Button type="button" variant="outline" onClick={handleCloseDialog}>Cancel</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
