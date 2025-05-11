import {
    Card,
    CardContent
} from "@/components/ui/card"

import { Button } from "@/components/ui/button"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { EllipsisVertical } from "lucide-react"

import TextLink from "@/components/text-link"

export default function YoutubeLinkSmall({
    favicon,
    url,
    anchor_text
}) {
    return <Card className='w-full pl-1 py-0'>
        <CardContent className='p-0.5'>
            <div className='flex items-center justify-between'>
                <div className="flex items-center space-x-2">
                    <img 
                        src={favicon} 
                        alt="Link Favicon"
                        className='w-6 h-6' 
                    />
                    <TextLink 
                        className="text-sm" 
                        href={url}
                    >
                        {anchor_text}
                    </TextLink>
                </div>
                <div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button 
                                variant={'outline'} 
                                className="w-8 h-8 border-0 shadow-none rounded-full"
                            >
                                <EllipsisVertical size={16}/>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuGroup>
                                <DropdownMenuItem>
                                    Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    Delete
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </CardContent>
    </Card>
}