"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  Users,
  FileText,
  Settings,
  Power,
  LayoutDashboard,
} from "lucide-react";
import { usePathname } from "next/navigation";

const navItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: <LayoutDashboard size={18} />,
  },
  { name: "Clients", href: "/clients", icon: <Users size={18} /> },
  { name: "Factures", href: "/factures", icon: <FileText size={18} /> },
  { name: "Paramètres", href: "/settings", icon: <Settings size={18} /> },
];

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setOpen(!open);

  return (
    <>
      {/* Burger menu - mobile only */}
      <button
        onClick={toggleMenu}
        className="md:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded shadow"
      >
        <Menu className="w-6 h-6 text-purple-600" />
      </button>

      {/* Overlay mobile */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        } md:hidden`}
        onClick={toggleMenu}
      />

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 z-50 transform transition-transform duration-300 
          bg-gradient-to-b from-[#4623a9] via-[#9040d4] to-[#fa7b64] text-white 
          ${open ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 md:static md:flex md:flex-col`}
      >
        {/* Header */}
        <div className="p-6 flex items-center justify-between md:justify-center border-b border-white/20">
          <Link href="/dashboard" className="flex items-center gap-4">
            <img
              src="/images/Freelanzo-logo.png"
              alt="Logo Freelanzo"
              className="w-24 h-24 md:w-20 md:h-20"
            />
          </Link>

          <button onClick={toggleMenu} className="md:hidden">
            <X className="text-white" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-2 p-4 flex-1">
          {navItems.map(({ name, href, icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                  active
                    ? "bg-white text-purple-700 font-semibold"
                    : "hover:bg-white/20 text-white"
                }`}
                onClick={() => setOpen(false)}
              >
                {icon}
                <span>{name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-white/20">
          <button
            onClick={() => {
              fetch("/api/logout", { method: "POST" }).then(() => {
                window.location.href = "/login";
              });
            }}
            className="flex items-center gap-3 text-white hover:bg-white/20 px-4 py-2 rounded-lg w-full"
          >
            <span className="h-2 w-2 bg-green-400 rounded-full" />
            <Power size={18} />
            <span>Se déconnecter</span>
          </button>
        </div>
      </aside>
    </>
  );
}
