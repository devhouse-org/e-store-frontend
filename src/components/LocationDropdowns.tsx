import { useEffect, useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Country {
  id: number;
  name: string;
  code: string;
  phone_code: number;
}

interface State {
  id: number;
  name: string;
  code: string;
  country_id: [number, string];
}

interface LocationDropdownsProps {
  selectedCountryId: string;
  selectedStateId: string;
  onCountryChange: (value: string) => void;
  onStateChange: (value: string) => void;
}

const LocationDropdowns = ({
  selectedCountryId,
  selectedStateId,
  onCountryChange,
  onStateChange,
}: LocationDropdownsProps) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [states, setStates] = useState<State[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axiosInstance.get("/user/countries");
        setCountries(response.data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    const fetchStates = async () => {
      try {
        const response = await axiosInstance.get("/user/states");
        setStates(response.data);
      } catch (error) {
        console.error("Error fetching states:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
    fetchStates();
  }, []);

  const filteredStates = selectedCountryId
    ? states.filter((state) => state.country_id[0] === parseInt(selectedCountryId))
    : [];

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">الدولة</label>
        <Select value={selectedCountryId || undefined} onValueChange={onCountryChange}>
          <SelectTrigger>
            <SelectValue placeholder="اختر الدولة" />
          </SelectTrigger>
          <SelectContent>
            {countries.map((country) => (
              <SelectItem key={country.id} value={country.id.toString()}>
                {country.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">المحافظة</label>
        <Select value={selectedStateId || undefined} onValueChange={onStateChange}>
          <SelectTrigger>
            <SelectValue placeholder="اختر المحافظة" />
          </SelectTrigger>
          <SelectContent>
            {filteredStates.map((state) => (
              <SelectItem key={state.id} value={state.id.toString()}>
                {state.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default LocationDropdowns; 