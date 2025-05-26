import { Houses } from "@/components/myComponents/Houses";

export default function HousesPage() {
  return (
    <div className="w-full ">
     <header>
        <h1 className="p-2.5 text-2xl font-medium mb-5">Imóveis</h1>
      </header>
      <Houses />
    </div>
  );
}
