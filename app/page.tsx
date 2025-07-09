'use client'

import DashboardCards from '@/components/app/DashboardCards'
import DataTable from '@/components/app/DataTable'
import Navbar from '@/components/app/Navbar'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const Home = () => {
  const router = useRouter()

  const token = localStorage.getItem("token")
  const parsedToken = token ? JSON.parse(token) : null

  useEffect(() => {
    if (!parsedToken) {
     router.push('/login')
    } else {
      router.push('/')
    }
  }, [])

  if(!parsedToken){
    return (
      <h2 className='text-center'>Checking token validation...you will be redirected soon</h2>
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