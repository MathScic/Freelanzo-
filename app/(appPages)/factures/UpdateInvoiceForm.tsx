"use client";

import React from "react";

export default function UpdateInvoiceForm({
  invoice,
  onChange,
  onSubmit,
  onCancel,
}: {
  invoice: any;
  onChange: (value: any) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}) {
  return (
    <form
      onSubmit={onSubmit}
      className="mt-6 bg-white p-6 rounded shadow space-y-4"
    >
      <h2 className="text-lg font-semibold">Modifier la facture</h2>

      <div>
        <label className="block mb-1">Montant</label>
        <input
          type="number"
          value={invoice.amount}
          onChange={(e) => onChange({ ...invoice, amount: e.target.value })}
          className="w-full border p-2 rounded"
          required
        />
      </div>

      <div>
        <label className="block mb-1">Statut</label>
        <select
          value={invoice.status}
          onChange={(e) => onChange({ ...invoice, status: e.target.value })}
          className="w-full border p-2 rounded"
        >
          <option value="en attente">En attente</option>
          <option value="payée">Payée</option>
        </select>
      </div>

      <div>
        <label className="block mb-1">Description</label>
        <textarea
          value={invoice.description}
          onChange={(e) =>
            onChange({ ...invoice, description: e.target.value })
          }
          className="w-full border p-2 rounded"
        />
      </div>

      <div className="flex space-x-2">
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Valider les modifications
        </button>

        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
        >
          Annuler
        </button>
      </div>
    </form>
  );
}
