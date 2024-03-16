import { Dispatch, SetStateAction, createContext } from "react";
import { Employee } from "@/db/models";
import { TravelItem } from "@/types";

type EmployeesContext = {
    employees: Employee[];
    employeeId: number | null | undefined;
    setEmployeeId: Dispatch<SetStateAction<number | null | undefined>>;
};

type ActivityContext = {
    activityId: number | null | undefined;
    setActivityId: Dispatch<SetStateAction<number | null | undefined>>;
    travelItem: TravelItem | null | undefined;
    setTravelItem: Dispatch<SetStateAction<TravelItem | null | undefined>>;
};

type TravelFormContext = EmployeesContext & ActivityContext;

export const TravelFormContext = createContext<TravelFormContext | null>(null);
