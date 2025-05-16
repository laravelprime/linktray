import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';

import { Tray } from "@/types"
import { EarthIcon, LockKeyhole, Plus } from 'lucide-react';

import { TraysTable } from './trays-table';
import { columns } from "./columns"
import React from 'react';
import { Button } from '@/components/ui/button';

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

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Link Lists',
        href: route('link-lists.index'),
    },
];

const TrayIndex: React.FC<{ linkLists: Tray[]; }> = ({
    linkLists
}) => {
    console.log(linkLists);

    const {data, setData} = useForm({
        'name': '',
        'description': '',
        'visibility': 'private'
    });    

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Dialog>
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
                        </DialogHeader>
                        <div className="flex flex-col gap-y-2">
                            <div>
                                <Input 
                                    placeholder="Title" 
                                    value={data.name}
                                    onChange={(e) => { setData('name', e.currentTarget.value) }}
                                />
                            </div>
                            <div>
                                <Textarea 
                                    placeholder="Description" 
                                    value={data.description}
                                    onChange={(e) => { setData('description', e.currentTarget.value) }}
                                />
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
                            </div>
                        </div>
                        <DialogFooter>
                            <div className="flex justify-start w-full h-full">
                                <Button onClick={() => { console.log('dasd');
                                 }}>
                                    Create {data.name}
                                </Button>
                            </div>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
                <TraysTable columns={columns} data={trays}/>
            </div>
        </AppLayout>
    );
}

export default TrayIndex;
