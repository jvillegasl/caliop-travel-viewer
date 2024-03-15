"use server";

import { getActivitiesByEmployeeId } from "@/db/queries/activity";

export async function getEmployeeActivities(employeeId: number) {
    const activities = await getActivitiesByEmployeeId(employeeId);

    return activities;
}
