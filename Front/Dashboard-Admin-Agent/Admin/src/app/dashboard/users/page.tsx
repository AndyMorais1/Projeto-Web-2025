import { UserTable } from "@/components/myComponents/UserTable";
export default function UsersPage() {
  return (
    <div className="w-full">
      <h1 className="p-2.5 text-2xl font-medium mb-5 ">Usuários</h1>
      <UserTable />
    </div>
  );
}
