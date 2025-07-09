import * as z from "zod/v4"

//Defining schema
export const formSchema = z.object({
  name: z.string().min(5, "Book name should be at least 5 characters"),
  category: z.string().min(5, "Please select a category"),
  price: z.number().min(1, "Price must be greater than zero"),
  description: z.string().min(5, "Please give a description for your book"),
})

// a type that shapes our errors state so that each field may be an array string or nothing at all if no error.
export type SchemaErrors = {
  [K in keyof z.infer<typeof formSchema>]?: string[]
}