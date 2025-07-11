'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";
import { useEffect } from "react";
import { useGlobalState } from "@/context/GlobalState";
import { toast } from "sonner";
import AddBook from "./AddBook";
import DescriptionPopUp from "./DescriptionPopUp";
import EditBook from "./EditBook";

const DataTable = () => {

  const { 
    books, 
    searchTerm, 
    setSearchTerm, 
    searchResults, 
    setSearchResults, 
    fetchAllBooks } = useGlobalState(); // destructured from context 

    // function to handle search 
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  //Update search results whenever it updates
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setSearchResults(books)
    } else {
      const filtered = books.filter((b) =>
        b.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setSearchResults(filtered)
    }
  }, [searchTerm, books])

  useEffect(()=>{
    fetchAllBooks()
  },[])
  
  const deleteBook = async(id: string) => {
    const token = localStorage.getItem("token")
    const parsedToken = token ? JSON.parse(token) : null
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Books/${id}`,{
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${parsedToken}`
      }
    })
    
    switch (res.status) {
      case 200:
        toast("Book Deleted Successfully", {
          position: "top-center",
          action: {
            label: "OK",
            onClick: () => console.log("success"),
          },
      });

      fetchAllBooks(); // update the datatable
      break;

      case 401:
      toast("Token is invalid or expired", {
        position: "top-center",
        action: {
          label: "OK",
          onClick: () => console.log("token expired"),
        },
      });
      break;

      default:
      toast("An error occurred.. Please try again later", {
        position: "top-center",
        action: {
          label: "OK",
          onClick: () => console.log("server error"),
        },
      });
      break;
    }
  };
  
  return (
    <>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center gap-3 mt-7">
          <AddBook/>
          <Input 
            id="search" 
            placeholder="Search by name"
            className="w-full"
            value={searchTerm}
            onChange={(e)=>handleSearch(e)}
          />
        </div>
        {searchTerm !== "" &&
        <div>
          <h2>Showing results for <span className="font-semibold">"{searchTerm}"</span></h2>
        </div>
        }
      </div>

      <Table className="border border-slate-200 mt-4 w-full">
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {searchResults.length > 0 ? searchResults.map((book) => (
            <TableRow key={book.id}>
              <TableCell className="font-medium">{book.id}</TableCell>
              <TableCell>{book.name}</TableCell>
              <TableCell>{book.category}</TableCell>
              <TableCell>{book.price}.00</TableCell>
              <TableCell>
                <div>
                  <DescriptionPopUp book={book} />
                </div>
              </TableCell>
              <TableCell>
                <div className="flex gap-1.5">
                  <EditBook bookData={book}/>
                  <Trash2
                    size={17}
                    className="text-red-600 cursor-pointer"
                    onClick={() => deleteBook(book.id)}
                  />
                </div>
              </TableCell>
            </TableRow>
            ))
            :
            <TableRow>
              <TableCell className="text-center font-[500]">No books yet.</TableCell>
            </TableRow>
          }
        </TableBody>
      </Table>
    </>
  );
};

export default DataTable;
