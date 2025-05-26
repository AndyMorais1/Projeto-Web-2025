// DashboardPage.tsx
import { Cards } from "@/components/myComponents/Cards";
<<<<<<< HEAD
import { Component1 } from "@/components/myComponents/chart1";
import { Component2 } from "@/components/myComponents/chart2";
import { Component3 } from "@/components/myComponents/chart3";
=======
import { Chart1 } from "@/components/myComponents/chart1";
>>>>>>> main

export default function DashboardPage() {
  return (
    <div className="w-full">
<<<<<<< HEAD
      <h1 className="p-2.5 text-2xl font-medium mb-5">Dashboard</h1>
      <Cards />

      {/* Gráficos centralizados e mais largos */}
      <div className="flex justify-center p-6 ">
        <div className="flex flex-wrap justify-center gap-6 max-w-6xl w-full">
          <div className="flex-1 min-w-[320px] max-w-lg">
            <Component3 />
          </div>
          <div className="flex-1 min-w-[320px] max-w-lg">
            <Component2 />
          </div>
        </div>
      </div>
=======
      <header>
        <h1 className="p-2.5 text-2xl font-medium mb-5">Painel</h1>
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
>>>>>>> main
    </div>
  );
}
