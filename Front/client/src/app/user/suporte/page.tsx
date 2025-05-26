"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useUsers } from "@/contexts/UsersContext";
import { toast } from "sonner";

export default function Support() {
  const { currentUser } = useUsers();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || "");
      setEmail(currentUser.email || "");
    }
  }, [currentUser]);

  const handleSubmit = async () => {
    if (!message.trim()) {
      toast.error("Por favor, escreva uma mensagem.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/email/support", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ from: email, name, message }),
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
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <div className="px-6 py-4 bg-white border-b border-gray-200 justify-center items-center flex">
        <h1 className="text-2xl font-bold ">Suporte</h1>
      </div>

      {/* Main content */}
      <div className="flex-1 px-6 py-8 overflow-y-auto">
        {/* Introdução */}
        <section className="mb-8">
          <p className="text-gray-700 text-lg">
            Precisa de ajuda? Envie uma mensagem ou veja as perguntas frequentes abaixo.
          </p>
        </section>

        {/* Contato */}
        <section className="bg-white p-6 rounded-xl shadow border mb-10 space-y-2">
          <h2 className="text-xl font-semibold">Contato</h2>
          <p><strong>Email:</strong> spothome8@gmail.com</p>
          <p><strong>Telefone:</strong> +351 931 414 252</p>
          <p><strong>Atendimento:</strong> Segunda a Sexta, 9h às 18h</p>
        </section>

        {/* Formulário */}
        <section className="bg-white p-6 rounded-xl shadow border mb-10 space-y-4">
          <h2 className="text-xl font-semibold">Envie uma mensagem</h2>
          <Input placeholder="Seu nome" value={name} readOnly />
          <Input placeholder="Seu email" type="email" value={email} readOnly />
          <Textarea
            placeholder="Escreva sua mensagem..."
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Enviando..." : "Enviar"}
          </Button>
        </section>

        {/* FAQ */}
        <section className="bg-white p-6 rounded-xl shadow border space-y-6">
          <h2 className="text-xl font-semibold mb-2">Perguntas Frequentes</h2>
          <div className="space-y-4 text-sm text-gray-700">
            <div>
              <p className="font-medium">❓ Como posso me tornar um agente?</p>
              <p className="text-gray-600">
                Acesse a seção "Requisições de Agentes" no menu lateral e envie sua solicitação.
              </p>
            </div>
            <div>
              <p className="font-medium">❓ Posso editar uma casa depois de cadastrá-la?</p>
              <p className="text-gray-600">
                Sim! Vá até "Imóveis" e clique em "Editar" no imóvel desejado.
              </p>
            </div>
            <div>
              <p className="font-medium">❓ Onde vejo as mensagens recebidas?</p>
              <p className="text-gray-600">
                Na aba "Usuários", selecione um perfil para visualizar as mensagens vinculadas.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
