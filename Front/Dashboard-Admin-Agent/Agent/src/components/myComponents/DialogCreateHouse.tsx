"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter,
  DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CirclePlus } from "lucide-react";
import { housesServices } from "@/api/Houses";
import { useUsers } from "@/contexts/UsersContext";
import { UserData } from "@/data/UserData";
import { HouseData } from "@/data/HouseData";
import { useHouses } from "@/contexts/HousesContext";
import { toast } from "sonner"; 
import { uploadImage } from "@/utils/uploadImage";
import { useHouseTypes } from "@/contexts/HouseTypesContext";

export function DialogCreateHouse() {
  const { users, currentUser } = useUsers();
  const { types, refreshTypes } = useHouseTypes();
  const [agents, setAgents] = React.useState<UserData[]>([]);
  const [images, setImages] = React.useState<File[]>([]);
  const [isOpen, setIsOpen] = React.useState(false); 
  const { refreshHouses } = useHouses();

  const [form, setForm] = React.useState({
    title: "", description: "", typeId: "", price: "",
    agentId: "", address: "", city: "", zipCode: "",
    rooms: "", bathrooms: "", area: "",
  });

  const distritosDePortugal = [
    "Aveiro", "Beja", "Braga", "Bragança", "Castelo Branco", "Coimbra",
    "Évora", "Faro", "Guarda", "Leiria", "Lisboa", "Madeira",
    "Portalegre", "Porto", "Santarém", "Setúbal", "Viana do Castelo",
    "Vila Real", "Viseu", "Açores"
  ];

  React.useEffect(() => {
    refreshTypes(); // carregar tipos ao abrir
  }, []);

  React.useEffect(() => {
    const filteredAgents = users.filter(user => user.role === "AGENT" && user.status === "ACTIVE");
    setAgents(filteredAgents);

    if (isOpen && currentUser) {
      setForm(prev => ({
        ...prev,
        agentId: currentUser.id || "",
      }));
    }
  }, [isOpen, users, currentUser]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + images.length <= 5) {
      setImages([...images, ...files]);
    } else {
      alert("Você pode enviar no máximo 5 imagens.");
    }
  };

  const handleSubmit = async () => {
    try {
      const imageUrls = await Promise.all(images.map(uploadImage));
      const now = new Date().toISOString();

      if (!form.typeId) {
        toast.error("Selecione um tipo de imóvel.");
        return;
      }

      const payload: HouseData = {
        title: form.title,
        description: form.description,
        typeId: form.typeId,
        price: Number(form.price),
        agentId: form.agentId,
        images: imageUrls,
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
        createdAt: now,
        updatedAt: now,
      };

      const created = await housesServices.createHouse(payload);
      if (created) {
        toast.success("Casa criada com sucesso!", {
          description: "A casa foi cadastrada no sistema.",
          duration: 3000,
        });
        await refreshHouses();
        setIsOpen(false);
        setForm({
          title: "", description: "", typeId: "", price: "",
          agentId: currentUser?.id || "", address: "", city: "", zipCode: "",
          rooms: "", bathrooms: "", area: "",
        });
        setImages([]);
      } else {
        alert("Erro ao criar a casa.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Erro ao criar casa.", {
        description: "Verifique os dados e tente novamente.",
        duration: 3000,
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setIsOpen(true)}>
          <CirclePlus className="mr-2" />
          Cadastrar Casa
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Nova Casa</DialogTitle>
          <DialogDescription>Preencha os detalhes da casa para criar o anúncio.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {/* Campos padrão */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">Título</Label>
            <Input id="title" value={form.title} onChange={handleInputChange} className="col-span-3" />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">Descrição</Label>
            <Textarea id="description" value={form.description} onChange={handleInputChange} className="col-span-3" />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="typeId" className="text-right">Tipo</Label>
            <select id="typeId" value={form.typeId} onChange={handleInputChange} className="col-span-3 p-2 border rounded">
              <option value="">Selecione o tipo</option>
              {types.map((type) => (
                <option key={type.id} value={type.id}>{type.name}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">Preço</Label>
            <Input id="price" type="number" value={form.price} onChange={handleInputChange} className="col-span-3" min={0} />
          </div>

          {["rooms", "bathrooms", "area"].map((field) => (
            <div key={field} className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor={field} className="text-right">
                {field === "rooms" && "Quartos"}
                {field === "bathrooms" && "Banheiros"}
                {field === "area" && "Área (m²)"}
              </Label>
              <Input
                id={field}
                type="number"
                value={(form as any)[field]}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
          ))}

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="address" className="text-right">Endereço</Label>
            <Input id="address" value={form.address} onChange={handleInputChange} className="col-span-3" />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="city" className="text-right">Distrito</Label>
            <select
              id="city"
              value={form.city}
              onChange={handleInputChange}
              className="col-span-3 p-2 border rounded"
            >
              <option value="">Selecione um distrito</option>
              {distritosDePortugal.map((distrito) => (
                <option key={distrito} value={distrito}>{distrito}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="zipCode" className="text-right">CEP</Label>
            <Input id="zipCode" value={form.zipCode} onChange={handleInputChange} className="col-span-3" />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="images" className="text-right">Fotos</Label>
            <Input id="images" type="file" multiple accept="image/*" onChange={handleImageUpload} className="col-span-3" />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="agentId" className="text-right">Agente</Label>
            <select
              id="agentId"
              value={form.agentId}
              disabled
              className="col-span-3 p-2 border rounded bg-gray-100 text-gray-600 cursor-not-allowed"
            >
              <option value={currentUser?.id}>{currentUser?.name}</option>
            </select>
          </div>
        </div>

        <DialogFooter>
          <Button onClick={handleSubmit}>Cadastrar</Button>
          <Button variant="outline" onClick={() => setIsOpen(false)}>Cancelar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
