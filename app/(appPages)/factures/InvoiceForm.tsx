"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import toast from "react-hot-toast";

export default function InvoiceForm({
  onAdd,
}: {
  onAdd: (invoice: any) => Promise<void>;
}) {
  const [clientId, setClientId] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("en attente");
  const [issuedAt, setIssuedAt] = useState("");
  const [description, setDescription] = useState("");
  const [clients, setClients] = useState<any[]>([]);

  useEffect(() => {
    const fetchClients = async () => {
      const { data } = await supabase.from("clients").select("id, name");
      setClients(data || []);
    };
    fetchClients();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.getUser();
    const userId = data?.user?.id;

    if (!userId || error) {
      toast.error("Utilisateur non identifié");
      return;
    }

    const invoice = {
      user_id: userId,
      client_id: clientId,
      amount: parseFloat(amount),
      status,
      issued_at: new Date(issuedAt).toISOString(),
      description,
    };

    const err = await onAdd(invoice);
    if (err) {
      toast.error("Erreur lors de l’ajout de la facture");
    } else {
      toast.success("Facture ajoutée 🎉");
      setClientId("");
      setAmount("");
      setStatus("en attente");
      setIssuedAt("");
      setDescription("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded shadow space-y-4 mb-6"
    >
      <div>
        <label className="block mb-1">Client</label>
        <select
          value={clientId}
          onChange={(e) => setClientId(e.target.value)}
          className="w-full border p-2 rounded"
          required
        >
          <option value="">-- Sélectionner un client --</option>
          {clients.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block mb-1">Montant</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
      </div>

      <div>
        <label className="block mb-1">Date</label>
        <input
          type="date"
          value={issuedAt}
          onChange={(e) => setIssuedAt(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
      </div>

      <div>
        <label className="block mb-1">Statut</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full border p-2 rounded"
          required
        >
          <option value="en attente">En attente</option>
          <option value="payée">Payée</option>
        </select>
      </div>

      <div>
        <label className="block mb-1">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border p-2 rounded"
        />
      </div>

      <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-800">
        Ajouter la facture
      </button>
    </form>
  );
}
