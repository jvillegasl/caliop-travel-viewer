import { VisitDetails, VisitExpense } from "@/db/models";

export type VisitDetailsExpense = {
    visitDetails?: VisitDetails;
    visitExpense?: VisitExpense;
};
