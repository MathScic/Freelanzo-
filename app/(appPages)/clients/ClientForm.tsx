"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { onAdd } from "./useClient"; // Vérifie le bon chemin si besoin

export default function ClientForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onAdd({ name, email, company });
      setName("");
      setEmail("");
      setCompany("");
      toast.success("Client ajouté 🎉");
    } catch (error) {
      toast.error("Erreur lors de l'ajout");
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
