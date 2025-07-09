'use client'

import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
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
import { useEffect, useState } from "react";
import { formSchema,SchemaErrors } from "@/schema/schema";
import { toast } from "sonner";
import { useGlobalState } from "@/context/GlobalState";
import { Books } from "@/types/type";
import * as z from "zod/v4"

type EditBookProps = {
    bookData: Books
}


const EditBook = ({bookData}: EditBookProps) => {
  const [errors, setErrors] = useState<SchemaErrors>({});
  const [open, setOpen] = useState(false);
  const [loading,setLoading] = useState(false)
  const [book,setBook] = useState<Books>(bookData)

  const {fetchAllBooks} = useGlobalState()

  // function to update formData with values.
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBook((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value
    }))

  };

  //function to submit the form
  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const results = formSchema.safeParse(book)
    if(!results.success){
       const flattenErrors = z.flattenError(results.error)
       setErrors(flattenErrors.fieldErrors)
       return;
    }

    try{
      setErrors({})
      setLoading(true)
      // gets token from localStorage
      const token = localStorage.getItem("token")
      const parsedToken = token ? JSON.parse(token) : null
  
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Books/${book.id}`,{
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${parsedToken}`
        },
        body: JSON.stringify(book)
      })

      switch (res.status) {

        case 200:
          toast("Book Updated Successfully", {
            position: "top-center",
            action: {
              label: "OK",
              onClick: () => console.log("success"),
            },
        });
  
        fetchAllBooks();
    
        setTimeout(() => {
          setOpen(false);
          // clearFields();
        }, 500);
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

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen)
      }}
    >
      <DialogTrigger>
        <Pencil size={16}/>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={(e) => handleSubmit(e)}>
          <DialogHeader>
            <DialogTitle>Edit Book</DialogTitle>
            <DialogDescription>
              Change book information here. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 mt-3">
            <div className="grid gap-1.5">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="The Dilemma Of A Ghost"
                value={book.name}
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
                value={book.price}
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
                  value={book.category}
                  onValueChange={(value)=>{
                    setBook((prev)=> ({...prev, category: value}))
                  }}
                >
                  {["Horror","Mystery","Drama","Ancient"].map((item,index)=>(
                    <div key={index} className="flex items-center gap-3 text-slate-500">
                      <RadioGroupItem value={item} id={`r-${item}`}/>
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
                className={errors.price ? 
                  "border border-red-600 w-full h-24 px-2 py-4 rounded-md resize-none" 
                  : 
                  'w-full h-24 px-2 py-4 border border-gray-300 rounded-md resize-none'}
                value={book.description}
                onChange={(e) => handleChange(e)}
              />

              <span className="text-[12px] text-red-600">
                {errors.description && errors.description}
              </span>
            </div>

          </div>

          <DialogFooter className="mt-4">
            {/* <DialogClose onClick={() => clearFields()}></DialogClose> */}
            {!loading ?
              <Button type="submit">Save Changes</Button>
              :
              <Button disabled={true}>Saving...</Button>
            }
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditBook;
