import { Localization } from "@/db/models";

export type TravelCoords = {
    routeCoords: Localization[];
    returnCoords: Localization[];
};
