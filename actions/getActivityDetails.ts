"use server";

import { selVisitDetails, selVisitExpense } from "@/db/queries/activity";
import { ActivityDetails } from "@/types";

export async function getActivityDetails(visitId: number) {
    const visitDetails = await selVisitDetails(visitId);
    const visitExpense = await selVisitExpense(visitId);

    const data: ActivityDetails = { visitDetails, visitExpense };

    return data;
}
