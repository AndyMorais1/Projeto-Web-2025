"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usersServices } from "@/api/Users";
import { useUsers } from "@/contexts/UsersContext";
import { useHouses } from "@/contexts/HousesContext";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { initializeUsersData } = useUsers();
  const { initializeHouses } = useHouses();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Chama o serviço de login passando o e-mail e a senha
      const token = await usersServices.login(email, password);

      // Caso o token não seja retornado (e-mail ou senha incorretos)
      if (!token) {
        toast.error("E-mail ou senha incorretos.");
        return;
      }

      // Inicializando dados necessários após o login bem-sucedido
      await initializeUsersData();
      await initializeHouses();

      // Exibe mensagem de sucesso e redireciona para a página do usuário
      toast.success("Login realizado com sucesso!");
      router.replace("/user");
      router.refresh();
    } catch (error: any) {
      // Aqui podemos verificar tipos diferentes de erros:

      // Se o erro for devido ao status do usuário (ex: PENDING, INACTIVE)
      if (error.response && error.response.data.message) {
        if (error.response.data.message.includes("Status do usuário é PENDING")) {
          toast.error("Seu status está PENDING. Por favor, aguarde a ativação da sua conta.");
        } else if (error.response.data.message.includes("Acesso negado")) {
          toast.error("Acesso negado. Apenas usuários com status ativo podem acessar.");
        } else {
          toast.error(error.response.data.message); // Outros erros do servidor
        }
      }
      // Se o erro for de autenticação ou falha no login
      else if (error.message && error.message.includes("E-mail ou senha incorretos")) {
        toast.error("E-mail ou senha incorretos.");
      }
      // Caso de erro de rede ou falha na requisição (ex: servidor não responde)
      else if (error.message && error.message.includes("Network Error")) {
        toast.error("Erro de rede. Verifique sua conexão e tente novamente.");
      }
      // Para outros tipos de erro inesperados
      else {
        toast.error("Erro ao fazer login. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  };


  return (
    <form
      onSubmit={handleSubmit}
      className={cn("flex flex-col items-center gap-6 w-full", className)}
      {...props}
    >
      <div className="text-center">
        <h1 className="text-2xl font-bold">Acesse sua conta</h1>
        <p className="text-sm text-muted-foreground">
          Insira seu e-mail abaixo para entrar na plataforma
        </p>
      </div>

      <div className="w-full max-w-xs space-y-6">
        <div className="grid gap-2 text-left">
          <Label htmlFor="email" className="w-fit">E-mail</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@exemplo.com"
            required
          />
        </div>

        <div className="grid gap-2 text-left">
          <div className="flex items-center justify-between">
            <Label htmlFor="password" className="w-fit">Senha</Label>
            <a
              href="#"
              className="text-sm underline-offset-4 hover:underline text-blue-600"
            >
              Esqueceu a senha?
            </a>
          </div>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Entrando..." : "Entrar"}
        </Button>
      </div>

      <p className="text-sm text-center text-muted-foreground">
        Ainda não tem uma conta?{" "}
        <a href="/cadastro" className="text-blue-600 hover:underline">
          Cadastre-se
        </a>
      </p>
    </form>
  );
}
