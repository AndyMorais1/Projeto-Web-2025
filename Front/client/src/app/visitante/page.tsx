import HeroSection from "@/components/myComponents/HeroSection";
import TrendingHomes from "@/components/myComponents/TrendingHomes2";
import { InfoCards } from "@/components/myComponents/InfoCard2";
import { RandomDistrictHomes } from "@/components/myComponents/RandomDistrictsHome2";
import TopAgents from "@/components/myComponents/TopAgents2";
export default function Page() {
  return (
    <div className="flex flex-col min-h-screen ">
      <HeroSection />
      <main className="flex flex-col flex-1 bg-gray-100">
        <TrendingHomes />
         <InfoCards/>
        <RandomDistrictHomes />
        <TopAgents />
      </main>
    </div>
  );
}
