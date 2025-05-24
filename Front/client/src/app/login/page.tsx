import { LoginForm } from "@/components/myComponents/login"

export default function LoginPage() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="flex w-full max-w-4xl h-[600px] bg-white rounded-2xl shadow-lg overflow-hidden lg:grid lg:grid-cols-2">
        
        {/* Imagem à esquerda */}
        <div className="relative hidden lg:block">
          <img
            src="https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="Imagem de casa"
            className="h-full w-full object-cover rounded-l-2xl"
          />
        </div>

        {/* Formulário à direita */}
        <div className="flex flex-col justify-center items-center p-6 md:p-10">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  )
}
