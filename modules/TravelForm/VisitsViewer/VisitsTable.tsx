import { Visit } from "@/db/models";
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import { VisitRow } from "./VisitRow";

type VisitsTableProps = { visits: Visit[] };

export function VisitsTable({ visits }: VisitsTableProps) {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>Id</TableCell>
                        <TableCell align="right">Title</TableCell>
                        <TableCell align="right">Description</TableCell>
                        <TableCell align="right">PlannedStartDate</TableCell>
                        <TableCell align="right">PlannedEndDate</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {visits.map((row) => (
                        <VisitRow key={row.Id} row={row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
