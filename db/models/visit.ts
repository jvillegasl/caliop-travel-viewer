export type Visit = {
    Id: number;
    ActivityId: number;
    Title: string;
    Description: string;
    PlannedStartDate: Date;
    PlannedEndDate: Date;
    EmployeeId: number;
};

export type BaseVisitTravel = {
    Id: number;
    RouteStartDate?: Date;
    RouteEndDate?: Date;
    RouteMiles?: number;
    ReturnStartDate?: Date;
    ReturnEndDate?: Date;
    ReturnMiles?: number;
};

export type VisitDetails = BaseVisitTravel & {
    SessionStartDate: Date;
    SessionEndDate: Date;
};

export type VisitExpense = BaseVisitTravel;
