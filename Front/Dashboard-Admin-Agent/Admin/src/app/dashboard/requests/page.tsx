import { Requests } from "@/components/myComponents/Requests";
export default function RequestPage() {
  return (
    <div className=" w-full">
      <h1 className="p-2.5 text-2xl font-medium mb-5 ">Agents Requests</h1>
      <Requests />
    </div>
  );
}