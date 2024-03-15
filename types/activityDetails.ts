import { VisitDetails, VisitExpense } from "@/db/models";

export type ActivityDetails = {
    visitDetails: VisitDetails;
    visitExpense: VisitExpense;
};
