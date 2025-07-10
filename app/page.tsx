'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import DashboardCards from '@/components/app/DashboardCards'
import DataTable from '@/components/app/DataTable'
import Navbar from '@/components/app/Navbar'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const Home = () => {
  const router = useRouter()
  const [validToken,setValidToken] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("token") || null
    const parsedToken = token ? JSON.parse(token) : null
    if (!parsedToken) {
      setValidToken(false)
     router.push('/login')
    } else {
      setValidToken(true)
      router.push('/')
    }
  }, [])

  if(!validToken){
    return (
      <div className="w-full h-[100vh] flex items-center justify-center bg-slate-300">
        <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>User Verification</CardTitle>
          <CardDescription>
            Checking token validation... you will redirected soon
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center">
          <div className="border-2 border-t-white animate-spin border-black rounded-full w-[60px] h-[60px] ">

          </div>
        </CardContent>
      </Card>
      </div>
    )
  }else{
    return (
      <div>
        <Navbar/>
        <main className='px-8 py-5'>
          <DashboardCards/>
          <DataTable/>
        </main>
      </div>
    )
  }
}

export default Home