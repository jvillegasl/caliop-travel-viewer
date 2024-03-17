import "leaflet-polylinedecorator";
import L from "leaflet";
import { useEffect } from "react";
import { PolylineProps, useMap } from "react-leaflet";
import chroma from "chroma-js";

type DecoratedPolylineProps = Omit<PolylineProps, "positions"> & {
    patterns?: L.Pattern[];
    positions: L.LatLngExpression[];
    decorateEachLine?: boolean;
    colorGradient?: [string, string];
};

export function DecoratedPolyline({
    color,
    patterns = [],
    positions,
    decorateEachLine = false,
    colorGradient,
}: DecoratedPolylineProps) {
    const map = useMap();

    useEffect(() => {
        if (!map) return;

        const polylines: L.Polyline[] = [];

        if (colorGradient) {
            const lines = getPolylineSteps(positions);

            const gradient = chroma.scale(colorGradient);

            for (let i = 0; i < lines.length; i++) {
                const polyline = L.polyline(lines[i], {
                    color: gradient(i / lines.length).hex(),
                }).addTo(map);

                polylines.push(polyline);
            }
        } else {
            polylines.push(L.polyline(positions, { color }).addTo(map));
        }

        const decorators = decorateEachLine
            ? getMultipleDecorators(positions, patterns, map)
            : [getSingleDecorator(positions, patterns, map)];

        return () => {
            polylines.map((t) => t.remove());
            decorators.map((t) => t.remove());
        };
    }, [map, color, patterns, positions, decorateEachLine, colorGradient]);

    return null;
}

function getMultipleDecorators(
    positions: L.LatLngExpression[],
    patterns: L.Pattern[],
    map: L.Map,
) {
    const lines = getPolylineSteps(positions);

    const decorators = lines.map((t) =>
        L.polylineDecorator(new L.Polyline(t), {
            patterns,
        }).addTo(map),
    );

    return decorators;
}

function getSingleDecorator(
    positions: L.LatLngExpression[],
    patterns: L.Pattern[],
    map: L.Map,
) {
    const decorator = L.polylineDecorator(new L.Polyline(positions), {
        patterns,
    }).addTo(map);

    return decorator;
}

function getPolylineSteps(positions: L.LatLngExpression[]) {
    const lines: [L.LatLngExpression, L.LatLngExpression][] = [];
    for (let i = 0; i < positions.length - 1; i++) {
        const line: [L.LatLngExpression, L.LatLngExpression] = [
            positions[i],
            positions[i + 1],
        ];

        lines.push(line);
    }

    return lines;
}
