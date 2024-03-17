import "server-only";

import sql from "mssql";
import { sqlConnect } from "../connect";
import { Employee } from "../models";

export async function selEmployees(): Promise<Employee[]> {
    await sqlConnect();

    const result = await sql.query<Employee>`
		SELECT
			E.Id,
			E.Name,
			E.Lastname
		FROM Employee AS E
		WHERE E.Active = 1
	`;

    const employees = result.recordset.flat();

    return employees;
}
