import AppLayout from '@/layouts/app-layout';
import { SharedData, type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';

import { LinkList } from "@/types"
import { EarthIcon, LockKeyhole, Plus } from 'lucide-react';

import { LinkListsTable } from './link-lists-table';
import { columns } from "./columns"
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

import { usePage } from '@inertiajs/react';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import InputError from '@/components/input-error';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Link Lists',
        href: route('link-lists.index'),
    },
];

const LinkListsIndex: React.FC<{ linkLists: LinkList[]; }> = ({
    linkLists
}) => {
    const [isCreateListModalOpen, setIsCreateListModalOpen] = useState(false);
    const { flash } = usePage<SharedData>().props
    
    const {data, setData, post, processing, errors, reset} = useForm({
        'title': '',
        'description': '',
        'visibility': 'private'
    });  

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => { 
        e.preventDefault();
        post(route('link-lists.store'),{
            onSuccess: () => {
                setIsCreateListModalOpen(false)
                reset()
                if(flash.success){
                    toast.success(flash.success)
                }

                if(flash.error){
                    toast.error(flash.error)
                }
            }
        });
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Dialog 
                    open={isCreateListModalOpen} 
                    onOpenChange={setIsCreateListModalOpen}
                >
                    <div className='flex justify-end'>
                        <DialogTrigger
                            asChild 
                            className='w-fit'
                        >
                            <Button className='cursor-pointer'>
                                New List
                                <Plus/>
                            </Button>
                        </DialogTrigger>
                    </div>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Create List</DialogTitle>
                            <DialogDescription></DialogDescription>
                        </DialogHeader>
                        <form id='create-link-list-form' className="flex flex-col gap-y-2" onSubmit={handleSubmit}>
                            <div>
                                <Input 
                                    placeholder="Title" 
                                    value={data.title}
                                    onChange={(e) => { setData('title', e.currentTarget.value) }}
                                />
                                {errors.title && <InputError message={errors.title}/>}
                            </div>
                            <div>
                                <Textarea 
                                    placeholder="Description" 
                                    value={data.description}
                                    onChange={(e) => { setData('description', e.currentTarget.value) }}
                                />
                                {errors.description && <InputError message={errors.description}/>}
                            </div>
                            <div>
                                <Select
                                    onValueChange={(e)=>{
                                        setData('visibility', e)
                                    }}
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
                                <Button type='submit' form='create-link-list-form' disabled={processing}>
                                    Create {data.title}
                                </Button>
                            </div>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
                <LinkListsTable columns={columns} data={linkLists}/>
            </div>
        </AppLayout>
    );
}

export default LinkListsIndex;
