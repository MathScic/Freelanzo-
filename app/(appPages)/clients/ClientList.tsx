"use client";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ClientList({
  clients,
  onDelete,
  onUpdate,
}: {
  clients: any[];
  onDelete: (id: string) => Promise<void>;
  onUpdate: (id: string, data: any) => Promise<void>;
}) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState({
    name: "",
    email: "",
    company: "",
  });

  const handleEdit = (client: any) => {
    setEditingId(client.id);
    setEditData({
      name: client.name,
      email: client.email,
      company: client.company,
    });
  };

  const handleUpdate = async () => {
    if (!editingId) return;
    const error = await onUpdate(editingId, editData);
    if (error) toast.error("Erreur mise à jour");
    else toast.success("Client modifié 🚀");
    setEditingId(null);
  };

  return (
    <ul className="space-y-2">
      {clients.map((client) => (
        <li
          key={client.id}
          className="p-4 bg-white rounded shadow flex justify-between items-center"
        >
          {editingId === client.id ? (
            <div className="flex flex-col space-y-2 flex-1 mr-4">
              <input
                className="border p-1 rounded"
                value={editData.name}
                onChange={(e) =>
                  setEditData({ ...editData, name: e.target.value })
                }
              />
              <input
                className="border p-1 rounded"
                value={editData.email}
                onChange={(e) =>
                  setEditData({ ...editData, email: e.target.value })
                }
              />
              <input
                className="border p-1 rounded"
                value={editData.company}
                onChange={(e) =>
                  setEditData({ ...editData, company: e.target.value })
                }
              />
              <button
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 mt-2"
                onClick={handleUpdate}
              >
                Valider
              </button>
            </div>
          ) : (
            <div>
              <p className="font-semibold">{client.name}</p>
              <p className="text-sm text-gray-500">{client.email}</p>
              <p className="text-sm">{client.company}</p>
            </div>
          )}
          <div className="flex flex-col space-y-2">
            {editingId !== client.id && (
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                onClick={() => handleEdit(client)}
              >
                Modifier
              </button>
            )}
            <button
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              onClick={() => {
                if (window.confirm("Supprimer ce client ?"))
                  onDelete(client.id);
              }}
            >
              Supprimer
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
