import { LOCALIZATION } from "@/data/localization";
import { TravelItem } from "@/types";
import { sleep } from "@/utils/sleep";

export async function getLocalizationByTravel(travel: TravelItem) {
    await sleep(Math.random() * 3000);

    return LOCALIZATION;
}
