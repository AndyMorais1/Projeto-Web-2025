// DashboardPage.tsx
import { Cards } from "@/components/myComponents/Cards";

export default function DashboardPage() {
  return (
    <div className="w-full">
      <header>
        <h1 className="p-2.5 text-2xl font-medium mb-5">Painel</h1>
      </header>

      <main>
        <Cards />

        <div className="flex w-full p-6">
          <div className="flex flex-wrap justify-between  w-full max-w-7xl mx-auto p-6">
            <div className="flex-1 min-w-[320px] max-w-[500px]">
            </div>
            <div className="flex-1 min-w-[320px] max-w-[500px]">
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
