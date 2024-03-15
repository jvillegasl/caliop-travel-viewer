"use client";

import { useTravelForm } from "@/hooks/useTravelForm";
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import { Activity } from "@/db/models";
import { ActivityRow } from "./ActivityRow";

export function ActivityField() {
    const { filteredActivities, activitiesFetchStatus: fetchStatus } =
        useTravelForm();

    if (fetchStatus === null) return;

    if (fetchStatus.status === "loading") return <b>Loading...</b>;

    if (fetchStatus.status === "error")
        return <b className="text-red-500">{fetchStatus.errorMessage}</b>;

    if (fetchStatus.status === "success" && filteredActivities)
        return <ActivitiesTable activities={filteredActivities} />;

    return <b>NOT FOUND</b>;
}

type ActivitiesTableProps = {
    activities: Activity[];
};

function ActivitiesTable({ activities }: ActivitiesTableProps) {
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
                        <ActivityRow key={row.Id} row={row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
