'use client'
import { useRouter } from "next/navigation";
import { logout } from "@/services/auth"
import { Button } from "@/components/ui/button"

export function AdminHeader() {
  const router = useRouter();
  const handleLogout = async () => {
    await logout();
    router.push("/sign-in");
  };
  return (
    <div className="bg-gray-900 w-[500px] md:w-[769px] lg:w-full">
       <header className="flex h-16  justify-between items-center gap-4 border-b bg-background px-6 ">

<div className="flex items-center gap-2 font-semibold text-white md:text-2xl">
  Hekto Dashboard
</div>

<div className="flex items-center justify-end gap-3">

  <Button variant="outline" onClick={handleLogout}>Log Out</Button>
</div>

</header>

    </div>
  )
}
