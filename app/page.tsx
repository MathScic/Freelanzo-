import Sidebar from "./components/Sidebar";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex h-screen w-screen">
      <main className="flex-1 p-8 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-purple-600 mb-6">
          Bienvenue sur Freelanzo 🚀
        </h1>
        <Link
          href="/dashboard"
          className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition"
        >
          Accéder au Dashboard
        </Link>
      </main>
    </div>
  );
}
