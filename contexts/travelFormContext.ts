import { Dispatch, SetStateAction, createContext } from "react";
import { Employee } from "@/db/models";
import { Moment } from "moment";

type EmployeesContext = {
    employees: Employee[];
    employeeId: number | null | undefined;
    setEmployeeId: Dispatch<SetStateAction<number | null | undefined>>;
};

type VisitsFilterContext = {
    startDate: Moment | null;
    endDate: Moment | null;
    setStartDate: Dispatch<SetStateAction<Moment | null>>;
    setEndDate: Dispatch<SetStateAction<Moment | null>>;
};

type TravelFormContext = EmployeesContext & VisitsFilterContext;

export const TravelFormContext = createContext<TravelFormContext | null>(null);
