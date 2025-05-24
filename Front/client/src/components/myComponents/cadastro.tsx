import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function RegisterForm() {
  return (
    <form className="space-y-6 w-full max-w-sm">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Criar Conta</h1>
        <p className="text-sm text-muted-foreground">
          Preencha os dados para se cadastrar
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Nome completo</Label>
          <Input id="name" type="text" placeholder="Seu nome completo" required />
        </div>

        <div>
          <Label htmlFor="email">E-mail</Label>
          <Input id="email" type="email" placeholder="email@exemplo.com" required />
        </div>

        <div>
          <Label htmlFor="phone">Telefone</Label>
          <Input id="phone" type="tel" placeholder="+351 931124727" />
        </div>

        <div>
          <Label htmlFor="password">Senha</Label>
          <Input id="password" type="password" placeholder="Crie uma senha" required />
        </div>

        <div>
          <Label htmlFor="confirm-password">Confirmar senha</Label>
          <Input id="confirm-password" type="password" placeholder="Repita a senha" required />
        </div>

        <Button type="submit" className="w-full">
          Cadastrar
        </Button>
      </div>

      <p className="text-sm text-center text-muted-foreground">
        Já tem uma conta?{" "}
        <a href="/login" className="text-blue-600 hover:underline">
          Faça login
        </a>
      </p>
    </form>
  )
}
