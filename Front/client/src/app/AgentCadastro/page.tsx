import { RegisterAgentForm } from "@/components/myComponents/RegisterAgentForm";

export default function CadastroAgentePage() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="flex w-full max-w-5xl bg-white rounded-2xl shadow-lg overflow-hidden lg:grid lg:grid-cols-2">
        <div className="relative hidden lg:block">
          <img
            src="https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="Imagem de agente imobiliário"
            className="h-full w-full object-cover rounded-l-2xl"
          />
        </div>

        <div className="flex flex-col justify-center items-center p-6 md:p-10">
          <RegisterAgentForm />
        </div>
      </div>
    </div>
  );
}
