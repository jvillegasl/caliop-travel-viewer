"use client";

import { Box, Collapse, IconButton, TableCell, TableRow } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Visit } from "@/db/models";
import { useState } from "react";
import { VisitDetailsExpenseViewer } from "./VisitDetailsExpenseViewer";
import { useVisitDetailsExpenseQuery } from "@/hooks/useVisitDetailsExpenseQuery";
import moment from "moment";

type VisitRowProps = {
    row: Visit;
};

export function VisitRow({ row }: VisitRowProps) {
    const [open, setOpen] = useState<boolean>(false);

    const {
        data: visitDetailsExpense,
        isLoading,
        isSuccess,
        error,
        refetch,
    } = useVisitDetailsExpenseQuery(row.Id);

    function handleClick() {
        setOpen((t) => !t);

        if (visitDetailsExpense) return;

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

        return (
            <VisitDetailsExpenseViewer
                visitDetailsExpense={visitDetailsExpense}
            />
        );
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
                <TableCell align="center">{row.Id}</TableCell>
                <TableCell align="center">{row.ActivityId}</TableCell>
                <TableCell align="left">{row.Title}</TableCell>
                <TableCell align="left">{row.Description}</TableCell>
                <TableCell align="left">
                    {moment(row.PlannedStartDate)
                        .utc()
                        .format("yyyy/MM/DD hh:mm:ss UTC")}
                </TableCell>
                <TableCell align="left">
                    {moment(row.PlannedEndDate)
                        .utc()
                        .format("yyyy/MM/DD hh:mm:ss UTC")}
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
