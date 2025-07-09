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
import { Books } from "@/types/type"

interface DescriptionPopUp {
  book: Books
}

const DescriptionPopUp = ({ book }: DescriptionPopUp) => {

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
            {book.description ? book.description : "No description yet."}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DescriptionPopUp;
