'use client'

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("token")
    const parsedToken = token ? JSON.parse(token) : null
    if (!parsedToken) {
     router.push('/login')
    } else {
     router.push('/dashboard')
    }
  }, [])

  return (
    <div className="">
      <p className="text-center">Redirecting....</p>
    </div>
  );
}
