import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Pencil, Settings2 } from 'lucide-react';
import { DotLoader } from "react-spinners";
import AppLayout from '@/layouts/app-layout';
import { LinkList, SharedData, type BreadcrumbItem } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import { useState, useRef, useEffect, CSSProperties } from 'react';
import WebLink from '../components/link';
import { toast } from 'sonner';
import LinkListHeading from './link-list-heading';
import LinkListDescription from './link-list-description';
import InputError from '@/components/input-error';
import CopyableLink from '../components/copyable-link';

const TrayShow: React.FC<{ linkList: LinkList }> = ({
    linkList
}) => {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Link Lists',
            href: route('link-lists.index'),
        },
        {
            title: linkList.title,
            href: route('link-lists.show', linkList.id),
        },
    ];
    
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-col items-center rounded-xl p-4">
                <div className='flex flex-col items-center space-y-2 lg:w-2/3'>
                    <LinkListHeading isEditable={true} linkList={linkList}/>
                    <LinkListDescription isEditable={true} linkList={linkList}/>
                    <AddLink linkList={linkList}/>
                    <CopyableLink
                        link={route('public.link-lists.index', linkList.id)}
                    />
                    <div className='flex flex-col items-center gap-2'>
                        {linkList.links.map(link => (
                            <WebLink
                                isEditable={true}
                                key={link.id}
                                link={link}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

export default TrayShow;

const AddLink: React.FC<{ linkList: LinkList }> = ({ linkList }) => {
    const { flash } = usePage<SharedData>().props
    const {data, setData, post, reset, errors} = useForm({
        'linkListId': linkList.id,
        'url': ''
    })

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        post(route('links.store'),{
            onSuccess: () => {
                if(flash.success){
                    toast.success(flash.success)
                }

                if(flash.error){
                    toast.error(flash.error)
                }
                reset();
            }
        });
    }
    
    return (<form 
        className='flex flex-1 gap-2 mt-2'
        onSubmit={handleSubmit}
    >
        <div>
            <Input 
                value={data.url} 
                onChange={(e) => {
                    setData('url', e.currentTarget.value)
                }}
            />
            {errors && <InputError message={errors.url}/>}
        </div>
        <Button type='submit' className='cursor-pointer'>
            Add
        </Button>
    </form>)
}