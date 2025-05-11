import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { Tray, type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import YoutubeLinkSmall from '../components/youtube-link-small';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

interface TrayShowProps {
    tray: Tray;
}

const TrayShow: React.FC<TrayShowProps> = ({
    tray
}) => {
    console.log(tray);
    
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-col items-center rounded-xl p-4">
                <div className='flex flex-col space-y-2 md:w-2/3'>
                    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center">
                        Memes
                    </h1>
                    <p className="leading-7 text-center">
                        The king, seeing how much happier his subjects were, realized the error of
                        his ways and repealed the joke tax.
                    </p>
                    <div className='flex gap-2 mt-2'>
                        <Input/>
                        <Button className='cursor-pointer'>
                            Add
                        </Button>
                    </div>
                    <div className='text-center'>
                        <div className='inline-flex items-center space-x-2 rounded-lg border border-[#19140035] px-2 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]'>
                            <TextLink href='#!'>
                                linkktray/links/memes
                            </TextLink>
                            <Button variant={'outline'}>
                                Copy Link
                            </Button>
                        </div>
                    </div>
                    <div className='flex flex-col items-center gap-2'>
                        {tray.links.map(link => (
                            <YoutubeLinkSmall
                                key={link.id}
                                favicon={link.favicon}
                                url={link.url}
                                anchor_text={link.anchor_text}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

export default TrayShow;