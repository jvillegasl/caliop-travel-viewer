"use client";

import { ReactNode, useState } from "react";
import { TravelFormContext } from "@/contexts/travelFormContext";
import { Employee } from "@/db/models";

type TravelFormProviderProps = {
    children: ReactNode;
    employees: Employee[];
};

export function TravelFormProvider({
    children,
    employees,
}: TravelFormProviderProps) {
    const [employeeId, setEmployeeId] = useState<number | null | undefined>(
        null,
    );

    return (
        <TravelFormContext.Provider
            value={{
                employees,
                employeeId,
                setEmployeeId,
            }}
        >
            {children}
        </TravelFormContext.Provider>
    );
}
