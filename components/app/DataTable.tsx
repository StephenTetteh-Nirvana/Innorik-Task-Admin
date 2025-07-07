import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// import { Input } from "@/components/ui/input";
// import { useState } from "react";
import { Eye, Trash2 } from "lucide-react";
// import { toast } from "sonner";
// import type { Farmer } from "@/types/types";
// import FarmerProductsDisplay from "./FarmerProductsDisplay";
// import EditFarmer from "./EditFarmer";
// import AddFarmer from "./AddFarmer";

const searchResults = [
    {
      id:"1",
      name: "The Hills",
      category: "Drama",
      description: "This is a book written by AI",
      price: "20"   
    }
]

const DataTable = () => {
//   const [farmerData, setFarmerData] = useState({
//     farmerId: "",
//     firstName: "",
//     lastName: "",
//     region: "",
//     district: "",
//     contactNumber: "",
//     registrationDate: "",
//     productsPurchased: [],
//   });

//   const [id, setId] = useState("")
//   const [searchTerm,setSearchTerm] = useState("")
//   const [searchResults,setSearchResults] = useState<Farmer[]>([])
//   const [allFarmers, setAllFarmers] = useState<Farmer[]>([]);

  //runs get latest data from localStorage whenever formData changes.
//   useEffect(() => {
//     const farmerArr = localStorage.getItem("FarmerData");
//     const parsed = farmerArr !== null ? JSON.parse(farmerArr) : [];
//     setAllFarmers(parsed);
//     setSearchResults(parsed)
//   }, [farmerData]);

  // function to handle search 
//   const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const {value} = e.target
//     setSearchTerm(value)

//     if(value.trim() === ""){
//       setSearchResults(allFarmers)
//     }else{
//       const result = allFarmers.filter((f)=> 
//         f.firstName.toLowerCase().includes(value.toLowerCase()) || 
//         f.lastName.toLowerCase().includes(value.toLowerCase()) || 
//         f.farmerId.toLowerCase().includes(value.toLowerCase())
//       )
//       setSearchResults(result)
//     }
//   }

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
      <div className="flex-col items-center gap-3 mt-5">
        <div className="flex gap-3">
          {/* <AddFarmer formData={farmerData} setFormData={setFarmerData} /> */}
          {/* <Input 
            id="search" 
            placeholder="Search by name/ID"
            className="w-[160px]"
            value={searchTerm}
            onChange={(e)=>handleSearch(e)}
          /> */}
        </div>
        <div>
          {/* <Sorting searchResults={searchResults} setSearchResults={setSearchResults}/> */}
        </div>
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
              <TableCell>{book.price}</TableCell>
              <TableCell>
                <Eye/>
                {/* <div onClick={() => setId(farmer.farmerId)}>
                  <FarmerProductsDisplay farmerId={farmer.farmerId} />
                </div> */}
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
              <TableCell className="text-center">No books yet.</TableCell>
            </TableRow>
          }
        </TableBody>
      </Table>
    </>
  );
};

export default DataTable;
