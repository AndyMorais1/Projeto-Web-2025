import { Cards } from "@/components/myComponents/Cards";
export default function HomePage() {
  return (
    <div className=" w-full ">
      <h1 className="p-2.5 text-2xl font-medium mb-5 ">Home</h1>
      <Cards />
      <div className="  text-center p-2 mt-5">Charts</div>
    </div>
  );
}
