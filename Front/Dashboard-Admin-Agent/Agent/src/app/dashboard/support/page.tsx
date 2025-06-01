"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useUsers } from "@/contexts/UsersContext";
import { toast } from "sonner";

export default function Support() {
  const { currentUser } = useUsers();
  const [name, setName] = useState(currentUser?.name || "");
  const [email, setEmail] = useState(currentUser?.email || "");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Atualiza os valores quando currentUser for carregado
  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || "");
      setEmail(currentUser.email || "");
    }
  }, [currentUser]);

  const handleSubmit = async () => {
  setLoading(true);

  try {
    const res = await fetch("http://localhost:3000/email/support", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: email,
        name,
        message,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      toast.success(data.message || "Mensagem enviada com sucesso!");
      setMessage("");
    } else {
      toast.error(data.error || "Erro ao enviar mensagem.");
    }
  } catch (err) {
    toast.error("Erro de conexão com o servidor.");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="flex flex-col h-screen w-full overflow-hidden">
      {/* Cabeçalho */}
      <div className="px-6 py-4 border-b border-gray-200 bg-white z-10">
        <h1 className="text-2xl font-bold">Suporte</h1>
      </div>

      {/* Conteúdo */}
      <div className="flex-1 overflow-y-auto px-6 py-6 bg-gray-50">
        {/* Introdução */}
        <section className="mb-10">
          <p className="text-lg text-gray-700">
            Precisa de ajuda? Entre em contato conosco ou veja as perguntas frequentes abaixo.
          </p>
        </section>

        {/* Informações de contato */}
        <section className="bg-white p-6 rounded-xl shadow border mb-10 space-y-2">
          <h2 className="text-xl font-semibold">Contato</h2>
          <p>Email: spothome8@gmail.com</p>
          <p>Telefone: +351 931 414 252</p>
          <p>Horário de atendimento: Segunda a Sexta, 9h às 18h</p>
        </section>

        {/* Formulário de mensagem */}
        <section className="bg-white p-6 rounded-xl shadow border mb-10 space-y-4">
          <h2 className="text-xl font-semibold">Envie uma mensagem</h2>
          <Input
            placeholder="Seu nome"
            value={name}
            readOnly
          />
          <Input
            placeholder="Seu email"
            type="email"
            value={email}
            readOnly
          />
          <Textarea
            placeholder="Escreva sua mensagem..."
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button className="w-fit" onClick={handleSubmit} disabled={loading}>
            {loading ? "Enviando..." : "Enviar"}
          </Button>
        </section>
      </div>
    </div>
  );
}
