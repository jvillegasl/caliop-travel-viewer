import "server-only";

import sql from "mssql";
import { sqlConnect } from "../connect";
import { Visit, VisitDetails, VisitExpense } from "../models";
import { VisitDetailsExpense } from "@/types";

export async function selVisitsByEmployeeId(
    employeeId: number,
): Promise<Visit[]> {
    await sqlConnect();

    const results = await sql.query<Visit>`
		SELECT
			V.Id,
			V.ActivityId,
			ISNULL(V.Title, 'NULL') AS Title,
			ISNULL(V.Description, 'NULL') AS Description,
			A.PlannedStartTime AS PlannedStartDate,
			A.PlannedEndTime AS PlannedEndDate,
			V.EmployeeId
		FROM Visit AS V
		INNER JOIN Activity AS A ON A.Id = V.ActivityId
		WHERE
			V.EmployeeId = ${employeeId}
			AND V.IsManual <> 1
	`;

    const visits = results.recordset.flat();

    return visits;
}

export async function selVisitDetailsExpense(
    visitId: number,
): Promise<VisitDetailsExpense> {
    await sqlConnect();

    const result = await sql.query<[VisitDetails?, VisitExpense?]>`
		SELECT TOP 1
			VD.Id,
			VD.RouteStartTime AS RouteStartDate,
			VD.RouteEndTime AS RouteEndDate,
			VD.RouteMiles,
			VD.ReturnStartTime AS ReturnStartDate,
			VD.ReturnEndTime AS ReturnEndDate,
			VD.ReturnMiles,
			VD.SesionStartTime AS SessionStartDate,
			VD.SesionEndTime AS SessionEndDate

		FROM VisitDetail AS VD
		WHERE
			VD.VisitId = ${visitId}
		;

		SELECT TOP 1
			VE.Id,
			VE.RouteStartTime AS RouteStartDate,
			VE.RouteEndTime AS RouteEndDate,
			VE.RouteMiles,
			VE.ReturnStartTime AS ReturnStartDate,
			VE.ReturnEndTime AS ReturnEndDate,
			VE.ReturnMiles

		FROM VisitExpense AS VE
		WHERE
			VE.VisitId = ${visitId}
	`;

    const recordSets = result.recordsets;

    const visitDetails = recordSets?.[0]?.flat()?.[0];
    const visitExpense = recordSets?.[1]?.flat()?.[0];

    return {
        visitExpense,
        visitDetails,
    };
}
