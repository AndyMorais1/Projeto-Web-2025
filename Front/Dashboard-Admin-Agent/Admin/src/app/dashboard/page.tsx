import { Cards } from "@/components/myComponents/Cards";
import { Component1 } from "@/components/myComponents/chart1";
import { Component2 } from "@/components/myComponents/chart2";
import { Component3 } from "@/components/myComponents/chart3";

export default function DashboardPage() {
  return (
    <div className="w-full">
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
    </div>
  );
}
