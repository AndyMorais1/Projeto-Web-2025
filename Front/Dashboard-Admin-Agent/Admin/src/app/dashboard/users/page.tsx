import { UserTable } from "@/components/myComponents/UserTable";
import { UsersProvider } from "@/data/UsersContext";
export default function UsersPage() {
  return (
    <div className="w-full">
      <h1 className="p-2.5 text-2xl font-medium mb-5 ">Users</h1>
      <UserTable />
    </div>
  );
}
