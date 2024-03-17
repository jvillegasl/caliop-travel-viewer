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
import { Dispatch, ReactNode, SetStateAction } from "react";
import {
    SortCriteria,
    SortField,
    useFilterSortVisits,
} from "@/hooks/useFilterSortVisits";

type VisitsTableProps = { visits: Visit[] };

export function VisitsTable({ visits }: VisitsTableProps) {
    const { sortedVisits, sortCriteria, setSortCriteria } =
        useFilterSortVisits(visits);

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell align="center">
                            <SortingCellBody
                                sortField="Id"
                                sortCriteria={sortCriteria}
                                setSortCriteria={setSortCriteria}
                            >
                                Id
                            </SortingCellBody>
                        </TableCell>
                        <TableCell align="center">
                            <SortingCellBody
                                sortField="ActivityId"
                                sortCriteria={sortCriteria}
                                setSortCriteria={setSortCriteria}
                            >
                                ActivityId
                            </SortingCellBody>
                        </TableCell>
                        <TableCell align="left">Title</TableCell>
                        <TableCell align="left">Description</TableCell>
                        <TableCell align="left">
                            <SortingCellBody
                                sortField="PlannedStartDate"
                                sortCriteria={sortCriteria}
                                setSortCriteria={setSortCriteria}
                            >
                                PlannedStartDate
                            </SortingCellBody>
                        </TableCell>
                        <TableCell align="left">PlannedEndDate</TableCell>
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
