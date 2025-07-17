import Sidebar from "@/app/components/Sidebar";
import { Toaster } from "react-hot-toast";

export default function LayoutApp({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-screen">
      <Sidebar />
      <main className="flex-1 p-8 overflow-y-auto">{children}</main>

      {/* Toaster */}
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
    </div>
  );
}
