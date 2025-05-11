import {
    Card,
    CardContent
} from "@/components/ui/card"
import TextLink from "@/components/text-link"

export default function YoutubeLink() {
    return <Card className='w-full p-0.5'>
        <CardContent className='p-0.5'>
            <div className='flex space-x-6'>
                <div className='w-32 h-32'>
                    <img 
                        src="https://i.ytimg.com/vi/60M_oIhKrXA/maxresdefault.jpg" 
                        alt=""
                        className='w-full h-full object-cover rounded-xl'
                    />
                </div>
                <div className='flex flex-col justify-center space-y-4'>
                    <div>
                        <h4 className="scroll-m-20 text-lg font-semibold tracking-tight">
                            Lamine Yamal's just like us 😭🙏🏼 - YouTube
                        </h4>
                        <p className="text-sm leading-7 [&:not(:first-child)]:mt-0">
                            Bro's just like you and me, except for way better at football 😭🙏🏼
                        </p>
                    </div>
                    <div className='flex items-center space-x-2'>
                        <img 
                            src="https://www.youtube.com/s/desktop/8da5389f/img/logos/favicon_144x144.png" 
                            alt="Youtube favicon"
                            className='w-6 h-6' 
                        />
                        <TextLink 
                            className="text-sm" 
                            href="https://www.youtube.com/watch?v=60M_oIhKrXA"
                        >
                            https://www.youtube.com/watch?v=60M_oIhKrXA
                        </TextLink>
                    </div>
                </div>
            </div>
        </CardContent>
    </Card>
}