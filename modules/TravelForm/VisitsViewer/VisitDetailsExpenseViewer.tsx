"use client";

import { Grid, List, ListItem } from "@mui/material";
import { VisitDetailsExpense } from "@/types";
import { BaseVisitTravel } from "@/db/models";
import { TravelType } from "@/enums/travelType";
import { VisitDetailsExpenseBox } from "./VisitDetailsExpenseBox";
import moment from "moment";

type VisitDetailsExpenseViewerProps = {
    visitDetailsExpense: VisitDetailsExpense;
};

export function VisitDetailsExpenseViewer({
    visitDetailsExpense: { visitDetails, visitExpense },
}: VisitDetailsExpenseViewerProps) {
    return (
        <Grid container columnSpacing={6}>
            {!visitDetails && !visitExpense && (
                <Grid item>
                    <b>No VisitDetail or VisitExpense were found</b>
                </Grid>
            )}

            {!!visitDetails && (
                <Grid item xs>
                    <VisitDetailsExpenseBox
                        title="Visit Details"
                        id={visitDetails.Id}
                        type={TravelType.VISIT}
                    >
                        <BaseVisitTravelItems details={visitDetails} />

                        <ListItem sx={{ display: "list-item" }}>
                            <b>Seesion:</b>
                            <List
                                sx={{
                                    listStyleType: "disc",
                                    listStylePosition: "inside",
                                }}
                            >
                                <ListItem sx={{ display: "list-item" }}>
                                    <b>StartDate:</b>{" "}
                                    {moment(visitDetails.SessionStartDate)
                                        .utc()
                                        .format("yyyy/MM/DD hh:mm:ss UTC")}
                                </ListItem>
                                <ListItem sx={{ display: "list-item" }}>
                                    <b>EndDate:</b>{" "}
                                    {moment(visitDetails.SessionEndDate)
                                        .utc()
                                        .format("yyyy/MM/DD hh:mm:ss UTC")}
                                </ListItem>
                            </List>
                        </ListItem>
                    </VisitDetailsExpenseBox>
                </Grid>
            )}

            {!!visitExpense && (
                <Grid item xs>
                    <VisitDetailsExpenseBox
                        title="Visit Expense"
                        id={visitExpense.Id}
                        type={TravelType.EXPENSE}
                    >
                        <BaseVisitTravelItems details={visitExpense} />
                    </VisitDetailsExpenseBox>
                </Grid>
            )}
        </Grid>
    );
}

type BaseVisitTravelProps = {
    details: BaseVisitTravel;
};

function BaseVisitTravelItems({ details }: BaseVisitTravelProps) {
    return (
        <>
            <ListItem sx={{ display: "list-item" }}>
                <b>Id:</b> {details.Id}
            </ListItem>

            <ListItem sx={{ display: "list-item" }}>
                <b>Route:</b>
                <List
                    sx={{
                        listStyleType: "disc",
                        listStylePosition: "inside",
                    }}
                >
                    <ListItem sx={{ display: "list-item" }}>
                        <b>StartDate:</b>{" "}
                        {moment(details.RouteStartDate)
                            .utc()
                            .format("yyyy/MM/DD hh:mm:ss UTC")}
                    </ListItem>
                    <ListItem sx={{ display: "list-item" }}>
                        <b>EndDate:</b>{" "}
                        {moment(details.RouteEndDate)
                            .utc()
                            .format("yyyy/MM/DD hh:mm:ss UTC")}
                    </ListItem>
                    <ListItem sx={{ display: "list-item" }}>
                        <b>Mileage:</b> {details.RouteMiles}
                    </ListItem>
                </List>
            </ListItem>

            <ListItem sx={{ display: "list-item" }}>
                <b>Return:</b>
                <List
                    sx={{
                        listStyleType: "disc",
                        listStylePosition: "inside",
                    }}
                >
                    <ListItem sx={{ display: "list-item" }}>
                        <b>StartDate:</b>{" "}
                        {moment(details.ReturnStartDate)
                            .utc()
                            .format("yyyy/MM/DD hh:mm:ss UTC")}
                    </ListItem>
                    <ListItem sx={{ display: "list-item" }}>
                        <b>EndDate:</b>{" "}
                        {moment(details.ReturnEndDate)
                            .utc()
                            .format("yyyy/MM/DD hh:mm:ss UTC")}
                    </ListItem>
                    <ListItem sx={{ display: "list-item" }}>
                        <b>Mileage:</b> {details.ReturnMiles}
                    </ListItem>
                </List>
            </ListItem>
        </>
    );
}
