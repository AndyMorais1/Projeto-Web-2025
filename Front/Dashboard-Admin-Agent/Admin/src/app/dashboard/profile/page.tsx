"use client";
import React from "react";
import { useUsers } from "@/contexts/UsersContext";
import { DialogEditProfile } from "@/components/myComponents/DialogEditProfile";

export default function ProfilePage() {
    const { currentUser } = useUsers();
    return (
        <div className="flex flex-col min-h-screen w-full">
            <header>
                <h1 className="p-2.5 text-2xl font-medium mb-5">Perfil</h1>
            </header>
            <div className="flex flex-col items-center justify-center w-full p-6 mt-8">
                {/* Imagem do usuário */}
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-600 mb-4">
                    <img
                        src={currentUser?.photo}
                        alt="User Avatar"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Nome do usuário */}
                <h2 className="text-xl font-semibold">{currentUser?.name}</h2>

                {/* Email do usuário */}
                <p className="mt-2 mb-2 text-gray-600">{currentUser?.email}</p>

                {/* Botão de editar perfil */}
                <DialogEditProfile />
            </div>
        </div>
    );
}
