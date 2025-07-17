"use client";

import ClientForm from "./ClientForm";
import ClientList from "./ClientList";
import { useClients } from "./useClient";

export default function ClientPage() {
  const { clients, loading, addClient, deleteClient, updateClient } =
    useClients();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Clients</h1>
      <ClientForm onAdd={addClient} />
      {loading ? (
        <p>Chargement...</p>
      ) : (
        <ClientList
          clients={clients}
          onDelete={deleteClient}
          onUpdate={updateClient}
        />
      )}
    </div>
  );
}
