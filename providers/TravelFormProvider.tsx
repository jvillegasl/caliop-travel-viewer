"use client";

import { ReactNode, useState } from "react";
import { TravelFormContext } from "@/contexts/travelFormContext";
import { Employee } from "@/db/models";
import { TravelItem } from "@/types";

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

    const [activityId, setActivityId] = useState<number | null | undefined>(
        null,
    );

    // const filteredActivities = useMemo(() => {
    //     if (!activityId) return activities;

    //     return activities?.filter((t) => t.Id === activityId) ?? null;
    // }, [activities, activityId]);

    const [travelItem, setTravelItem] = useState<TravelItem | null | undefined>(
        null,
    );

    return (
        <TravelFormContext.Provider
            value={{
                employees,
                employeeId,
                setEmployeeId,
                activityId,
                setActivityId,
                travelItem,
                setTravelItem,
            }}
        >
            {children}
        </TravelFormContext.Provider>
    );
}
