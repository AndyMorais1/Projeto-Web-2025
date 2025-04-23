
import { BackButton } from "@/components/myComponents/BackButton";
export default function ProfilePage() {
    return (
      <div className=" w-full">
        <nav className="flex items-center justify-between p-4 mb-5">
        <BackButton />
        <h1 className=" text-2xl font-medium">Profile</h1>
        </nav>
      </div>
    );
  }