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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

// import { formSchema } from "@/schema/formSchema";
// import { toast } from "sonner";

// import type { FormData, SchemaErrors } from "@/schema/formSchema";
// import * as z from "zod/v4";
// import DatePicker from "./DatePicker";

// interface AddFarmerProps {
//   formData: FormData;
//   setFormData: React.Dispatch<React.SetStateAction<FormData>>;
// }

const AddBook = () => {
//   const [errors, setErrors] = useState<SchemaErrors>({});
  const [open, setOpen] = useState(false);

  // function to update formData with values.
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // const { name, value } = e.target;
    // setFormData((prev) => ({
    //   ...prev,
    //   [name]: value,
    // }));
  };

  //function to submit the form
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // const result = formSchema.safeParse(formData);

      setTimeout(() => {
        setOpen(false);
        clearFields(); // clear fields
      }, 500);
  };

  //clear form fields
  const clearFields = () => {
    // setFormData({
    //   farmerId: "",
    //   firstName: "",
    //   lastName: "",
    //   region: "",
    //   district: "",
    //   contactNumber: "",
    //   registrationDate: "",
    //   productsPurchased: [],
    // });

    // setErrors({});
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (!isOpen) {
          clearFields(); // Clear form when dialog closes
        }
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
              Enter book information here. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 mt-3">
            <div className="grid gap-1.5">
              <Label htmlFor="Name">Name</Label>
              <Input
                id="Name"
                name="Name"
                placeholder="The Dilemma Of A Ghost"
              //   value={formData.firstName}
                onChange={(e) => handleChange(e)}
              //   className={errors.firstName ? "border border-red-600" : ""}
              />
              <span className="text-[12px] text-red-600">
                {/* {errors && errors.firstName} */}
              </span>
            </div>
            
            <div className="grid gap-1.5">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                name="price"
                placeholder="30"
                type="number"
              //   value={formData.lastName}
                onChange={(e) => handleChange(e)}
              //   className={errors.lastName ? "border border-red-600" : ""}
              />
              <span className="text-[12px] text-red-600">
                {/* {errors && errors.lastName} */}
              </span>
            </div>

            <div className="grid gap-1.5">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                name="category"
                placeholder="Horror"
              //   value={formData.region}
                onChange={(e) => handleChange(e)}
              //   className={errors.region ? "border border-red-600" : ""}
              />
              <span className="text-[12px] text-red-600">
                {/* {errors && errors.region} */}
              </span>
            </div>

            <div className="grid gap-1.5">
              <Label htmlFor="description">Description</Label>
              <textarea
                id="description"
                name="description"
                placeholder="Description of your book"
                className="w-full h-24 px-2 py-4 border border-gray-300 rounded-md resize-none"
              />

              <span className="text-[12px] text-red-600">
                {/* {errors && errors.region} */}
              </span>
            </div>

          </div>

          <DialogFooter className="mt-4">
            <DialogClose onClick={() => clearFields()}></DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddBook;
