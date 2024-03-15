"use server";

import { getVisitDetails, getVisitExpense } from "@/db/queries/activity";
import { ActivityDetails } from "@/types";

export async function getActivityDetails(visitId: number) {
    const visitDetails = await getVisitDetails(visitId);
    const visitExpense = await getVisitExpense(visitId);

    const data: ActivityDetails = { visitDetails, visitExpense };

    return data;
}
