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

    const { activityDetails, fetchStatus, fetchActivityDetails } =
        useActivityDetailsQuery();

    function handleClick() {
        setOpen((t) => !t);

        if (activityDetails) return;

        fetchActivityDetails(row.VisitId);
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
                        <Box
                            sx={{ margin: 1, paddingTop: 2, paddingBottom: 2 }}
                        >
                            {fetchStatus?.status === "loading" ? (
                                <b>Loading...</b>
                            ) : fetchStatus?.status === "success" &&
                              activityDetails ? (
                                <ActivityDetailsLists
                                    activityId={row.Id}
                                    activityDetails={activityDetails}
                                />
                            ) : fetchStatus?.status === "error" ? (
                                <b className="text-red-500">
                                    {fetchStatus.errorMessage}
                                </b>
                            ) : (
                                <b>NOT FOUND</b>
                            )}
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
}
