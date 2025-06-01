"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { usersServices } from "@/api/Users";
import { RegisterUserPayload } from "@/data/UserData";
import { toast } from "sonner";

export function RegisterAgentForm() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone: string) => /^[0-9]{10,15}$/.test(phone);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setForm({ ...form, [id]: value });

    if (id === "email" && !validateEmail(value)) {
      setErrors({ ...errors, email: "E-mail inválido" });
    } else if (id === "phone" && !validatePhone(value)) {
      setErrors({ ...errors, phone: "Telefone inválido" });
    } else {
      setErrors({ ...errors, [id]: "" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      toast.error("As senhas não coincidem.");
      return;
    }

    if (!validateEmail(form.email)) {
      toast.error("E-mail inválido.");
      return;
    }

    if (!validatePhone(form.phone)) {
      toast.error("Telefone inválido.");
      return;
    }

    const agentData: RegisterUserPayload = {
      name: form.name,
      email: form.email,
      phone: form.phone,
      password: form.password,
      role: "AGENT",
    };

    try {
      setLoading(true);
      await usersServices.createUser(agentData);
      toast.success("Cadastro de agente realizado com sucesso!");
      router.replace("/confirmAgent");
      router.refresh();
    } catch (err) {
      toast.error("Erro ao cadastrar agente. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const isButtonDisabled =
    loading ||
    !form.name ||
    !form.email ||
    !form.phone ||
    !form.password ||
    !form.confirmPassword ||
    Boolean(errors.email) ||
    Boolean(errors.phone);

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-sm">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Cadastro de Agente</h1>
        <p className="text-sm text-muted-foreground">
          Torne-se um agente da plataforma
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Nome completo</Label>
          <Input id="name" value={form.name} onChange={handleChange} required />
        </div>

        <div>
          <Label htmlFor="email">E-mail</Label>
          <Input id="email" value={form.email} onChange={handleChange} required />
          {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
        </div>

        <div>
          <Label htmlFor="phone">Telefone</Label>
          <Input id="phone" value={form.phone} onChange={handleChange} required />
          {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}
        </div>

        <div>
          <Label htmlFor="password">Senha</Label>
          <Input
            id="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <Label htmlFor="confirmPassword">Confirmar senha</Label>
          <Input
            id="confirmPassword"
            type="password"
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>

        <Button type="submit" className="w-full" disabled={isButtonDisabled}>
          {loading ? "Cadastrando..." : "Cadastrar como Agente"}
        </Button>
      </div>

      
    </form>
  );
}
