"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { usersServices } from "@/api/Users";
import { UserData, RegisterUserPayload } from "@/data/UserData";
import { toast } from "sonner";

export function RegisterForm() {
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

  // Validação de email
  const validateEmail = (email: string) => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(email);
  };

  // Validação de telefone (opcional, só um exemplo simples)
  const validatePhone = (phone: string) => {
    const re = /^[0-9]{10,15}$/; // Pode ser ajustado conforme necessário
    return re.test(phone);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setForm({ ...form, [id]: value });

    // Resetando o erro específico ao digitar
    if (id === "email" && !validateEmail(value)) {
      setErrors({ ...errors, email: "E-mail inválido" });
    } else if (id === "phone" && !validatePhone(value)) {
      setErrors({ ...errors, phone: "Telefone inválido" });
    } else {
      setErrors({ ...errors, [id]: "" }); // Limpar erro
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validações
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

    const userData: RegisterUserPayload = {
      name: form.name,
      email: form.email,
      phone: form.phone,
      password: form.password,
    };

    try {
      setLoading(true);

      // 1. Criar conta
      await usersServices.createUser(userData);
      toast.success("Cadastro realizado com sucesso!");

      // 3. Redirecionar para home
      router.replace("/confirm");
      router.refresh();
    } catch (err: any) {
      toast.error("Erro ao cadastrar usuário. Verifique os dados e tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  // Garantir que isButtonDisabled seja sempre um valor booleano
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
        <h1 className="text-2xl font-bold">Criar Conta</h1>
        <p className="text-sm text-muted-foreground">Preencha os dados para se cadastrar</p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Nome completo</Label>
          <Input
            id="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <Label htmlFor="email">E-mail</Label>
          <Input
            id="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
          />
          {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
        </div>

        <div>
          <Label htmlFor="phone">Telefone</Label>
          <Input
            id="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            required
          />
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

        <Button
          type="submit"
          className="w-full"
          disabled={isButtonDisabled}
        >
          {loading ? "Cadastrando..." : "Cadastrar"}
        </Button>
      </div>

      <p className="text-sm text-center text-muted-foreground">
        Já tem uma conta?{" "}
        <a href="/login" className="text-blue-600 hover:underline">
          Faça login
        </a>
      </p>
    </form>
  );
}
