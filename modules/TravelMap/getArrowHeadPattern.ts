import L from "leaflet";

export function getArrowheadPattern(color?: string) {
    return [
        {
            offset: "100%",
            repeat: 0,
            symbol: L.Symbol.arrowHead({
                pixelSize: 6,
                polygon: false,
                pathOptions: { stroke: true, color },
            }),
        },
    ];
}
