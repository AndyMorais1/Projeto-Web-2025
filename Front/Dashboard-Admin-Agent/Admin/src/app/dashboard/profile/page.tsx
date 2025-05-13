"use client";
import { BackButton } from "@/components/myComponents/BackButton";
import { AvatarDemo } from "@/components/myComponents/myAvatar";
import { useUsers } from "@/contexts/UsersContext";
import { DialogEditProfile } from "@/components/myComponents/DialogEditProfile";

export default function ProfilePage() {
  const { currentUser } = useUsers();
  return (
    <div className="w-full">
      <nav className="flex  p-2.5 mb-5">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-medium">Profile</h1>
        </div>
      </nav>
      <div className="flex flex-col gap-4  w-full h-screen ">
        <div className="w-full flex flex-col items-center justify-center p-4">
          <AvatarDemo />
          <h1 className="text-2xl font-medium p-2">{currentUser?.name}</h1>
          <p className="text-gray">{currentUser?.email}</p>
          <DialogEditProfile />
        </div>

      </div>
    </div>
  );
}
