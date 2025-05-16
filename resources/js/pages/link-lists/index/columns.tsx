import { ColumnDef } from "@tanstack/react-table"
import { EarthIcon, FolderClosed, MoreHorizontal, Pencil, Trash2, LockKeyhole } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Link, useForm } from "@inertiajs/react"
import { Tray } from "@/types"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export const columns: ColumnDef<Tray>[] = [
  {
    accessorKey: "name",
    header: () => <div className="font-bold">Title</div>,
    cell: ({ row }) => {
        return <Link 
          className="w-full h-full"
          href={route('link-trays.show', row.original.id)}
        >
          <Button variant="ghost" className="font-medium inline-flex justify-start items-center cursor-pointer w-full h-full">
            <FolderClosed size={'16px'}/>
            {row.getValue('name')}        
          </Button>
        </Link>
    }
  },
  {
    accessorKey: "description",
    header: () => <div className="font-bold">Description</div>,
  },
  {
    accessorKey: "is_private",
    header: () => <div className="font-bold">Visibility</div>,
    cell: ({ row }) => {
        const formatted = row.getValue('is_private') === 0 ? 
          (<div className="inline-flex items-center gap-x-2">
            <EarthIcon size={16}/> public
          </div>) : 
          (<div className="inline-flex items-center gap-x-2">
            <LockKeyhole size={16}/> private
          </div>)
        return <div className="font-medium">{formatted}</div>
    }
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const tray = row.original
 
      const [openedDialog, setOpenedDialog] = useState<"delete" | "edit">();
      return (
        <Dialog>
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DialogTrigger
                asChild
                onClick={() => {
                  setOpenedDialog("edit");
                }}
              >
                <DropdownMenuItem>
                  <Pencil/>
                  Edit
                </DropdownMenuItem>
              </DialogTrigger>
              <DialogTrigger
                asChild
                onClick={() => {
                  setOpenedDialog("delete");
                }}
              >
                <DropdownMenuItem>
                  <Trash2/>
                  Delete
                </DropdownMenuItem>
              </DialogTrigger>
            </DropdownMenuContent>
          </DropdownMenu>
          <DialogContent>
            {openedDialog === "delete" ? (
              <DeletePropertyModal />
            ) : (
              <EditPropertyModal tray={tray} />
            )}
          </DialogContent>
        </Dialog>
      )
    },
  },
]

function DeletePropertyModal() {
  return (<>
    <DialogHeader>
      <DialogTitle>Are you absolutely sure?</DialogTitle>
      <DialogDescription>
        This action cannot be undone. This will permanently delete your link list
        and remove your data from our servers.
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <div className="flex justify-start w-full h-full">
        <Button variant='destructive'>
          Delete Memes
        </Button>
      </div>
    </DialogFooter>
  </>);
}

const EditPropertyModal: React.FC<{
  tray: Tray
}> = ({tray}) => {
  const {} = useForm({});

  return (<>
    <DialogHeader>
      <DialogTitle>Edit List</DialogTitle>
    </DialogHeader>
    <div className="flex flex-col gap-y-2">
      <div>
        <Input placeholder="Title" value={tray.name}/>
      </div>
      <div>
        <Textarea placeholder="Description" value={tray.description}/>
      </div>
      <div>
      <Select
        onValueChange={()=>{}} 
        defaultValue="private"
        value={tray.is_private ? 'private' : 'public'}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Visibility" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="private">
            <LockKeyhole/>
            Private
          </SelectItem>
          <SelectItem value="public">
            <EarthIcon/>
            Public
          </SelectItem>
        </SelectContent>
      </Select>
      </div>
    </div>
    <DialogFooter>
      <div className="flex justify-start w-full h-full">
        <Button>
          Save
        </Button>
      </div>
    </DialogFooter>
  </>);
}