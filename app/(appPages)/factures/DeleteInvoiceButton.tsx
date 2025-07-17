"use client";

import { supabase } from "@/lib/supabaseClient";
import { toast } from "react-hot-toast";

export default function DeleteInvoiceButton({
  invoiceId,
  onDelete,
}: {
  invoiceId: string;
  onDelete: () => void;
}) {
  const handleDelete = async () => {
    const confirm = window.confirm("Voulez-vous supprimer cette facture ?");
    if (!confirm) return;

    const { data: userData } = await supabase.auth.getUser();
    const userId = userData?.user?.id;

    console.log("🧨 Tentative suppression facture ID :", invoiceId);
    console.log("🔐 Utilisateur actuel :", userId);

    const { error } = await supabase
      .from("invoices")
      .delete()
      .eq("id", invoiceId)
      .eq("user_id", userId);

    if (!error) {
      toast.success("✅ Facture supprimée");
      onDelete(); // Refresh les factures côté parent
    } else {
      console.error("❌ Erreur suppression facture :", error.message);
      toast.error("Erreur lors de la suppression");
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="mt-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
    >
      Supprimer
    </button>
  );
}
