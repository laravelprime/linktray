import {
    Card,
    CardContent
} from "@/components/ui/card"

import { Button } from "@/components/ui/button"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { EllipsisVertical, Pencil, Trash2 } from "lucide-react"

import TextLink from "@/components/text-link"
import { 
    Dialog, 
    DialogContent, 
    DialogDescription, 
    DialogTitle, 
    DialogFooter, 
    DialogHeader, 
    DialogTrigger 
} from "@/components/ui/dialog"
import { Link, SharedData } from "@/types"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { useForm, usePage } from "@inertiajs/react"
import { url } from "inspector"
import { toast } from "sonner"

const WebLink : React.FC<{ 
    link: Link, 
    isEditable: Boolean
}> = ({
    link, isEditable
}) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [openedDialog, setOpenedDialog] = useState<"delete" | "edit">();

    return <Card className='w-full pl-1 py-0'>
        <CardContent className='p-0.5'>
            <div className='flex items-center justify-between'>
                <div className="flex items-center space-x-2">
                    <img 
                        src={link.favicon ? link.favicon : '#!'} 
                        alt="Link Favicon"
                        className='w-6 h-6' 
                    />
                    <TextLink 
                        className="text-sm" 
                        href={link.url}
                    >
                        {link.anchor_text ? link.anchor_text : link.url}
                    </TextLink>
                </div>
                <div>
                    <Dialog
                        open={isDialogOpen} 
                        onOpenChange={setIsDialogOpen}
                    >
                        <DropdownMenu>
                            {isEditable && <DropdownMenuTrigger asChild>
                                <Button 
                                    variant={'outline'} 
                                    className="w-8 h-8 border-0 shadow-none rounded-full"
                                >
                                    <EllipsisVertical size={16}/>
                                </Button>
                            </DropdownMenuTrigger>}
                            <DropdownMenuContent>
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
                                <DeleteLinkModal link={link} setIsDialogOpen={setIsDialogOpen} />
                            ) : (
                                <EditLinkModal link={link} setIsDialogOpen={setIsDialogOpen}/>
                            )}
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </CardContent>
    </Card>
}

export default WebLink;

const EditLinkModal: React.FC<{
    link: Link,
    setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
}> = ({
    link,
    setIsDialogOpen
}) => {
    const { flash } = usePage<SharedData>().props
    const {data, setData, patch, reset, processing} = useForm({
        anchor_text: link.anchor_text,
        url: link.url,
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        patch(route('links.update', link.id), {
            onSuccess: () => {
                if(flash.success){
                    toast.success(flash.success)
                }

                if(flash.error){
                    toast.error(flash.error)
                }
                reset();
            },
            onFinish: () => {
                setIsDialogOpen(false);
            }
        })
    }

    return (<>
        <DialogHeader>
            <DialogTitle>Edit Link</DialogTitle>
            <DialogDescription></DialogDescription>
        </DialogHeader>
            <form
                onSubmit={handleSubmit} 
                className="flex flex-col gap-y-2"
                id="edit-link-form"
            >
                <Input 
                    value={data.anchor_text} 
                    onChange={(e) => {setData('anchor_text', e.currentTarget.value)}}/>
                <Input 
                    value={data.url}
                    onChange={(e) => {setData('url', e.currentTarget.value)}}
                />
            </form>
        <DialogFooter>
            <div
                className="flex justify-start w-full h-full"
            >
                <Button 
                    type="submit" 
                    variant='default'
                    form="edit-link-form"
                    disabled={processing}
                >
                    Save
                </Button>
            </div>
        </DialogFooter>
    </>);
}

const DeleteLinkModal: React.FC<{
    link: Link,
    setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
}> = ({
    link,
    setIsDialogOpen
}) => {
    const { flash } = usePage<SharedData>().props
    const {delete:destroy, processing} = useForm({})

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        destroy(route('links.destroy', link.id), {
            onSuccess: () => {
                if(flash.success){
                    toast.success(flash.success)
                }

                if(flash.error){
                    toast.error(flash.error)
                }
            },
            onFinish: () => {
                setIsDialogOpen(false);
            }
        })
    }

    return (<>
        <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
                This action cannot be undone. This will permanently delete your link
                and remove your data from our servers.
            </DialogDescription>
        </DialogHeader>
        <DialogFooter>
            <form 
                onSubmit={handleSubmit}
                className="flex justify-start w-full h-full"
            >
                <Button type="submit" variant='destructive' disabled={processing}>
                    Delete
                </Button>
            </form>
        </DialogFooter>
    </>);
}