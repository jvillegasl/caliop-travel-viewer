import { getActivityDetails } from "@/actions/getActivityDetails";
import { useQuery } from "react-query";

export function useActivityDetailsQuery(visitId: number | null | undefined) {
    const query = useQuery(
        ["activityDetails", visitId],
        () => getActivityDetails(visitId!),
        { enabled: false },
    );

    return query;
}
