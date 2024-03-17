import { Dispatch, SetStateAction, createContext } from "react";
import { Employee } from "@/db/models";

type EmployeesContext = {
    employees: Employee[];
    employeeId: number | null | undefined;
    setEmployeeId: Dispatch<SetStateAction<number | null | undefined>>;
};

type TravelFormContext = EmployeesContext;

export const TravelFormContext = createContext<TravelFormContext | null>(null);
