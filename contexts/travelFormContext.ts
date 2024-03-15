import { Dispatch, SetStateAction, createContext } from "react";
import { Activity, Employee } from "@/db/models";
import { FetchStatus } from "@/types/fetchStatus";
import { TravelItem } from "@/types";

type EmployeesContext = {
    employees: Employee[];
    employeeId: number | null | undefined;
    setEmployeeId: Dispatch<SetStateAction<number | null | undefined>>;
};

type ActivityContext = {
    activities: Activity[] | null;
    filteredActivities: Activity[] | null;
    activitiesFetchStatus: FetchStatus | null;
    activityId: number | null | undefined;
    setActivityId: Dispatch<SetStateAction<number | null | undefined>>;
    travelItem: TravelItem | null | undefined;
    setTravelItem: Dispatch<SetStateAction<TravelItem | null | undefined>>;
};

type TravelFormContext = EmployeesContext & ActivityContext;

export const TravelFormContext = createContext<TravelFormContext | null>(null);
