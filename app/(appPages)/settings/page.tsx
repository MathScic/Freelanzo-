// app/(appPages)/settings/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function SettingsPage() {
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (data?.user) {
        setEmail(data.user.email || "");
        setUserId(data.user.id);
      } else {
        router.push("/login");
      }
    };
    getUser();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const handleDeleteAccount = async () => {
    const confirm = window.confirm(
      "Êtes-vous sûr de vouloir supprimer votre compte ? Toutes vos données seront perdues."
    );

    if (!confirm) return;

    try {
      //Supprime les factures
      await supabase.from("invoices").delete().eq("user_id", userId);

      //Supprime le client
      await supabase.from("clients").delete().eq("user_id", userId);

      // Déconnexion (car on ne peut pas supprimer auth.user côté client)
      await supabase.auth.signOut();
      alert(
        "Données supprimées. Pour supprimer votre compte définitivement, contactez l’administrateur."
      );
      router.push("/login");
    } catch (err) {
      console.error("❌ Erreur lors de la suppression :", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-400 to-pink-200 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Paramètres</h1>
        <p className="mb-6">
          Connecté en tant que : <strong>{email}</strong>
        </p>
        <button
          onClick={handleLogout}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-full mb-6"
        >
          Se déconnecter
        </button>

        <button
          onClick={handleDeleteAccount}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded w-full"
        >
          Supprimer mon compte
        </button>
      </div>
    </div>
  );
}
