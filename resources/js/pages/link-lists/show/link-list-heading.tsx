import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LinkList, SharedData } from "@/types";
import { useForm, usePage } from "@inertiajs/react";
import { Pencil } from "lucide-react";
import { CSSProperties, useEffect, useRef, useState } from "react";
import { DotLoader } from "react-spinners";
import { toast } from "sonner";

const LinkListHeading: React.FC<{ linkList: LinkList, isEditable: Boolean }> = ({
    linkList, isEditable
}) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isTitleInputHidden, setIsTitleInputHidden] = useState(true);
    const [title, setTitle] = useState(linkList.title);
    const spanRef = useRef<HTMLSpanElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const [postingTitleUpdate, setPostingTitleUpdate] = useState(false);
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
                ${(isHovered || postingTitleUpdate) && isEditable ? 'inline-flex' : 'hidden'}
            `}
            onClick={() => {
                if(!postingTitleUpdate){
                    setIsTitleInputHidden(false)
                }
            }}
        >
            {postingTitleUpdate ?
            <DotLoader
                color={"white"}
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

export default LinkListHeading;