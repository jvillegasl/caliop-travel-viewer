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
import { useActivitiesQuery } from "@/hooks/useActivitiesQuery";
import { useMemo } from "react";

export function ActivityField() {
    const { employeeId, activityId } = useTravelForm();
    const {
        data: activities,
        isLoading,
        isSuccess,
        error,
    } = useActivitiesQuery(employeeId);

    if (!employeeId) return null;

    if (isLoading) return <b>Loading...</b>;

    if (error || !isSuccess) {
        const errorMessage =
            error instanceof Error
                ? error.message
                : "An unexpected error ocurred";

        return <b className="text-red-500">{errorMessage}</b>;
    }

    return <ActivitiesTable activityId={activityId} activities={activities} />;
}

type ActivitiesTableProps = {
    activityId: number | null | undefined;
    activities: Activity[];
};

function ActivitiesTable({ activityId, activities }: ActivitiesTableProps) {
    const filteredActivities = useMemo(() => {
        if (!activityId) return activities;

        return activities?.filter((t) => t.Id === activityId) ?? null;
    }, [activities, activityId]);

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
                    {filteredActivities.map((row) => (
                        <ActivityRow key={row.VisitId} row={row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
