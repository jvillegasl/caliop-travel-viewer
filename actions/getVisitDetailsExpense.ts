"use server";

import { selVisitDetails, selVisitExpense } from "@/db/queries/visit";
import { VisitDetailsExpense } from "@/types";

export async function getVisitDetailsExpense(visitId: number) {
    const visitDetails = await selVisitDetails(visitId);
    const visitExpense = await selVisitExpense(visitId);

    const data: VisitDetailsExpense = { visitDetails, visitExpense };

    return data;
}
