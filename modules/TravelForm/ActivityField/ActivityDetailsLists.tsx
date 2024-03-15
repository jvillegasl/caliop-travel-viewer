"use client";

import { Box, Grid, List, ListItem, Radio, Typography } from "@mui/material";
import { ActivityDetails, TravelItem } from "@/types";
import { BaseVisitDetails } from "@/db/models";
import { ReactNode } from "react";
import { useTravelForm } from "@/hooks/useTravelForm";
import { TravelType } from "@/enums/travelType";

type ActivityDetailsListsProps = {
    activityId: number;
    activityDetails: ActivityDetails;
};

export function ActivityDetailsLists({
    activityId,
    activityDetails: { visitDetails, visitExpense },
}: ActivityDetailsListsProps) {
    const { travelItem, setTravelItem, setActivityId } = useTravelForm();

    function handleClick(item: TravelItem) {
        if (item.id === travelItem?.id) {
            setActivityId(null);
            setTravelItem(null);
            return;
        }

        setActivityId(activityId);
        setTravelItem(item);
    }

    return (
        <Grid container columnSpacing={6}>
            <ActivityDetailsBox
                title="Visit Details"
                id={visitDetails.Id}
                type={TravelType.VISIT}
                travelItem={travelItem}
                onClick={handleClick}
            >
                <BaseVisitDetailsItems details={visitDetails} />

                <ListItem sx={{ display: "list-item" }}>
                    <b>StartDate:</b>{" "}
                    {visitDetails.SessionStartDate.toISOString()}
                </ListItem>

                <ListItem sx={{ display: "list-item" }}>
                    <b>EndDate:</b> {visitDetails.SessionEndDate.toISOString()}
                </ListItem>
            </ActivityDetailsBox>

            <ActivityDetailsBox
                title="Visit Expense"
                id={visitExpense.Id}
                type={TravelType.EXPENSE}
                travelItem={travelItem}
                onClick={handleClick}
            >
                <BaseVisitDetailsItems details={visitExpense} />
            </ActivityDetailsBox>
        </Grid>
    );
}

type ActivityDetailsBox = {
    id: number;
    type: TravelType;
    title: string;
    children: ReactNode;
    travelItem: TravelItem | null | undefined;
    onClick: (travelItem: TravelItem) => void;
};

function ActivityDetailsBox({
    id,
    type,
    title,
    children,
    travelItem,
    onClick,
}: ActivityDetailsBox) {
    return (
        <Grid item xs>
            <Box
                height={"100%"}
                paddingX={4}
                paddingY={3}
                sx={{
                    boxShadow: 2,
                    borderRadius: "4px",
                }}
            >
                <Box component="div" sx={{ display: "inline" }}>
                    <Typography
                        variant="subtitle1"
                        gutterBottom
                        component="div"
                        fontWeight="bold"
                        sx={{ display: "inline" }}
                    >
                        {title}
                    </Typography>

                    <Radio
                        checked={id === travelItem?.id}
                        onClick={() => onClick({ id, type })}
                    />
                </Box>

                <Box>
                    <List
                        sx={{
                            listStyleType: "disc",
                            listStylePosition: "inside",
                        }}
                    >
                        {children}
                    </List>
                </Box>
            </Box>
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
