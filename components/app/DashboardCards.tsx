'use client'

import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useGlobalState } from "@/context/GlobalState"
import { useEffect } from "react"

const DashboardCards = () => {
  const {books,fetchAllBooks} = useGlobalState()

  useEffect(()=>{
    fetchAllBooks()
  },[books])
  
  return (
    <div className="grid grid-cols-1 sm:grid sm:grid-cols-3 md:grid-cols-4 gap-4 px-4">
      <Card>
        <CardHeader>
          <CardDescription>Total Revenue</CardDescription>
          <CardTitle className="font-[500] w-[250px] text-3xl">
            ${books.length > 0 ? books.reduce((total,book) => total + book.price,0) : 0}.00
          </CardTitle>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <CardDescription>Total Followers</CardDescription>
          <CardTitle className="font-[500] w-[250px] text-3xl">
            1,234
          </CardTitle>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <CardDescription>Total Books</CardDescription>
          <CardTitle className="font-[500] w-[250px] text-3xl">
            {books.length > 0 ? books.length : 0}
          </CardTitle>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <CardDescription>Purchase Rate</CardDescription>
          <CardTitle className="font-[500] w-[250px] text-3xl">
            4.5%
          </CardTitle>
          <CardAction>
          </CardAction>
        </CardHeader>
      </Card>
    </div>
  )
}

export default DashboardCards
