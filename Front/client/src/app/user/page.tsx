import HeroSection from "@/components/myComponents/HeroSection";
import TrendingHomes from "@/components/myComponents/TrendingHomes";
import { InfoCards } from "@/components/myComponents/InfoCard";
import { RandomDistrictHomes } from "@/components/myComponents/RandomDistrictsHome";
export default function Page() {
  return (
    <div className="flex flex-col min-h-screen ">
      <HeroSection />
      <main className="flex flex-col flex-1 bg-gray-100">
        <TrendingHomes />
         <InfoCards/>
        <RandomDistrictHomes />
      </main>
    </div>
  );
}
