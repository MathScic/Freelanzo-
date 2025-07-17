"use client";

import InvoiceForm from "./InvoiceForm";
import { supabase } from "@/lib/supabaseClient";
import React, { useState, useEffect } from "react";
import UpdateInvoiceForm from "./UpdateInvoiceForm";
import DeleteInvoiceButton from "./DeleteInvoiceButton";

export default function FacturesPage() {
  const [invoices, setInvoices] = useState<any[]>([]);
  const [editingInvoice, setEditingInvoice] = useState<any | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const fetchInvoices = async () => {
    const { data } = await supabase
      .from("invoices")
      .select("*, clients(name)")
      .order("issued_at", { ascending: false });

    setInvoices(data || []);
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  const handleAddInvoice = async (invoice: any) => {
    const { error } = await supabase.from("invoices").insert([invoice]);
    if (!error) fetchInvoices();
    return error;
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase
      .from("invoices")
      .update({
        amount: parseFloat(editingInvoice.amount),
        status: editingInvoice.status,
        description: editingInvoice.description,
      })
      .eq("id", editingInvoice.id);

    if (!error) {
      fetchInvoices();
      setEditingInvoice(null);
    } else {
      console.error("❌ Erreur mise à jour facture :", error.message);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Mes factures</h1>

      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <input
          type="text"
          placeholder="Recherche client ..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-full sm:w-1/2"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border p-2 rounded w-full sm:w-1/3"
        >
          <option value="">Tous les status</option>
          <option value="payée">Payée</option>
          <option value="en attente">En attente</option>
        </select>
      </div>

      <InvoiceForm onAdd={handleAddInvoice} />

      <div className="space-y-2 mt-6">
        {invoices
          .filter((inv) => {
            const clientName = inv.clients?.name?.toLowerCase() || "";
            const matchName = clientName.includes(search.toLowerCase());
            const matchStatus = statusFilter
              ? inv.status === statusFilter
              : true;
            return matchName && matchStatus;
          })
          .map((inv) => (
            <div className="p-4 bg-white rounded shadow" key={inv.id}>
              <p className="font-semibold">Montant : {inv.amount} €</p>
              <p className="text-sm">Client : {inv.clients?.name}</p>
              <p className="text-sm">Date : {inv.issued_at}</p>
              <p className="text-sm">Statut : {inv.status}</p>
              <p className="text-sm text-gray-600">{inv.description}</p>
              <div className="flex gap-2 mt-2">
                <DeleteInvoiceButton
                  invoiceId={inv.id}
                  onDelete={fetchInvoices}
                />
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  onClick={() => setEditingInvoice(inv)}
                >
                  Modifier
                </button>
              </div>
            </div>
          ))}

        {invoices.filter((inv) => {
          const clientName = inv.clients?.name?.toLowerCase() || "";
          const matchName = clientName.includes(search.toLowerCase());
          const matchStatus = statusFilter ? inv.status === statusFilter : true;
          return matchName && matchStatus;
        }).length === 0 && (
          <p className="text-gray-500 text-center mt-4">
            Aucune facture trouvée.
          </p>
        )}
      </div>

      {editingInvoice && (
        <UpdateInvoiceForm
          invoice={editingInvoice}
          onChange={setEditingInvoice}
          onSubmit={handleUpdate}
          onCancel={() => setEditingInvoice(null)}
        />
      )}
    </div>
  );
}
