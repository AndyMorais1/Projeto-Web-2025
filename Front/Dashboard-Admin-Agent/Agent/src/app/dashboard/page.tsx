// DashboardPage.tsx
import { Cards } from "@/components/myComponents/Cards";
import { Chart1 } from "@/components/myComponents/chart1";

export default function DashboardPage() {
  return (
    <div className="w-full">
      <header>
        <h1 className="p-2.5 text-2xl font-bold mb-5">Painel</h1>
      </header>

      <main>
        <Cards />

        {/* Chart1 em toda a largura com padding */}
        <div className="w-full px-6 pb-6">
          <div className="w-full h-[300px]">
            <Chart1 />
          </div>
        </div>

      </main>
    </div>
  );
}
