"use client";

import { Grid, List, ListItem } from "@mui/material";
import { ActivityDetails } from "@/types";
import { BaseVisitDetails } from "@/db/models";
import { TravelType } from "@/enums/travelType";
import { ActivityDetailsBox } from "./ActivityDetailsBox";

type ActivityDetailsListsProps = {
    activityDetails: ActivityDetails;
};

export function ActivityDetailsLists({
    activityDetails: { visitDetails, visitExpense },
}: ActivityDetailsListsProps) {
    return (
        <Grid container columnSpacing={6}>
            <Grid item xs>
                <ActivityDetailsBox
                    title="Visit Details"
                    id={visitDetails.Id}
                    type={TravelType.VISIT}
                >
                    <BaseVisitDetailsItems details={visitDetails} />
                    <ListItem sx={{ display: "list-item" }}>
                        <b>StartDate:</b>{" "}
                        {visitDetails.SessionStartDate.toISOString()}
                    </ListItem>
                    <ListItem sx={{ display: "list-item" }}>
                        <b>EndDate:</b>{" "}
                        {visitDetails.SessionEndDate.toISOString()}
                    </ListItem>
                </ActivityDetailsBox>
            </Grid>

            <Grid item xs>
                <ActivityDetailsBox
                    title="Visit Expense"
                    id={visitExpense.Id}
                    type={TravelType.EXPENSE}
                >
                    <BaseVisitDetailsItems details={visitExpense} />
                </ActivityDetailsBox>
            </Grid>
        </Grid>
    );
}

type BaseVisitDetailsItemsProps = {
    details: BaseVisitDetails;
};

function BaseVisitDetailsItems({ details }: BaseVisitDetailsItemsProps) {
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
