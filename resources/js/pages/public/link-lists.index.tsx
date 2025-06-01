import { LinkList, type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

import YoutubeLink from '../link-lists/components/youtube-link';
import YoutubeLinkSmall from '../link-lists/components/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import TextLink from "@/components/text-link"
import WebLink from '../link-lists/components/link';
import CopyableLink from '../link-lists/components/copyable-link';
import LinkListDescription from '../link-lists/show/link-list-description';
import LinkListHeading from '../link-lists/show/link-list-heading';

const Index: React.FC<{ linkList: LinkList }> = ({ linkList }) => {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen flex-col items-center bg-background p-6 lg:justify-center lg:p-8">
                <header className="mb-6 w-full max-w-[335px] text-sm not-has-[nav]:hidden lg:max-w-4xl">
                    <nav className="flex items-center justify-end">
                        <Link
                            href={'#!'}
                            className="hidden rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                        >
                            New List
                        </Link>
                        <div className='flex items-center justify-between gap-4'>
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                    >
                                        Register
                                    </Link>
                                </>
                            )}
                        </div>
                    </nav>
                </header>
                <div className="flex w-full items-center justify-center opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0">
                    <main className="flex items-center w-full max-w-[335px] flex-col gap-6 lg:max-w-4xl">
                        <LinkListHeading 
                            isEditable={auth.user ? true : false}
                            linkList={linkList} 
                        />
                        <LinkListDescription 
                            isEditable={auth.user ? true : false}
                            linkList={linkList}
                        />
                        <div className='text-center'>
                            <CopyableLink
                                link={route('public.link-lists.index', linkList.id)}
                            />
                        </div>
                        <div className='flex flex-col items-center gap-2'>
                            {linkList.links.map(link => (
                                <WebLink
                                    isEditable={auth.user ? true : false}
                                    key={link.id}
                                    link={link}
                                />
                            ))}
                        </div>
                    </main>
                </div>
                <div className="hidden h-14.5 lg:block"></div>
            </div>
        </>
    );
}

export default Index;