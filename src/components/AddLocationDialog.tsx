import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogTrigger,
} from "@/components/ui/dialog";
import CustomInput from "./CustomInput";
import { useState, useRef } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { useToast } from "@/hooks/use-toast";
import { LucidePlusCircle } from "lucide-react";
import { IconType } from "react-icons";
import LocationDropdowns from "./LocationDropdowns";

type Props = {
    onSuccess?: () => void;
};

const AddLocationDialog = ({ onSuccess }: Props) => {
    const { toast } = useToast();
    const closeRef = useRef<HTMLButtonElement>(null);
    const [formData, setFormData] = useState({
        partner_id: localStorage.getItem("id") || "",
        name: "",
        street: "",
        street2: "",
        city: "",
        state_id: "",
        country_id: "",
        type: "delivery"
    });
    const [loading, setLoading] = useState(false);

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);

            // Convert state_id and country_id to numbers
            const payload = {
                ...formData,
                state_id: parseInt(formData.state_id),
                country_id: parseInt(formData.country_id)
            };

            await axiosInstance.post('/user/address', payload);

            toast({
                title: "تم الإضافة",
                description: "تم إضافة العنوان بنجاح",
                variant: "success",
            });

            // Close the dialog
            closeRef.current?.click();

            // Refresh the page
            window.location.reload();

        } catch (error) {
            toast({
                title: "خطأ",
                description: "حدث خطأ أثناء إضافة العنوان",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button label="إضافة عنوان" Icon={LucidePlusCircle as IconType} />
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <div className="py-8" dir="rtl">
                    <div className="flex gap-x-4 border-b">
                        <p className="font-tajawal-bold text-xl mt-4 max-w-[250px] truncate">
                            إضافة عنوان جديد
                        </p>
                    </div>

                    <div className="mt-4">
                        <CustomInput
                            label="الاسم"
                            value={formData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                        />
                    </div>
                    <div className="mt-4">
                        <CustomInput
                            label="العنوان"
                            value={formData.street}
                            onChange={(e) => handleInputChange('street', e.target.value)}
                        />
                    </div>
                    <div className="mt-4">
                        <CustomInput
                            label="العنوان الإضافي"
                            value={formData.street2}
                            onChange={(e) => handleInputChange('street2', e.target.value)}
                        />
                    </div>
                    <div className="mt-4">
                        <CustomInput
                            label="المدينة"
                            value={formData.city}
                            onChange={(e) => handleInputChange('city', e.target.value)}
                        />
                    </div>
                    <div className="mt-4">
                        <LocationDropdowns
                            selectedCountryId={formData.country_id}
                            selectedStateId={formData.state_id}
                            onCountryChange={(value) => handleInputChange('country_id', value)}
                            onStateChange={(value) => handleInputChange('state_id', value)}
                        />
                    </div>
                </div>
                <DialogFooter className="sm:justify-between">
                    <DialogClose ref={closeRef} asChild>
                        <Button label="إلغاء" variant={"outline"} />
                    </DialogClose>
                    <Button
                        label={loading ? "جاري الحفظ..." : "حفظ"}
                        onClick={handleSubmit}
                        disabled={loading}
                    />
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default AddLocationDialog; 