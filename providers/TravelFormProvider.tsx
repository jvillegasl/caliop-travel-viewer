"use client";

import { ReactNode, useState } from "react";
import { TravelFormContext } from "@/contexts/travelFormContext";
import { Employee } from "@/db/models";
import { Moment } from "moment";

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

    const [startDate, setStartDate] = useState<Moment | null>(null);
    const [endDate, setEndDate] = useState<Moment | null>(null);

    return (
        <TravelFormContext.Provider
            value={{
                employees,
                employeeId,
                setEmployeeId,
                startDate,
                endDate,
                setStartDate,
                setEndDate,
            }}
        >
            {children}
        </TravelFormContext.Provider>
    );
}
