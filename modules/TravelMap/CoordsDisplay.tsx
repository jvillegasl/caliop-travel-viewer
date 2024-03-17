"use client";

import { Localization } from "@/db/models";
import { Marker, Popup } from "react-leaflet";
import { useMemo } from "react";
import { DecoratedPolyline } from "./DecoratedPolyline";
import { getArrowheadPattern } from "./getArrowHeadPattern";
import { getMarkerIcon } from "./getMarkerIcon";

type CoordsDisplayProps = {
    coords: Localization[];
    coordsCount: number;
    color?: string;
    showMarkers?: boolean;
};

export function CoordsDisplay({
    coords,
    coordsCount,
    color,
    showMarkers = false,
}: CoordsDisplayProps) {
    const filteredCoords = useMemo(
        () => coords.slice(0, coordsCount),
        [coords, coordsCount],
    );

    const coordsPolyline = useMemo(
        () =>
            filteredCoords.map((t) => ({
                lat: t.Latitude,
                lng: t.Longitude,
            })),
        [filteredCoords],
    );

    function getCoordsMarkers() {
        return filteredCoords.map((coord, idx) => (
            <Marker
                key={idx}
                position={[coord.Latitude, coord.Longitude]}
                icon={getMarkerIcon()}
            >
                <Popup>
                    <span>
                        {coord.Id} - {coord.InsertState}
                    </span>
                </Popup>
            </Marker>
        ));
    }

    return (
        <>
            <DecoratedPolyline
                positions={coordsPolyline}
                color={color}
                patterns={getArrowheadPattern(color)}
            />

            {showMarkers && getCoordsMarkers()}
        </>
    );
}
