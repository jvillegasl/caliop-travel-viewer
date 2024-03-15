import { useCallback, useState } from "react";
import { ActivityDetails, FetchStatus } from "@/types";
import { getActivityDetails } from "@/actions/getActivityDetails";

export function useActivityDetailsQuery() {
    const [activityDetails, setActivityDetails] =
        useState<ActivityDetails | null>(null);
    const [fetchStatus, setFetchStatus] = useState<FetchStatus | null>(null);

    const fetchActivityDetails = useCallback((visitId: number) => {
        setFetchStatus({ status: "loading" });

        getActivityDetails(visitId)
            .then((data) => {
                setFetchStatus({ status: "success" });
                setActivityDetails(data);
            })
            .catch((error) => {
                console.error(error);
                setFetchStatus({
                    status: "error",
                    errorMessage: "An unexpected error ocurred",
                });
            });
    }, []);

    return { activityDetails, fetchStatus, fetchActivityDetails };
}
