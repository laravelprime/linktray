import { LinkList, SharedData } from "@/types";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { CSSProperties, useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { useForm, usePage } from "@inertiajs/react";
import { DotLoader } from "react-spinners";
import { toast } from "sonner";

const LinkListDescription: React.FC<{ linkList: LinkList, isEditable: Boolean }> = ({
    linkList, isEditable
}) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isDescriptionInputHidden, setIsDescriptionInputHidden] = useState(true)
    const [isPostingDescriptionUpdate, setIsPostingDescriptionUpdate] = useState(false);
    const { flash } = usePage<SharedData>().props
    const inputRef = useRef<HTMLInputElement>(null);

    const {data, setData, patch} = useForm({
        'title': linkList.title,
        'description': linkList.description,
        'visibility': linkList.visibility
    })

    const updateDescription = () => { 
        setIsDescriptionInputHidden(true)
        setIsPostingDescriptionUpdate(true)

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
                setIsPostingDescriptionUpdate(false)
            }
        })
    }

    useEffect(() => {
        if (!isDescriptionInputHidden && inputRef.current) {
            inputRef.current.focus();
            inputRef.current.select();
        }
    }, [isDescriptionInputHidden]);

    const override: CSSProperties = {
        display: "block",
        margin: "0 auto",
        borderColor: "white",
    };

    return (<div 
        className='relative inline-flex w-fit'
        onMouseEnter={() => { setIsHovered(true) }}
        onMouseLeave={() => { setIsHovered(false) }}
    >
        <p className='leading-7 text-center'>
            {data.description}
        </p>
        <Input
            value={data.description}
            ref={inputRef}
            onChange={(e) => {
                setData('description', e.target.value)
            }}
            onBlur={updateDescription}
            className={`absolute -bottom-8 bg-background p-0 h-8 z-10 text-center ${isDescriptionInputHidden ? 'hidden' : ''}`}
        />
        <Button className={`absolute -top-4 left-[99%] z-10 rounded-full w-8 h-8 inline-flex items-center 
            justify-center cursor-pointer shadow-[-2px_4px_8px_rgba(0,0,0,0.4)] 
            ${(isHovered || isPostingDescriptionUpdate) && isEditable ? 'inline-flex' : 'hidden'}
        `}
        
        onClick={() => {
            if(!isPostingDescriptionUpdate){
                setIsDescriptionInputHidden(false)
            }
        }}

        >
            {isPostingDescriptionUpdate ?
            <DotLoader
                color={"white"}
                loading={isPostingDescriptionUpdate}
                cssOverride={override}
                size={20}
                aria-label="Loading Spinner"
                data-testid="loader"
            /> :
            <Pencil/>}
        </Button>
    </div>);
}

export default LinkListDescription;