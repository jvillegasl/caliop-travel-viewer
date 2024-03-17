import { Visit } from "@/db/models";
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableSortLabel,
} from "@mui/material";
import { VisitRow } from "./VisitRow";
import { Dispatch, ReactNode, SetStateAction, useMemo, useState } from "react";

type SortField = keyof Pick<Visit, "Id" | "ActivityId" | "PlannedStartDate">;
type SortCriteria = {
    field: SortField;
    asc: boolean;
};

const compareFnByField = {
    Id: (a, b) => a.Id - b.Id,
    ActivityId: (a, b) => a.ActivityId - b.ActivityId,
    PlannedStartDate: (a, b) =>
        a.PlannedStartDate.valueOf() - b.PlannedStartDate.valueOf(),
} satisfies Record<SortField, (a: Visit, b: Visit) => number>;

type VisitsTableProps = { visits: Visit[] };

export function VisitsTable({ visits }: VisitsTableProps) {
    const [sortCriteria, setSortCriteria] = useState<SortCriteria | null>(null);

    const sortedVisits = useMemo(() => {
        if (!sortCriteria) return visits;

        const compareFn = compareFnByField[sortCriteria.field];

        const sorted = visits.toSorted(compareFn);

        if (!sortCriteria.asc) sorted.reverse();

        return sorted;
    }, [visits, sortCriteria]);

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>
                            <SortingCellBody
                                sortField="Id"
                                sortCriteria={sortCriteria}
                                setSortCriteria={setSortCriteria}
                            >
                                Id
                            </SortingCellBody>
                        </TableCell>
                        <TableCell align="right">
                            <SortingCellBody
                                sortField="ActivityId"
                                sortCriteria={sortCriteria}
                                setSortCriteria={setSortCriteria}
                            >
                                ActivityId
                            </SortingCellBody>
                        </TableCell>
                        <TableCell align="right">Title</TableCell>
                        <TableCell align="right">Description</TableCell>
                        <TableCell align="right">
                            <SortingCellBody
                                sortField="PlannedStartDate"
                                sortCriteria={sortCriteria}
                                setSortCriteria={setSortCriteria}
                            >
                                PlannedStartDate
                            </SortingCellBody>
                        </TableCell>
                        <TableCell align="right">PlannedEndDate</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {sortedVisits.map((row) => (
                        <VisitRow key={row.Id} row={row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

type SortingCellBodyProps = {
    children: ReactNode;
    sortField: SortField;
    sortCriteria: SortCriteria | null;
    setSortCriteria: Dispatch<SetStateAction<SortCriteria | null>>;
};

function SortingCellBody({
    children,
    sortField,
    sortCriteria,
    setSortCriteria,
}: SortingCellBodyProps) {
    const field = sortCriteria?.field;
    const asc = sortCriteria?.asc;

    return (
        <TableSortLabel
            active={field === sortField}
            direction={field === sortField ? (asc ? "asc" : "desc") : "asc"}
            onClick={() =>
                setSortCriteria((prev) => {
                    if (prev?.field === sortField) {
                        return { ...prev, asc: !prev.asc };
                    }

                    return {
                        field: sortField,
                        asc: true,
                    };
                })
            }
        >
            {children}
        </TableSortLabel>
    );
}
