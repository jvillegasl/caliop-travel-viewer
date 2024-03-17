"use server";

import { selVisitDetailsExpense } from "@/db/queries/visit";

export async function getVisitDetailsExpense(visitId: number) {
    const visitDetailsExpense = await selVisitDetailsExpense(visitId);

    return visitDetailsExpense;
}
