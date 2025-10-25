import { LoginForm } from "@/components/myComponents/login-form";

export default function LoginPage() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
        <div className="mt-8">
          <p>use estas credenciais para login:</p>
          <p>Email: admin@example.com</p>
          <p>Senha: 1234</p>
        </div>
      </div>
    </div>
  );
}