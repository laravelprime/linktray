import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

import YoutubeLink from './components/youtube-link';
import YoutubeLinkSmall from './components/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import TextLink from "@/components/text-link"

export default function Index() {
    const { auth } = usePage<SharedData>().props;

    const links = [
        {
            'favicon': 'https://www.youtube.com/s/desktop/8da5389f/img/logos/favicon_144x144.png',
            'url': 'https://www.youtube.com/watch?v=60M_oIhKrXA',
            'anchor_text': 'https://www.youtube.com/watch?v=60M_oIhKrXA'
        },
        {
            'favicon': 'https://www.youtube.com/s/desktop/8da5389f/img/logos/favicon_144x144.png',
            'url': 'https://www.youtube.com/watch?v=60M_oIhKrXA',
            'anchor_text': 'https://www.youtube.com/watch?v=60M_oIhKrXA'
        },
        {
            'favicon': 'http://www.google.com/s2/favicons?domain=https://stackoverflow.com/',
            'url': 'http://www.google.com/s2/favicons?domain=https://stackoverflow.com/',
            'anchor_text': 'http://www.google.com/s2/favicons?domain=https://stackoverflow.com'
        },
        {
            'favicon': 'https://www.youtube.com/s/desktop/8da5389f/img/logos/favicon_144x144.png',
            'url': 'https://www.youtube.com/watch?v=60M_oIhKrXA',
            'anchor_text': 'https://www.youtube.com/watch?v=60M_oIhKrXA'
        },
        {
            'favicon': 'https://www.youtube.com/s/desktop/8da5389f/img/logos/favicon_144x144.png',
            'url': 'https://www.youtube.com/watch?v=60M_oIhKrXA',
            'anchor_text': 'https://www.youtube.com/watch?v=60M_oIhKrXA'
        },
        {
            'favicon': 'http://www.google.com/s2/favicons?domain=https://stackoverflow.com/',
            'url': 'http://www.google.com/s2/favicons?domain=https://stackoverflow.com/',
            'anchor_text': 'http://www.google.com/s2/favicons?domain=https://stackoverflow.com'
        },
        {
            'favicon': 'https://www.youtube.com/s/desktop/8da5389f/img/logos/favicon_144x144.png',
            'url': 'https://www.youtube.com/watch?v=60M_oIhKrXA',
            'anchor_text': 'https://www.youtube.com/watch?v=60M_oIhKrXA'
        },
        {
            'favicon': 'https://www.youtube.com/s/desktop/8da5389f/img/logos/favicon_144x144.png',
            'url': 'https://www.youtube.com/watch?v=60M_oIhKrXA',
            'anchor_text': 'https://www.youtube.com/watch?v=60M_oIhKrXA'
        },
        {
            'favicon': 'http://www.google.com/s2/favicons?domain=https://stackoverflow.com/',
            'url': 'http://www.google.com/s2/favicons?domain=https://stackoverflow.com/',
            'anchor_text': 'http://www.google.com/s2/favicons?domain=https://stackoverflow.com'
        },
        {
            'favicon': 'https://www.youtube.com/s/desktop/8da5389f/img/logos/favicon_144x144.png',
            'url': 'https://www.youtube.com/watch?v=60M_oIhKrXA',
            'anchor_text': 'https://www.youtube.com/watch?v=60M_oIhKrXA'
        },
        {
            'favicon': 'https://www.youtube.com/s/desktop/8da5389f/img/logos/favicon_144x144.png',
            'url': 'https://www.youtube.com/watch?v=60M_oIhKrXA',
            'anchor_text': 'https://www.youtube.com/watch?v=60M_oIhKrXA'
        },
        {
            'favicon': 'http://www.google.com/s2/favicons?domain=https://stackoverflow.com/',
            'url': 'http://www.google.com/s2/favicons?domain=https://stackoverflow.com/',
            'anchor_text': 'http://www.google.com/s2/favicons?domain=https://stackoverflow.com'
        },
        {
            'favicon': 'https://www.youtube.com/s/desktop/8da5389f/img/logos/favicon_144x144.png',
            'url': 'https://www.youtube.com/watch?v=60M_oIhKrXA',
            'anchor_text': 'https://www.youtube.com/watch?v=60M_oIhKrXA'
        },
        {
            'favicon': 'https://www.youtube.com/s/desktop/8da5389f/img/logos/favicon_144x144.png',
            'url': 'https://www.youtube.com/watch?v=60M_oIhKrXA',
            'anchor_text': 'https://www.youtube.com/watch?v=60M_oIhKrXA'
        },
        {
            'favicon': 'http://www.google.com/s2/favicons?domain=https://stackoverflow.com/',
            'url': 'http://www.google.com/s2/favicons?domain=https://stackoverflow.com/',
            'anchor_text': 'http://www.google.com/s2/favicons?domain=https://stackoverflow.com'
        },
        {
            'favicon': 'https://www.youtube.com/s/desktop/8da5389f/img/logos/favicon_144x144.png',
            'url': 'https://www.youtube.com/watch?v=60M_oIhKrXA',
            'anchor_text': 'https://www.youtube.com/watch?v=60M_oIhKrXA'
        },
        {
            'favicon': 'https://www.youtube.com/s/desktop/8da5389f/img/logos/favicon_144x144.png',
            'url': 'https://www.youtube.com/watch?v=60M_oIhKrXA',
            'anchor_text': 'https://www.youtube.com/watch?v=60M_oIhKrXA'
        },
        {
            'favicon': 'http://www.google.com/s2/favicons?domain=https://stackoverflow.com/',
            'url': 'http://www.google.com/s2/favicons?domain=https://stackoverflow.com/',
            'anchor_text': 'http://www.google.com/s2/favicons?domain=https://stackoverflow.com'
        },
    ]

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen flex-col items-center bg-background p-6 lg:justify-center lg:p-8">
                <header className="mb-6 w-full max-w-[335px] text-sm not-has-[nav]:hidden lg:max-w-4xl">
                    <nav className="flex items-center justify-between">
                        <Link
                            href={'#!'}
                            className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
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
                        <div className='w-2/3'>
                            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center">
                                Memes
                            </h1>
                            <div className='flex gap-2 mt-2'>
                                <Input/>
                                <Button className='cursor-pointer'>
                                    Add
                                </Button>
                            </div>
                        </div>
                        <div className='text-center w-2/3'>
                            <div className='inline-flex items-center space-x-2 rounded-lg border border-[#19140035] px-2 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]'>
                                <TextLink href='#!'>
                                    linkktray/links/memes
                                </TextLink>
                                <Button variant={'outline'}>
                                    Copy Link
                                </Button>
                            </div>
                        </div>
                        <div className='flex flex-col items-center gap-2 w-2/3'>
                            {links.map(link => (
                                <YoutubeLinkSmall
                                    favicon={link.favicon}
                                    url={link.url}
                                    anchor_text={link.anchor_text}
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
