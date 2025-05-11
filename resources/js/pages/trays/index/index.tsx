import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

import { Tray } from "@/types"

import { TraysTable } from './trays-table';
import { columns } from "./columns"
import React from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Link Trays',
        href: route('link-trays.index'),
    },
];

interface TrayIndexProps {
    trays: Tray[];
}

const TrayIndex: React.FC<TrayIndexProps> = ({
    trays
}) => {
    console.log(trays);    

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <TraysTable columns={columns} data={trays}/>
            </div>
        </AppLayout>
    );
}

export default TrayIndex;
