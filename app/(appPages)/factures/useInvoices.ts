"use client";
import { supabase } from "@/lib/supabaseClient";
import { useEffect, useState } from "react";

export default function useInvoices() {
  const [invoices, setInvoices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchInvoices = async () => {
    const { data, error } = await supabase
      .from("invoices")
      .select("*, clients(name)")
      .order("issued_at", { ascending: false });

    if (!error) setInvoices(data || []);
    setLoading(false);
  };

  const addInvoice = async (invoice: any) => {
    const { error } = await supabase.from("invoices").insert(invoice);
    if (!error) fetchInvoices();
    return error;
  };

  const updateInvoice = async (id: string, update: any) => {
    const { error } = await supabase
      .from("invoices")
      .update(update)
      .eq("id", id);
    if (!error) await fetchInvoices();
    return error;
  };

  const deleteInvoice = async (id: string) => {
    const { error } = await supabase.from("invoices").delete().eq("id", id);
    if (!error) await fetchInvoices();
    return error;
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  return {
    invoices,
    loading,
    addInvoice,
    updateInvoice,
    deleteInvoice,
  };
}
