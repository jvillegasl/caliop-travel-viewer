import "leaflet-polylinedecorator";
import L from "leaflet";
import { useEffect } from "react";
import { PolylineProps, useMap } from "react-leaflet";

type DecoratedPolylineProps = Omit<PolylineProps, "positions"> & {
    patterns: L.Pattern[];
    positions: L.LatLngExpression[];
};

export function DecoratedPolyline({
    color,
    patterns,
    positions,
}: DecoratedPolylineProps) {
    const map = useMap();

    useEffect(() => {
        if (!map) return;

        const polyline = L.polyline(positions, { color }).addTo(map);

        const lines: [L.LatLngExpression, L.LatLngExpression][] = [];
        for (let i = 0; i < positions.length - 1; i++) {
            const line: [L.LatLngExpression, L.LatLngExpression] = [
                positions[i],
                positions[i + 1],
            ];

            lines.push(line);
        }

        const decorators = lines.map((t) =>
            L.polylineDecorator(new L.Polyline(t), {
                patterns,
            }).addTo(map),
        );

        return () => {
            polyline.remove();
            decorators.map((t) => t.remove());
        };
    }, [map, color, patterns, positions]);

    return null;
}
