import "server-only";

import { TravelItem } from "@/types";
import { Localization } from "../models";
import { sqlConnect } from "../connect";
import sql from "mssql";
import { TravelType } from "@/enums/travelType";
import { TravelCoords } from "@/types/travelCoords";

const tablePrefixByTravelType = {
    [TravelType.VISIT]: "Visit",
    [TravelType.EXPENSE]: "VisitExpense",
} satisfies Record<TravelType, string>;

const idFieldByTravelType = {
    [TravelType.VISIT]: "VisitDetailId",
    [TravelType.EXPENSE]: "VisitId",
} satisfies Record<TravelType, string>;

export async function selLocalizationByTravel(
    travel: TravelItem,
): Promise<TravelCoords> {
    await sqlConnect();

    const tablePrefix = tablePrefixByTravelType[travel.type] ?? "Visit";

    const idField = idFieldByTravelType[travel.type] ?? "VisitId";

    const tableRoute = tablePrefix + "RouteLocalization";
    const tableReturn = tablePrefix + "ReturnLocalization";

    function getQueryString(table: string, idField: string) {
        return `
			SELECT
				T.Id,
				T.Longitude,
				T.Latitude,
				T.CreateDate,
				T.InsertDate,
				T.InsertState,
				T.Row
			FROM ${table} AS T
			WHERE T.${idField} = @Id
			ORDER BY T.Row ASC, T.InsertDate ASC;
		`;
    }

    const routeQueryString = getQueryString(tableRoute, idField);

    const returnQueryString = getQueryString(tableReturn, idField);

    const queryString = `
		${routeQueryString}
		${returnQueryString}
	`;

    const request = new sql.Request()
        .input("Id", sql.Int, travel.id)
        .query<[Localization[], Localization[]]>(queryString);

    const results = await request;
    const recordSets = results.recordsets;

    const routeCoords = recordSets[0].flat();
    const returnCoords = recordSets[1].flat();

    return {
        routeCoords,
        returnCoords,
    };
}
