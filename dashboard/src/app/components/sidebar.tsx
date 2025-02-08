'use client'
import { useState } from "react";
import Link from "next/link";
import { BarChart, Package, ShoppingCart, Users, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

const sidebarLinks = [
  {
    title: "Dashboard",
    icon: BarChart,
    href: "/",
    variant: "ghost" as const,
  },
  {
    title: "Products",
    icon: Package,
    href: "/product-data",
    variant: "ghost" as const,
  },
  {
    title: "Orders",
    icon: ShoppingCart,
    href: "/orders",
    variant: "ghost" as const,
  },
  {
    title: "Customers",
    icon: Users,
    href: "/customers",
    variant: "ghost" as const,
  }
];

export function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex">
      <aside
        className={`bg-dark border-r transition-all duration-300 ${isOpen ? "w-64" : "w-16"}`}
      >
        <ScrollArea className="h-[calc(100vh-4rem)]">
          <div className="flex flex-col gap-4 p-4">
            {sidebarLinks.map((link) => (
              <Button
                key={link.title}
                variant={link.variant}
                asChild
                className="justify-start gap-2"
              >
                <Link href={link.href}>
                  <link.icon className="size-5" />
                  {isOpen && link.title}
                </Link>
              </Button>
            ))}
          </div>
        </ScrollArea>
      </aside>

      <Button onClick={() => setIsOpen(!isOpen)} className="m-2 p-2 bg-transparent" variant={"outline"}>
        <Menu className="size-6 text-black" />
      </Button>
    </div>
  );
}
