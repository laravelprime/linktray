import AppLogoIcon from '@/components/app-logo-icon';
import { Button } from '@/components/ui/button';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className='flex max-md:flex-col md:h-screen bg-white'>
                <div className='bg-white md:hidden pl-4 pt-4 mb-8'>
                    <AppLogoIcon width="36" height="36"/>
                </div>
                <div className='md:w-1/2 md:h-full md:flex justify-center items-center'>
                    <div className='mt-4 mb-8 px-4 md:px-20 flex flex-col gap-4'>
                        <h1 className="mb-1 scroll-m-20 text-3xl max-md:text-2xl font-semibold tracking-tight">
                            Save Links. Build Lists. Share Them Anywhere.
                        </h1>
                        <p className="leading-7 mb-2 text-[#706f6c] dark:text-[#A1A09A]">
                            Curate and share beautiful lists of your favorite links by turning your
                            tabs into curated lists
                            <br />
                            From memes and blogs to wishlists and travel plans.
                        </p>
                        <div className='flex gap-2'>
                            {auth.user ? (
                                <Button asChild>
                                    <Link href={route('dashboard')}>
                                        Dashboard
                                    </Link>
                                </Button>
                            ) : (
                                <>
                                    <Button asChild>
                                        <Link href="/register">
                                            Create Link List
                                        </Link>
                                    </Button>
                                    <Button 
                                        variant={'secondary'}
                                        asChild
                                    >
                                        <Link href="/login">
                                            Login
                                        </Link>
                                    </Button>
                                </>
                            )}
                            
                        </div>
                    </div>
                </div>
                <div className='md:w-1/2 md:h-full'>
                    <img
                        src="/storage/images/welcome-illustration.png"
                        alt="Welcome Illustration"
                        className="h-full w-full object-contain object-center"
                    />
                </div>
            </div>
        </>
    );
}
