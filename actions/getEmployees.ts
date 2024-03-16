"use server";

import { selEmployees } from "@/db/queries/employee";

export async function getEmployees() {
    const employees = await selEmployees();

    return employees;
}
