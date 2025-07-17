"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

export function useClients() {
  const [clients, setClients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchClients = async () => {
    const { data, error } = await supabase.from("clients").select("*");
    if (!error) setClients(data || []);
    setLoading(false);
  };

  const addClient = async (client: {
    name: string;
    email: string;
    company: string;
  }) => {
    const { error } = await supabase.from("clients").insert(client);
    if (!error) await fetchClients();
    return error;
  };

  const deleteClient = async (id: string): Promise<void> => {
    const { error } = await supabase.from("clients").delete().eq("id", id);
    if (error) throw error;
    await fetchClients();
  };

  const updateClient = async (id: string, data: any): Promise<void> => {
    const { error } = await supabase.from("clients").update(data).eq("id", id);
    if (error) throw error;
    await fetchClients();
  };

  useEffect(() => {
    fetchClients();
  }, []);

  return {
    clients,
    loading,
    addClient,
    deleteClient,
    updateClient,
  };
}
