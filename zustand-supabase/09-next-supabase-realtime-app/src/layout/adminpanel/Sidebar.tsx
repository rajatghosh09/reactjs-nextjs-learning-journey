"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package } from "lucide-react";

const Sidebar = () => {
  const pathname = usePathname();

  const menuItems = [
    {
      name: "Dashboard",
      href: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Product",
      href: "/admin/product",
      icon: Package,
    },
  ];

  return (
    <div className="w-64 h-screen bg-black text-white p-5 shadow-lg">
      
      <h2 className="text-xl font-bold mb-8 text-green-500">
        Admin Panel
      </h2>

      <nav className="flex flex-col gap-3">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all
              ${
                pathname === item.href
                  ? "bg-green-600 text-white"
                  : "hover:bg-gray-800 text-gray-300"
              }
            `}
          >
            <item.icon size={20} />
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;