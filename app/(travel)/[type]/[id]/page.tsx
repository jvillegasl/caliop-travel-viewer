import { getLocalizationByTravel } from "@/db/queries/localization";
import { TravelType } from "@/enums/travelType";
import { TravelMap } from "@/modules/TravelMap";
import { TravelItem } from "@/types";
import { notFound } from "next/navigation";
import { z } from "zod";

type Params = TravelItem;

type PageProps = {
    params: Record<keyof Params, string>;
};

const paramsSchema = z.object({
    id: z.coerce.number().int(),
    type: z.nativeEnum(TravelType),
}) satisfies z.ZodType<Params>;

export default async function Page({ params }: PageProps) {
    const validationResult = paramsSchema.safeParse(params);

    if (!validationResult.success) return notFound();

    const travelItem = validationResult.data;

    const coords = await getLocalizationByTravel(travelItem);

    return (
        <main>
            <div>{travelItem.id}</div>

            <div>{travelItem.type}</div>

            <TravelMap coords={coords} />
        </main>
    );
}
