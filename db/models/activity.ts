export type Activity = {
    Id: number;
    VisitId: number;
    Title: string;
    Description: string;
    PlannedStartDate: Date;
    PlannedEndDate: Date;
    EmployeeId: number;
};

export type BaseVisitDetails = {
    Id: number;
    RouteStartDate: Date;
    RouteEndDate: Date;
    RouteMiles: number;
    ReturnStartDate: Date;
    ReturnEndDate: Date;
    ReturnMiles: number;
    VisitId: number;
};

export type VisitDetails = BaseVisitDetails & {
    SessionStartDate: Date;
    SessionEndDate: Date;
};

export type VisitExpense = BaseVisitDetails;
