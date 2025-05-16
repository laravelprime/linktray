import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Pencil } from 'lucide-react';
import { ClipLoader } from "react-spinners";
import AppLayout from '@/layouts/app-layout';
import { Tray, type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { useState, useRef, useEffect, CSSProperties } from 'react';
import YoutubeLinkSmall from '../components/youtube-link-small';

interface TrayShowProps {
    tray: Tray;
}

interface TrayHeadingProps {
    tray: Tray;
}

interface TrayDescriptionProps {
    tray: Tray;
}

const TrayShow: React.FC<TrayShowProps> = ({
    tray
}) => {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Link Trays',
            href: route('link-lists.index'),
        },
        {
            title: tray.name,
            href: route('link-lists.show', tray.id),
        },
    ];
    
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-col items-center rounded-xl p-4">
                <div className='flex flex-col items-center space-y-2 md:w-2/3'>
                    <TrayHeading tray={tray}/>
                    <TrayDescription tray={tray}/>
                    <div className='flex flex-1 gap-2 mt-2'>
                        <Input/>
                        <Button className='cursor-pointer'>
                            Add
                        </Button>
                    </div>
                    <div className='text-center'>
                        <div className='inline-flex items-center space-x-2 rounded-lg border border-[#19140035] px-2 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]'>
                            <TextLink href={route('link-lists.show', tray.id)}>
                                {route('link-lists.show', tray.id)}
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

const TrayHeading: React.FC<TrayHeadingProps> = ({
    tray
}) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isInputNameHidden, setIsInputNameHidden] = useState(true);
    const [name, setName] = useState(tray.name);
    const spanRef = useRef<HTMLSpanElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const [loading, setLoading] = useState(true);
    const [color, setColor] = useState("white");

    useEffect(() => {
        if (spanRef.current && inputRef.current) {
            const spanWidth = spanRef.current.offsetWidth;
            inputRef.current.style.width = `${spanWidth}px`; // +2px for caret
        }
    }, [name]);

    const override: CSSProperties = {
        display: "block",
        margin: "0 auto",
        borderColor: "white",
    };

    return (<h1
        onMouseEnter={() => { setIsHovered(true) }}
        onMouseLeave={() => { setIsHovered(false) }}
        className="scroll-m-20 relative inline-flex justify-center w-fit"
    >
        <span
            ref={spanRef}
            className="invisible absolute whitespace-pre"
        >
            {name || ' '}
        </span>
        <div className='text-4xl font-extrabold tracking-tight lg:text-5xl text-center'>
            {name}
        </div>
        <Input 
            value={name}
            ref={inputRef}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => { setIsInputNameHidden(true) }}
            className={`absolute -bottom-8 bg-background p-0 h-8 z-10 text-center ${isInputNameHidden ? 'hidden' : ''}`}
        />

        <Button 
            className={`absolute top-0 left-full z-10 rounded-full w-8 h-8 items-center justify-center cursor-pointer shadow-[-2px_4px_8px_rgba(0,0,0,0.4)] ${isHovered ? 'inline-flex' : 'hidden'}`}
            onClick={() => { setIsInputNameHidden(false) }}
        >
            {/* <Pencil/> */}
            <ClipLoader
                color={color}
                loading={loading}
                cssOverride={override}
                size={20}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </Button>
    </h1>);
}

const TrayDescription: React.FC<TrayDescriptionProps> = ({
    tray
}) => {
    const [isHovered, setIsHovered] = useState(false);

    return (<div 
        className='relative inline-flex w-fit'
        onMouseEnter={() => { setIsHovered(true) }}
        onMouseLeave={() => { setIsHovered(false) }}
    >
        <p className='leading-7 text-center'>
            {tray.description}
        </p>
        <Button className={`absolute -top-4 left-[99%] z-10 rounded-full w-8 h-8 inline-flex items-center justify-center cursor-pointer shadow-[-2px_4px_8px_rgba(0,0,0,0.4)] ${isHovered ? 'inline-flex' : 'hidden'}`}>
            <Pencil/>
        </Button>
    </div>);
}