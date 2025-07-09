import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import type { Books } from "./DataTable"

interface DescriptionPopUp {
  book: Books
  Id: string
}

const DescriptionPopUp = ({ Id, book }: DescriptionPopUp) => {

  return (
    <Dialog>
      <DialogTrigger asChild>
      <Button>
        <Eye className="text-white"/>
      </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">{book.name}</DialogTitle>
          <DialogDescription className="flex flex-col gap-1">
            <h4 className="text-slate-700">Description</h4>
            <h4 className="text-black">{book.description ? book.description : "No description yet."}</h4>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DescriptionPopUp;
