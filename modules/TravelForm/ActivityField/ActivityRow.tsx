"use client";

import { Box, Collapse, IconButton, TableCell, TableRow } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Activity } from "@/db/models";
import { useState } from "react";
import { ActivityDetailsLists } from "./ActivityDetailsLists";
import { useActivityDetailsQuery } from "@/hooks/useActivityDetailsQuery";

type ActivityRowProps = {
    row: Activity;
};

export function ActivityRow({ row }: ActivityRowProps) {
    const [open, setOpen] = useState<boolean>(false);

    const {
        data: activityDetails,
        isLoading,
        isSuccess,
        error,
        refetch,
    } = useActivityDetailsQuery(row.VisitId);

    function handleClick() {
        setOpen((t) => !t);

        if (activityDetails) return;

        refetch();
    }

    function getDetailsLists() {
        if (isLoading) return <b>Loading...</b>;

        if (error || !isSuccess) {
            const errorMessage =
                error instanceof Error
                    ? error.message
                    : "An unexpected error ocurred";

            return <b className="text-red-500">{errorMessage}</b>;
        }

        return <ActivityDetailsLists activityDetails={activityDetails} />;
    }

    return (
        <>
            <TableRow key={row.Id} sx={{ "& > *": { borderBottom: "unset" } }}>
                <TableCell>
                    <IconButton size="small" onClick={handleClick}>
                        {open ? (
                            <KeyboardArrowUpIcon />
                        ) : (
                            <KeyboardArrowDownIcon />
                        )}
                    </IconButton>
                </TableCell>
                <TableCell>{row.Id}</TableCell>
                <TableCell align="right">{row.Title}</TableCell>
                <TableCell align="right">{row.Description}</TableCell>
                <TableCell align="right">
                    {row.PlannedStartDate.toISOString()}
                </TableCell>
                <TableCell align="right">
                    {row.PlannedEndDate.toISOString()}
                </TableCell>
            </TableRow>

            <TableRow>
                <TableCell
                    style={{
                        paddingBottom: 0,
                        paddingTop: 0,
                        paddingLeft: 36,
                        paddingRight: 36,
                    }}
                    colSpan={12}
                >
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1, paddingY: 4 }}>
                            {getDetailsLists()}
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
}
