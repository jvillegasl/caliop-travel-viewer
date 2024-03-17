import { Activity } from "@/db/models";
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import { ActivityRow } from "./ActivityRow";

type ActivitiesTableProps = { activities: Activity[] };

export function ActivitiesTable({ activities }: ActivitiesTableProps) {
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
                    {activities.map((row) => (
                        <ActivityRow key={row.VisitId} row={row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
