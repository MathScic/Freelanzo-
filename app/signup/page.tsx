"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/signup", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    const result = await res.json();

    if (res.ok) {
      console.log("Inscription réussie :", result);
      router.push("/login");
    } else {
      console.error("Erreur d'inscription :", result.error);
      alert("Erreur d'inscription : " + result.error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <form
        onSubmit={handleSubmit}
        className="bg-gray p-8 rounde-xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-600">
          Inscription
        </h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-4 border rounded text-gray-600"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          className="w-full p-2 mb-4 border rounded text-gray-600"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-purple-600 text-white p-2 rounded hover:bg-purple-700 transition"
        >
          S'inscrire
        </button>
      </form>
    </div>
  );
}
