'use client'
import {  LayoutDashboard, Moon,  Sun } from "lucide-react"
import { logout } from "@/services/auth"

import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useRouter } from "next/navigation";

export function AdminHeader() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle("dark")
  }
  const router = useRouter();
  const handleLogout = async () => {
    await logout(); 
    router.push("/sign-in"); 
  };
  return (
    <header className="flex h-16 justify-between items-center gap-4 border-b bg-background px-6">
 
      <div className="flex items-center gap-2 font-semibold">
      Admin Dashboard
      </div>

      <div className="flex items-center justify-end gap-3">
                <Button className="bg-white" variant="outline" onClick={toggleDarkMode}>
                  {isDarkMode ? <Sun className="h-5 w-5 " /> : <Moon className="h-5 w-5" />}
                </Button>
                <Button variant="outline" onClick={handleLogout}>Log Out</Button>
       </div>
    
    </header>
  )
}