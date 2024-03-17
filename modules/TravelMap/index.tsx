"use client";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";

import { MapContainer, TileLayer } from "react-leaflet";
import { Box, Slider, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { TravelCoords } from "@/types/travelCoords";
import { CoordsDisplay } from "./CoordsDisplay";

type TravelMapProps = {
    travelCoords: TravelCoords;
};

export default function TravelMap({
    travelCoords: { routeCoords, returnCoords },
}: TravelMapProps) {
    const [routeCoordsCount, setRouteCoordsCount] = useState<number>(
        routeCoords.length,
    );
    const [returnCoordsCount, setReturnCoordsCount] = useState<number>(
        returnCoords.length,
    );

    return (
        <div style={{ width: "100%", height: "800px", position: "relative" }}>
            <MapContainer
                style={{ width: "100%", height: "100%" }}
                zoom={15}
                center={[routeCoords[0].Latitude, routeCoords[0].Longitude]}
                preferCanvas={true}
                scrollWheelZoom={true}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <CoordsDisplay
                    coords={routeCoords}
                    coordsCount={routeCoordsCount}
                    color="#FF0000"
                />

                <CoordsDisplay
                    coords={returnCoords}
                    coordsCount={returnCoordsCount}
                    color="#0000FF"
                />
            </MapContainer>

            <Box
                sx={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    zIndex: 10000,
                    bgcolor: "white",
                    marginTop: "12px",
                    marginRight: "12px",
                    borderRadius: "16px",
                    paddingY: 2,
                    paddingX: 5,
                    boxShadow: 3,
                }}
            >
                <Box>
                    <Stack spacing={4} direction="row" alignItems="center">
                        <Typography width={50}>Route</Typography>

                        <Slider
                            sx={{ width: 200 }}
                            defaultValue={30}
                            min={1}
                            max={routeCoords.length}
                            value={routeCoordsCount}
                            onChange={(_, t) =>
                                setRouteCoordsCount(t as number)
                            }
                        />
                    </Stack>

                    <Stack spacing={4} direction="row" alignItems="center">
                        <Typography width={50}>Return</Typography>

                        <Slider
                            sx={{ width: 200 }}
                            defaultValue={30}
                            min={1}
                            max={returnCoords.length}
                            value={returnCoordsCount}
                            onChange={(_, t) =>
                                setReturnCoordsCount(t as number)
                            }
                        />
                    </Stack>
                </Box>
            </Box>
        </div>
    );
}
