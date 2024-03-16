import "server-only";

import { sleep } from "@/utils/sleep";
import { EMPLOYEES } from "../data/employees";

export async function selEmployees() {
    await sleep(Math.random() * 3000);

    return EMPLOYEES;
}
