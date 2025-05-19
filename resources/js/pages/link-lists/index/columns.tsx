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

import { Link, useForm, usePage } from "@inertiajs/react"
import { LinkList, SharedData } from "@/types"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import InputError from "@/components/input-error"
import { toast } from "sonner"

export const columns: ColumnDef<LinkList>[] = [
  {
    accessorKey: "title",
    header: () => <div className="font-bold">Title</div>,
    cell: ({ row }) => {
        return <Link 
          className="w-full h-full"
          href={route('link-lists.show', row.original.id)}
        >
          <Button variant="ghost" className="font-medium inline-flex justify-start items-center cursor-pointer w-full h-full">
            <FolderClosed size={'16px'}/>
            {row.getValue('title')}        
          </Button>
        </Link>
    }
  },
  {
    accessorKey: "description",
    header: () => <div className="font-bold">Description</div>,
  },
  {
    accessorKey: "visibility",
    header: () => <div className="font-bold">Visibility</div>,
    cell: ({ row }) => {
        const formatted = row.getValue('visibility') === 'public' ? 
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
      const linkList = row.original
      const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
      const [openedDialog, setOpenedDialog] = useState<"delete" | "edit">();
      
      return (
        <Dialog 
          open={isDialogOpen} 
          onOpenChange={setIsDialogOpen}
        >
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
              <DeletePropertyModal linkList={linkList} setIsDialogOpen={setIsDialogOpen} />
            ) : (
              <EditPropertyModal linkList={linkList} setIsDialogOpen={setIsDialogOpen}/>
            )}
          </DialogContent>
        </Dialog>
      )
    },
  },
]

const DeletePropertyModal: React.FC<{
  linkList: LinkList, 
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
}> = ({linkList, setIsDialogOpen}) => {
  const {delete: destroy} = useForm();
  const { flash } = usePage<SharedData>().props

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    destroy(route('link-lists.destroy', linkList.id),{
      onSuccess: () => {
        if(flash.success){
          toast.success(flash.success)
        }

        if(flash.error){
          toast.error(flash.error)
        }

        setIsDialogOpen(false)
      }
    })
  }
  
  return (<>
    <DialogHeader>
      <DialogTitle>Are you absolutely sure?</DialogTitle>
      <DialogDescription>
        This action cannot be undone. This will permanently delete your link list
        and remove your data from our servers.
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <form 
        onSubmit={handleSubmit}
        className="flex justify-start w-full h-full"
      >
        <Button type="submit" variant='destructive'>
          Delete Memes
        </Button>
      </form>
    </DialogFooter>
  </>);
}

const EditPropertyModal: React.FC<{
  linkList: LinkList, 
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
}> = ({linkList, setIsDialogOpen}) => {
  const { flash } = usePage<SharedData>().props
  const {data, setData, patch, processing, errors, reset} = useForm({
    'title': linkList.title,
    'description': linkList.description,
    'visibility': linkList.visibility
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    patch(route('link-lists.update', linkList.id),{
      onSuccess: () => {
        if(flash.success){
          toast.success(flash.success)
        }

        if(flash.error){
          toast.error(flash.error)
        }

        setIsDialogOpen(false)
        reset();
      }
    })
  }

  return (<>
    <DialogHeader>
      <DialogTitle>Edit List</DialogTitle>
      <DialogDescription></DialogDescription>
    </DialogHeader>
    <form
      onSubmit={handleSubmit} 
      className="flex flex-col gap-y-2"
      id="edit-link-list-form"
    >
      <div>
        <Input placeholder="Title" value={data.title} onChange={(e) => {setData('title', e.currentTarget.value)}}/>
        {errors.title && <InputError message={errors.title}/>}
      </div>
      <div>
        <Textarea placeholder="Description" value={data.description} onChange={(e) => {setData('description', e.currentTarget.value)}}/>
        {errors.description && <InputError message={errors.description}/>}
      </div>
      <div>
      <Select 
        onValueChange={(e)=>{
          setData('visibility', e)
        }}
        defaultValue="private"
        value={data.visibility}
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
      {errors.visibility && <InputError message={errors.visibility}/>}
      </div>
    </form>
    <DialogFooter>
      <div className="flex justify-start w-full h-full">
        <Button type="submit" form="edit-link-list-form" disabled={processing}>
          Save {data.title}
        </Button>
      </div>
    </DialogFooter>
  </>);
}