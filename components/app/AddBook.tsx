'use client'

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { formSchema,SchemaErrors } from "@/schema/schema";
import { toast } from "sonner";
import { useGlobalState } from "@/context/GlobalState";
import * as z from "zod/v4"


const AddBook = () => {
  const [errors, setErrors] = useState<SchemaErrors>({});
  const [open, setOpen] = useState(false);
  const [loading,setLoading] = useState(false)
  const [newBook,setNewBook] = useState({
    name: "",
    category: "",
    description: "",
    price: ""
  })

  const {fetchAllBooks} = useGlobalState()

  // function to update formData with values.
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewBook((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value
    }));

  };

  //function to submit the form
  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const results = formSchema.safeParse(newBook)
    if(!results.success){
       const flattenErrors = z.flattenError(results.error)
       setErrors(flattenErrors.fieldErrors)
       return;
    }

    try{
      setLoading(true)
      // gets token from localStorage
      const token = localStorage.getItem("token")
      const parsedToken = token ? JSON.parse(token) : null
  
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Books`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${parsedToken}`
        },
        body: JSON.stringify(newBook)
      })

      switch (res.status) {
        case 200:
          toast("Book Added Successfully", {
            position: "top-center",
            action: {
              label: "OK",
              onClick: () => console.log("success"),
            },
        });
  
        fetchAllBooks() // update the datatable
        clearFields() // clear fields
        setOpen(false) // close the popup
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
      
    }catch(error){
      console.log(error)
    }finally{
      setLoading(false)
    }
  };

  //clear form fields
  const clearFields = () => {
    setNewBook({
      name: "",
      category: "",
      price: "",
      description: ""
    });

    setErrors({});
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
        // if (!isOpen) {
        //   clearFields(); // Clear form when dialog closes
        // }
      }}
    >
      <DialogTrigger
        className="bg-[#2666CF] rounded-sm flex items-center gap-2 px-2 py-2 w-[200px] sm:w-[150px]
        text-white hover:bg-[#2666CF] hover:text-white hover:cursor-pointer
        "
      >
        <Plus size={16} />
        <span className="text-[14px]">Add Book</span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={(e) => handleSubmit(e)}>
          <DialogHeader>
            <DialogTitle>Add New Book</DialogTitle>
            <DialogDescription>
              Enter book information here. Click add when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 mt-3">
            <div className="grid gap-1.5">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="The Dilemma Of A Ghost"
                value={newBook.name}
                onChange={(e) => handleChange(e)}
                className={errors.name ? "border border-red-600" : ""}
              />
              <span className="text-[12px] text-red-600">
                {errors.name && errors.name}
              </span>
            </div>
            
            <div className="grid gap-1.5">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                name="price"
                placeholder="30"
                type="number"
                value={newBook.price}
                onChange={(e) => handleChange(e)}
                className={errors.price ? "border border-red-600" : ""}
              />
              <span className="text-[12px] text-red-600">
                {errors.price && errors.price}
              </span>
            </div>

            <div className="grid gap-1.5">
              <Label htmlFor="category">Category</Label>
                <RadioGroup className="mt-3" 
                  value={newBook.category}
                  onValueChange={(value)=>{
                    setNewBook((prev)=> ({...prev, category: value}))
                  }}
                >
                  {["Horror","Mystery","Drama","Ancient"].map((item,index)=>(
                    <div key={index} className="flex items-center gap-3">
                      <RadioGroupItem value={item} id={`r-${item}`} className="border border-black"/>
                      <Label htmlFor={`r-${item}`}>{item}</Label>
                    </div>
                  ))}
                </RadioGroup>
              <span className="text-[12px] text-red-600">
                {errors.category && errors.category}
              </span>
            </div>

            <div className="grid gap-1.5">
              <Label htmlFor="description">Description</Label>
              <textarea
                id="description"
                name="description"
                placeholder="Description of your book"
                className={errors.description ? 
                  "border border-red-600 w-full h-24 px-2 py-4 rounded-md resize-none text-sm" 
                  : 
                  'w-full h-24 px-2 py-4 border border-gray-300 rounded-md resize-none text-sm'}
                value={newBook.description}
                onChange={(e) => handleChange(e)}
              />

              <span className="text-[12px] text-red-600">
                {errors.description && errors.description}
              </span>
            </div>

          </div>

          <DialogFooter className="mt-4">
            <DialogClose onClick={() => clearFields()}></DialogClose>
            {!loading ?
              <Button type="submit">Add</Button>
              :
              <Button disabled={true}>Adding...</Button>
            }
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddBook;
