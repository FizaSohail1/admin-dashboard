'use client';
import { useState } from "react";
import Link from "next/link";
import { BarChart, Package, ShoppingCart, Users, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

const sidebarLinks = [
  { title: "Dashboard", icon: <BarChart className="size-6" />, href: "/" },
  { title: "Products", icon: <Package className="size-6" />, href: "/product-data" },
  { title: "Orders", icon: <ShoppingCart className="size-6" />, href: "/orders" },
  { title: "Customers", icon: <Users className="size-6" />, href: "/customers" }
];

export function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex h-full"> 
      <aside
        className={`bg-gray-900 text-white min-h-full shadow-lg transition-all duration-300 ${
          isOpen ? "w-64" : "w-20"
        } h-[1500px] md:h-[120vh] flex flex-col`}
      >
        <div className="flex items-center justify-end p-4 border-b border-gray-700">
          <Button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-md hover:bg-gray-700 transition"
            variant="ghost"
          >
            <Menu className="size-6 text-white" />
          </Button>
        </div>
        <ScrollArea className="flex-1 p-4">
          <nav className="flex flex-col gap-2">
            {sidebarLinks.map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="flex items-center gap-3 p-3 rounded-md transition hover:bg-gray-800"
              >
                {link.icon}
                {isOpen && <span className="text-sm font-medium">{link.title}</span>}
              </Link>
            ))}
          </nav>
        </ScrollArea>
      </aside>
    </div>
  );
}


