"use client";

import { Grid, List, ListItem } from "@mui/material";
import { VisitDetailsExpense } from "@/types";
import { BaseVisitTravel } from "@/db/models";
import { TravelType } from "@/enums/travelType";
import { VisitDetailsExpenseBox } from "./VisitDetailsExpenseBox";

type VisitDetailsExpenseViewerProps = {
    visitDetailsExpense: VisitDetailsExpense;
};

export function VisitDetailsExpenseViewer({
    visitDetailsExpense: { visitDetails, visitExpense },
}: VisitDetailsExpenseViewerProps) {
    return (
        <Grid container columnSpacing={6}>
            <Grid item xs>
                <VisitDetailsExpenseBox
                    title="Visit Details"
                    id={visitDetails.Id}
                    type={TravelType.VISIT}
                >
                    <BaseVisitTravelItems details={visitDetails} />
                    <ListItem sx={{ display: "list-item" }}>
                        <b>StartDate:</b>{" "}
                        {visitDetails.SessionStartDate.toISOString()}
                    </ListItem>
                    <ListItem sx={{ display: "list-item" }}>
                        <b>EndDate:</b>{" "}
                        {visitDetails.SessionEndDate.toISOString()}
                    </ListItem>
                </VisitDetailsExpenseBox>
            </Grid>

            <Grid item xs>
                <VisitDetailsExpenseBox
                    title="Visit Expense"
                    id={visitExpense.Id}
                    type={TravelType.EXPENSE}
                >
                    <BaseVisitTravelItems details={visitExpense} />
                </VisitDetailsExpenseBox>
            </Grid>
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
                        <b>StartDate:</b> {details.RouteStartDate.toISOString()}
                    </ListItem>
                    <ListItem sx={{ display: "list-item" }}>
                        <b>EndDate:</b> {details.RouteEndDate.toISOString()}
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
                        {details.ReturnStartDate.toISOString()}
                    </ListItem>
                    <ListItem sx={{ display: "list-item" }}>
                        <b>EndDate:</b> {details.ReturnEndDate.toISOString()}
                    </ListItem>
                    <ListItem sx={{ display: "list-item" }}>
                        <b>Mileage:</b> {details.ReturnMiles}
                    </ListItem>
                </List>
            </ListItem>
        </>
    );
}
