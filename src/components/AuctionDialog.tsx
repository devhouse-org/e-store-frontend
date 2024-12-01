import { Copy } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function AuctionDialog() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                {/* <Button>Share</Button> */}
                <Button label="مزايدة" />
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <div className="py-10"></div>
                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <Button label="إلغاء" />
                    </DialogClose>

                    <div className="px-2 flex justify-between items-center w-full bg-orange-500 hover:bg-orange-500/90 transition ease-in-out cursor-pointer rounded-md text-white">
                        <p className="font-tajawal-regular">150,000 دع</p>
                        <p className="font-tajawal-regular">تأكيد</p>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
