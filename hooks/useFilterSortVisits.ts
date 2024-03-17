import { useMemo, useState } from "react";
import { useTravelForm } from "./useTravelForm";
import { Visit } from "@/db/models";
import moment from "moment";

export type SortField = keyof Pick<
    Visit,
    "Id" | "ActivityId" | "PlannedStartDate"
>;

export type SortCriteria = {
    field: SortField;
    asc: boolean;
};

const compareFnByField = {
    Id: (a, b) => a.Id - b.Id,
    ActivityId: (a, b) => a.ActivityId - b.ActivityId,
    PlannedStartDate: (a, b) =>
        a.PlannedStartDate.valueOf() - b.PlannedStartDate.valueOf(),
} satisfies Record<SortField, (a: Visit, b: Visit) => number>;

export function useFilterSortVisits(visits: Visit[]) {
    const { startDate, endDate } = useTravelForm();
    const [sortCriteria, setSortCriteria] = useState<SortCriteria | null>(null);

    const filteredVisits = useMemo(() => {
        if (startDate && endDate) {
            return visits.filter((t) =>
                moment(t.PlannedStartDate)
                    .utc()
                    .isBetween(startDate, endDate, "days", "[]"),
            );
        }

        if (startDate && !endDate) {
            return visits.filter((t) =>
                moment(t.PlannedStartDate)
                    .utc()
                    .isSameOrAfter(startDate.utc(), "days"),
            );
        }

        if (!startDate && endDate) {
            return visits.filter((t) =>
                moment(t.PlannedStartDate)
                    .utc()
                    .isSameOrBefore(endDate.utc(), "days"),
            );
        }

        return visits;
    }, [visits, startDate, endDate]);

    const sortedVisits = useMemo(() => {
        if (!sortCriteria) return filteredVisits;

        const compareFn = compareFnByField[sortCriteria.field];

        const sorted = filteredVisits.toSorted(compareFn);

        if (!sortCriteria.asc) sorted.reverse();

        return sorted;
    }, [filteredVisits, sortCriteria]);

    return { sortedVisits, sortCriteria, setSortCriteria };
}
