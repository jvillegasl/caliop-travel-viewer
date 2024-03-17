"use server";

import { selVisitsByEmployeeId } from "@/db/queries/visit";

export async function getEmployeeVisits(employeeId: number) {
    const visits = await selVisitsByEmployeeId(employeeId);

    return visits;
}
