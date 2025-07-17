"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { useClients } from "./useClient"; // adapte le chemin si besoin

export default function ClientForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");

  const { addClient } = useClients();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const error = await addClient({ name, email, company });

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
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name">Nom</label>
        <input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input"
          required
        />
      </div>
      <div>
        <label htmlFor="email">E-mail</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input"
          required
        />
      </div>
      <div>
        <label htmlFor="company">Entreprise</label>
        <input
          id="company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="input"
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Ajouter le client
      </button>
    </form>
  );
}
