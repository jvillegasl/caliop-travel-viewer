import { selLocalizationByTravel } from "@/db/queries/localization";
import { TravelType } from "@/enums/travelType";
import { TravelItem } from "@/types";
import dynamic from "next/dynamic";
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

const LazyTravelMap = dynamic(() => import("@/modules/TravelMap"), {
    ssr: false,
    loading: () => <p>Loading...</p>,
});

export default async function Page({ params }: PageProps) {
    const validationResult = paramsSchema.safeParse(params);

    if (!validationResult.success) return notFound();

    const travelItem = validationResult.data;

    const coords = await selLocalizationByTravel(travelItem);

    return (
        <>
            <div>
                <b>Travel:</b>{" "}
                <span className="capitalize">{travelItem.type}</span>
            </div>

            <div>
                <b>Id:</b> {travelItem.id}
            </div>

            <br />

            <LazyTravelMap travelCoords={coords} />
        </>
    );
}
