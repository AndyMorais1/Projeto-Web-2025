"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usersServices } from "@/api/Users";
import { useUsers } from "@/contexts/UsersContext";
import { useHouses } from "@/contexts/HousesContext";


export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { initializeUsersData } = useUsers(); // <-- usaremos a função do contexto para inicializar dados
  const { initializeHouses } = useHouses();


  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null); // Resetando erro no início do processo de login

    try {
      // Realizando o login e obtendo o token
      const token = await usersServices.login(email, password);

      if (token) {
        // Inicializando dados do contexto após login bem-sucedido
        await initializeUsersData();
        await initializeHouses();
        router.push("/dashboard"); // Redirecionar após login bem-sucedido
      } else {
        setError("Email ou senha inválidos.");
      }
    } catch (error: any) {
      console.error("Erro no login:", error);
      setError("Ocorreu um erro ao tentar fazer login. Tente novamente.");
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <Button type="submit" className="w-full">
                Login
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
