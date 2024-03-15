import { useContext } from "react";
import { TravelFormContext } from "@/contexts/travelFormContext";

export function useTravelForm() {
    const context = useContext(TravelFormContext);

    if (!context) {
        throw new Error("useTravelForm must be used inside TravelFormProvider");
    }

    return context;
}
