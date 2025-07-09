import DashboardCards from '@/components/app/DashboardCards'
import DataTable from '@/components/app/DataTable'
import Navbar from '@/components/app/Navbar'
import React from 'react'

const Dashboard = async() => {

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

export default Dashboard