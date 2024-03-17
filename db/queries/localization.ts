import "server-only";

import { TravelItem } from "@/types";
import { sleep } from "@/utils/sleep";
import { RETURN_LOCALIZATION, ROUTE_LOCALIZATION } from "../data/localization";
import { TravelCoords } from "@/types/travelCoords";

export async function selLocalizationByTravel(travel: TravelItem) {
    await sleep(Math.random() * 3000);

    const coords: TravelCoords = {
        routeCoords: ROUTE_LOCALIZATION,
        returnCoords: RETURN_LOCALIZATION,
    };

    return coords;
}
