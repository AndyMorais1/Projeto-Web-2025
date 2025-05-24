import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  return (
    <form
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
            placeholder="••••••••"
            required
          />
        </div>

        <Button type="submit" className="w-full">
          Entrar
        </Button>
      </div>

      <p className="text-sm text-center text-muted-foreground">
        Ainda não tem uma conta?{" "}
        <a href="/cadastro" className="text-blue-600 hover:underline">
          Cadastre-se
        </a>
      </p>
    </form>
  )
}
