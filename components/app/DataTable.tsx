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
import { useState , useEffect } from "react";
import { useGlobalState } from "@/context/GlobalState";
import AddBook from "./AddBook";
import DescriptionPopUp from "./DescriptionPopUp";

const DataTable = () => {

  const { books, searchResults, setSearchResults, fetchAllBooks } = useGlobalState(); // destructured from context 

  const [searchTerm,setSearchTerm] = useState("")
  
  useEffect(()=>{
    fetchAllBooks()
  },[])

  // function to handle search 
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {value} = e.target
    setSearchTerm(value)

    if(value.trim() === ""){
      setSearchResults(books) // used books arr(untouched data) if search is empty
    }else{
      const result = books.filter((b)=> b.name.toLowerCase().includes(value.toLowerCase())) // filters the array based on this condition
      setSearchResults(result)
    }
  }

//   const deleteFarmerData = (id: string) => {
//     const filteredData = allFarmers.filter((f: Farmer) => f.farmerId !== id);
//     setAllFarmers(filteredData);
//     localStorage.setItem("FarmerData", JSON.stringify(filteredData));
//     toast("Farmer deleted successfully", {
//       duration: 2000,
//       position: "top-center",
//       action: {
//         label: "OK",
//         onClick: () => console.log("deleted"),
//       },
//     });

//     setTimeout(() => {
//       window.location.reload();
//     }, 500);
//   };

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
                  {/* <div onClick={()=> setId(farmer.farmerId)}>
                  <EditFarmer
                    farmerID={id}
                    formData={farmerData}
                    setFormData={setFarmerData}
                    />
                  </div> */}
                  <Trash2
                    size={17}
                    className="text-red-600 cursor-pointer"
                    // onClick={() => deleteFarmerData(farmer.farmerId)}
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
