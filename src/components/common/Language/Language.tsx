import { Button } from "@/components/ui/button"

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { locals } from "@/components/common/i18n/i18n";
import { useTranslation } from "react-i18next";



export function Language() {
    const {i18n} = useTranslation();
    const currLanguage = locals[i18n.language as keyof typeof locals];
    const changeLanguage = (lng: 'en' | 'vi') => {
        console.log(lng,"lng");
        
        i18n.changeLanguage(lng);
    }
    return (    
        <Popover >
            <PopoverTrigger asChild className="w-[180px]">
                <Button variant="outline">{currLanguage}</Button>
            </PopoverTrigger>
            <PopoverContent className="w-36">
                <div className="">
                    <div className="flex flex-col space-y-2">
                        <button className="hover:bg-slate-200" onClick={() => changeLanguage('en')} >English</button>
                        <button className="hover:bg-slate-200" onClick={() => changeLanguage('vi')}>Tiếng Việt</button>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}
