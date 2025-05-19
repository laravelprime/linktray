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
                    <TrayHeading linkList={linkList}/>
                    <TrayDescription linkList={linkList}/>
                    <div className='flex flex-1 gap-2 mt-2'>
                        <Input/>
                        <Button className='cursor-pointer'>
                            Add
                        </Button>
                        <Button className='cursor-pointer'>
                            <Settings2/>
                        </Button>
                    </div>
                    <div className='text-center'>
                        <div className='inline-flex items-center space-x-2 rounded-lg border border-[#19140035] px-2 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]'>
                            <TextLink href={route('link-lists.show', linkList.id)}>
                                {route('link-lists.show', linkList.id)}
                            </TextLink>
                            <Button variant={'outline'}>
                                Copy Link
                            </Button>
                        </div>
                    </div>
                    <div className='flex flex-col items-center gap-2'>
                        {linkList.links.map(link => (
                            <WebLink
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

const TrayHeading: React.FC<{ linkList: LinkList }> = ({
    linkList
}) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isTitleInputHidden, setIsTitleInputHidden] = useState(true);
    const [title, setTitle] = useState(linkList.title);
    const spanRef = useRef<HTMLSpanElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const [postingTitleUpdate, setPostingTitleUpdate] = useState(false);
    const [color, setColor] = useState("white");
    const { flash } = usePage<SharedData>().props

    const {setData, patch} = useForm({
        'title': linkList.title,
        'description': linkList.description,
        'visibility': linkList.visibility
    })

    const updateTitle = () => { 
        setIsTitleInputHidden(true)
        setPostingTitleUpdate(true)

        patch(route('link-lists.update', linkList.id),{
            onSuccess: () => {
                if(flash.success){
                    toast.success(flash.success)
                }

                if(flash.error){
                    toast.error(flash.error)
                }
            },
            onFinish: () => {
                setPostingTitleUpdate(false)
            }
        })
    }

    useEffect(() => {
        if (spanRef.current && inputRef.current) {
            const spanWidth = spanRef.current.offsetWidth;
            inputRef.current.style.width = `${spanWidth}px`; // +2px for caret
        }
    }, [title]);

    useEffect(() => {
        if (!isTitleInputHidden && inputRef.current) {
            inputRef.current.focus();
            inputRef.current.select();
        }
    }, [isTitleInputHidden]);

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
            {title || ' '}
        </span>
        <div className='text-4xl font-extrabold tracking-tight lg:text-5xl text-center'>
            {title}
        </div>
        <Input 
            value={title}
            ref={inputRef}
            onChange={(e) => {
                setTitle(e.target.value)
                setData('title', e.target.value)
            }}
            onBlur={updateTitle}
            className={`absolute -bottom-8 bg-background p-0 h-8 z-10 text-center ${isTitleInputHidden ? 'hidden' : ''}`}
        />

        <Button 
            className={`absolute top-0 left-full z-10 rounded-full w-8 h-8 items-center justify-center 
                cursor-pointer shadow-[-2px_4px_8px_rgba(0,0,0,0.4)] 
                ${isHovered || postingTitleUpdate ? 'inline-flex' : 'hidden'}
            `}
            onClick={() => {
                if(!postingTitleUpdate){
                    setIsTitleInputHidden(false)
                }
            }}
        >
            {postingTitleUpdate ?
            <DotLoader
                color={color}
                loading={postingTitleUpdate}
                cssOverride={override}
                size={20}
                aria-label="Loading Spinner"
                data-testid="loader"
            /> :
            <Pencil/>}
        </Button>
    </h1>);
}

const TrayDescription: React.FC<{ linkList: LinkList }> = ({
    linkList
}) => {
    const [isHovered, setIsHovered] = useState(false);

    return (<div 
        className='relative inline-flex w-fit'
        onMouseEnter={() => { setIsHovered(true) }}
        onMouseLeave={() => { setIsHovered(false) }}
    >
        <p className='leading-7 text-center'>
            {linkList.description}
        </p>
        <Button className={`absolute -top-4 left-[99%] z-10 rounded-full w-8 h-8 inline-flex items-center justify-center cursor-pointer shadow-[-2px_4px_8px_rgba(0,0,0,0.4)] ${isHovered ? 'inline-flex' : 'hidden'}`}>
            <Pencil/>
        </Button>
    </div>);
}