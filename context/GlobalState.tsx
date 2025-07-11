'use client'

import React, { createContext, useState, useContext } from "react"
import { Books } from "@/types/type"

type ContextType = {
  books: Books[],
  searchTerm: string,
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>,
  searchResults: Books[],
  setSearchResults: React.Dispatch<React.SetStateAction<Books[]>>,
  fetchAllBooks: () => void
}

const GlobalState = createContext<ContextType | undefined>(undefined)

const StateProvider = ({children}: {children: React.ReactNode}) => {

  const [books, setBooks] = useState<Books[]>([]);
  const [searchTerm,setSearchTerm] = useState("")
  const [searchResults,setSearchResults] = useState<Books[]>([])
  
  //Fetch all books
  const fetchAllBooks = async() => {
    // gets token from localStorage
    const token = localStorage.getItem("token")
    const parsedToken = token ? JSON.parse(token) : null
    
    // logic that fetches books from backend
    try{
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Books`,{
        headers: {
          Authorization: `Bearer ${parsedToken}`,
          "Content-Type": "application/json"
        }
      })
      const responseData = await response.json()

       // Only reset searchResults if searchTerm is empty(prevents flicker issues)
      if (searchTerm.trim() === "") {
        setSearchResults(responseData.data)
      }
      setBooks(responseData.data)
    }catch(error){
      console.log(error)
    }
  }

  return (
    <GlobalState.Provider value={{books, searchResults, setSearchResults, searchTerm, setSearchTerm, fetchAllBooks}}>
      {children}
    </GlobalState.Provider>
  )
    
}

// custom hook to make context work as it should.
export const useGlobalState = () => {
  const context = useContext(GlobalState);
  if (!context) {
    throw new Error("useGlobalState must be used within a StateProvider");
  }
  return context;
};

export default StateProvider