import "server-only";

import { sleep } from "@/utils/sleep";
import { VISITS } from "../data/visits";

export async function selVisitsByEmployeeId(employeeId: number) {
    await sleep(Math.random() * 3000);

    const visits = VISITS.filter((t) => t.EmployeeId === employeeId);

    return visits;
}

export async function selVisitDetails(visitId: number) {
    const startDate = new Date(2024, 0, 1);
    const endDate = new Date();

    await sleep(Math.random() * 3000);

    return {
        Id: generateRandomId(),
        RouteStartDate: generateRandomDate(startDate, endDate),
        RouteEndDate: generateRandomDate(startDate, endDate),
        RouteMiles: generateRandomNumber(50, 200),
        ReturnStartDate: generateRandomDate(startDate, endDate),
        ReturnEndDate: generateRandomDate(startDate, endDate),
        ReturnMiles: generateRandomNumber(50, 200),
        SessionStartDate: generateRandomDate(startDate, endDate),
        SessionEndDate: generateRandomDate(startDate, endDate),
        VisitId: visitId,
    };
}

export async function selVisitExpense(visitId: number) {
    const startDate = new Date(2024, 0, 1);
    const endDate = new Date();

    await sleep(Math.random() * 3000);

    return {
        Id: generateRandomId(),
        RouteStartDate: generateRandomDate(startDate, endDate),
        RouteEndDate: generateRandomDate(startDate, endDate),
        RouteMiles: generateRandomNumber(50, 200),
        ReturnStartDate: generateRandomDate(startDate, endDate),
        ReturnEndDate: generateRandomDate(startDate, endDate),
        ReturnMiles: generateRandomNumber(50, 200),
        VisitId: visitId,
    };
}

function generateRandomDate(start: Date, end: Date): Date {
    return new Date(
        start.getTime() + Math.random() * (end.getTime() - start.getTime()),
    );
}

function generateRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomId(): number {
    return Math.floor(Math.random() * 1000);
}