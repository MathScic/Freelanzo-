import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  const { data: clientIds } = await supabase
    .from("invoices")
    .select("client_id")
    .eq("user_id", session.user.id);

  const uniqueClientIds = [
    ...new Set(clientIds?.map((inv) => inv.client_id) || []),
  ];

  const totalClient = uniqueClientIds.length;

  const { data: invoices } = await supabase
    .from("invoices")
    .select("*, clients(name)")
    .eq("user_id", session.user.id)
    .order("issued_at", { ascending: false });

  // const totalClient = clients?.length || 0;
  const totalInvoices = invoices?.length || 0;
  const totalAmount = invoices?.reduce(
    (sum, inv) => sum + (inv.amount || 0),
    0
  );
  const last3Invoices = invoices?.slice(0, 3) || [];

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-orange-400 to-pink-200">
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto w-full">
          <div className="bg-white/70 backdrop-blur-lg p-6 rounded-xl shadow-xl mb-6 text-center break-words">
            <h1 className="text-3xl sm:text-4xl font-extrabold mb-2 text-black">
              Bonjour, <br />
              <span className="break-words">{session.user.email}</span>
            </h1>
            <p className="text-md sm:text-lg text-purple/90">
              Bienvenue sur le tableau de bord Freelanzo 🎉
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-white p-4 rounded-xl shadow">
              <p className="text-sm text-gray-500">Clients</p>
              <p className="text-2xl font-bold">{totalClient}</p>
            </div>

            <div className="bg-white p-4 rounded-xl shadow">
              <p className="text-sm text-gray-500">Factures</p>
              <p className="text-2xl font-bold">{totalInvoices}</p>
            </div>

            <div className="bg-white p-4 rounded-xl shadow">
              <p className="text-sm text-gray-500">Total facturé</p>
              <p className="text-2xl font-bold">{totalAmount}</p>
            </div>
          </div>

          <h2 className="text-xl font-semibold mb-2">Dernières facture</h2>
          <div className="space-y-2">
            {last3Invoices.map((inv) => (
              <div
                key={inv.id}
                className="bg-white p-4 rounded-xl shadow flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold">{inv.clients?.name}</p>
                  <p className="text-sm text-gray-600">
                    {inv.amount} € - {inv.status} - {inv.issued_at}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
