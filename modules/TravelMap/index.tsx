"use client";

import { Localization } from "@/db/models";
import dynamic from "next/dynamic";

const LazyMap = dynamic(() => import("@/modules/TravelMap/Map"), {
    ssr: false,
    loading: () => <p>Loading...</p>,
});

type TravelMapProps = {
    coords: Localization[];
};

export function TravelMap({ coords }: TravelMapProps) {
    return (
        <div>
            <h2>Travel Map</h2>

            <LazyMap />
        </div>
    );
}
