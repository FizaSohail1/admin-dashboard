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
    await logout(); // Call the server function
    router.push("/sign-in"); // Redirect to sign-in page after logout
  };
  return (
    <header className="flex h-16 justify-between items-center gap-4 border-b bg-background px-6">
 
      <div className="flex items-center gap-2 font-semibold">
        <div className="size-8 rounded bg-primary text-primary-foreground grid place-items-center"><LayoutDashboard size={24}/></div>
        Dashboard
      </div>

      <div className="flex items-center justify-end gap-3">
                {/* <Button className="bg-white" variant="outline" onClick={toggleDarkMode}>
                  {isDarkMode ? <Sun className="h-5 w-5 " /> : <Moon className="h-5 w-5" />}
                </Button> */}
                <Button variant="outline" onClick={handleLogout}>Log Out</Button>
       </div>
    
    </header>
  )
}