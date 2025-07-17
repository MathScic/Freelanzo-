"use client";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ClientForm({
  onAdd,
}: {
  onAdd: (client: any) => Promise<void>;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const error = await onAdd({ name, email, company });
    if (error) {
      toast.error("Erreur lors de l'ajout");
    } else {
      setName("");
      setEmail("");
      setCompany("");
      toast.success("Client ajouté 🎉");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 space-y-4 bg-white p-6 rounded shadow"
    >
      <div>
        <label className="block mb-1 font-medium">Nom</label>
        <input
          className="w-full border p-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Email</label>
        <input
          className="w-full border p-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Société</label>
        <input
          className="w-full border p-2 rounded"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          required
        />
      </div>
      <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-800">
        Ajouter client
      </button>
    </form>
  );
}
