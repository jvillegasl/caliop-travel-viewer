"use server";

import { selActivitiesByEmployeeId } from "@/db/queries/activity";

export async function getEmployeeActivities(employeeId: number) {
    const activities = await selActivitiesByEmployeeId(employeeId);

    return activities;
}
