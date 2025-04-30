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
import { Type } from "@/data/HouseData";
import { useHouses } from "@/contexts/HousesContext";
import { toast } from "sonner"; 

export function DialogCreateHouse() {
  const { users } = useUsers(); // Pegando os usuários do contexto
  const [agents, setAgents] = React.useState<UserData[]>([]);
  const [images, setImages] = React.useState<File[]>([]);
  const [isOpen, setIsOpen] = React.useState(false); 
  const { refreshHouses } = useHouses();

  const [form, setForm] = React.useState({
    title: "", description: "", type: Type.APARTMENT, price: "",
    agentId: "", address: "", city: "", zipCode: "",
    rooms: "", bathrooms: "", area: "",
  });

  // Usando o hook useEffect para filtrar os agentes do contexto
  React.useEffect(() => {
    // Filtra os agentes a partir dos usuários carregados no contexto
    const filteredAgents = users.filter(user => user.role === "AGENT");
    setAgents(filteredAgents);
  }, [users]); // Isso vai ser executado sempre que 'users' mudar

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
      alert("You can only upload up to 5 images.");
    }
  };

  const convertImagesToBase64 = async (): Promise<string[]> => {
    const base64Promises = images.map(file => {
      return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    });
    return Promise.all(base64Promises);
  };

  const handleSubmit = async () => {
    try {
      const imagesBase64 = await convertImagesToBase64();

      const payload = {
        title: form.title,
        description: form.description,
        type: form.type as Type,
        price: Number(form.price),
        agentId: form.agentId,
        images: imagesBase64,
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
      };

      const created = await housesServices.createHouse(payload);
      if (created) {
         toast.success("Casa Criada com sucesso!",{
                  description: `Casa criada com sucesso!`,
                  duration: 3000,
                });
        await refreshHouses(); // Atualiza a lista de casas
        setIsOpen(false);
        setForm({
          title: "", description: "", type: Type.APARTMENT, price: "",
          agentId: "", address: "", city: "", zipCode: "",
          rooms: "", bathrooms: "", area: "",
        });
        setImages([]);
      } else {
        alert("Failed to create house.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Erro ao criar casa.",{
        description: "Erro ao criar casa.",
        duration: 3000,
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setIsOpen(true)}>
          <CirclePlus className="mr-2" />
          Create House
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create House</DialogTitle>
          <DialogDescription>Enter house details to create a listing.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {/* Campos de texto */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">Title</Label>
            <Input id="title" value={form.title} onChange={handleInputChange} className="col-span-3" />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">Description</Label>
            <Textarea id="description" value={form.description} onChange={handleInputChange} className="col-span-3" />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="type" className="text-right">Type</Label>
            <select id="type" value={form.type} onChange={handleInputChange} className="col-span-3 p-2 border rounded">
              {Object.values(Type).map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">Price</Label>
            <Input id="price" type="number" value={form.price} onChange={handleInputChange} className="col-span-3" min={0} />
          </div>

          {/* Detalhes */}
          {["rooms", "bathrooms", "area"].map((field) => (
            <div key={field} className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor={field} className="text-right">{field.charAt(0).toUpperCase() + field.slice(1)}</Label>
              <Input
                id={field}
                type="number"
                value={(form as any)[field]}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
          ))}

          {/* Localização */}
          {["address", "city", "zipCode"].map((field) => (
            <div key={field} className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor={field} className="text-right">{field.charAt(0).toUpperCase() + field.slice(1)}</Label>
              <Input
                id={field}
                value={(form as any)[field]}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
          ))}

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

          {/* Agente */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="agentId" className="text-right">Agent</Label>
            <select
              id="agentId"
              value={form.agentId}
              onChange={handleInputChange}
              className="col-span-3 p-2 border rounded"
            >
              <option value="">Select an agent</option>
              {agents.map(agent => (
                <option key={agent.id} value={agent.id}>{agent.name}</option>
              ))}
            </select>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit}>Create</Button>
          <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
