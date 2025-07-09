'use client'

import { LogOut, User2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import Image from "next/image"

const Navbar = () => {
  const router = useRouter()

  // clear localStorage and redirect back to login
  const logOut = () => {
    localStorage.clear()
    router.push('/login')
    toast("You logged out",{
      duration: 1500,
      position: "top-center",
      action: {
        label: "OK",
        onClick: () => console.log("success"),
      },
    })
  }

  return (
    <div className="px-10 py-3 flex justify-between items-center border-b border-slate-400">
      <div className="flex gap-2 items-center">
        <Image
          src="/logo.png"
          alt="Logo"
          width={500}
          height={500}
          className="w-[30px] h-[30px]"
        />
        <h3 className="font-[500]">Readers<span className="text-red-500 font-bold ml-[3px]">Hub</span></h3>
      </div>

      <div className="flex gap-3">
        <User2 size={20} className="cursor-pointer"/>
        <LogOut size={20} className="cursor-pointer" onClick={()=>logOut()}/>
      </div>
    </div>
  )
}

export default Navbar