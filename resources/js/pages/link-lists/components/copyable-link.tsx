import TextLink from "@/components/text-link";
import { Button } from "@/components/ui/button";
import { LinkList } from "@/types";
import { toast } from "sonner";

const CopyableLink: React.FC<{ 
    link: string
}> = ({
    link 
}) => {
    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(link);
            toast.success('Link copied to clipboard!');
        } catch (error) {
            toast.error('Copying link to clipboard failed');
            console.error('Copy failed:', error);
        }
    };

    return (
        <div className="text-center">
            <div className="inline-flex items-center space-x-2 rounded-lg border border-[#19140035] px-2 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]">
                <TextLink href={link}>
                    {link}
                </TextLink>
                
                <Button 
                    variant="outline" 
                    onClick={handleCopy}
                    className='cursor-pointer'
                >
                    Copy Link
                </Button>
            </div>
        </div>
    );
};

export default CopyableLink;