import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { RegisterForm } from "@/components/myComponents/cadastro"
export default function CadastroPage() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="flex w-full max-w-5xl bg-white rounded-2xl shadow-lg overflow-hidden lg:grid lg:grid-cols-2">
        
        <div className="relative hidden lg:block">
          <img
            src="https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="Imagem de casa"
            className="h-full w-full object-cover rounded-l-2xl"
          />
        </div>

        <div className="flex flex-col justify-center items-center p-6 md:p-10">
          <RegisterForm />
        </div>
      </div>
    </div>
  )
}