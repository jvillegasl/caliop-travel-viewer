import { getEmployeeActivities } from "@/actions/getEmployeeActivities";
import { Activity } from "@/db/models";
import { FetchStatus } from "@/types/fetchStatus";
import { useCallback, useState } from "react";

export function useActivitiesQuery() {
    const [activities, setActivities] = useState<Activity[] | null>(null);
    const [fetchStatus, setActivitiesFetchStatus] =
        useState<FetchStatus | null>(null);

    const fetchActivities = useCallback((employeeId: number) => {
        setActivitiesFetchStatus({ status: "loading" });

        getEmployeeActivities(employeeId)
            .then((t) => {
                setActivitiesFetchStatus({ status: "success" });
                setActivities(t);
            })
            .catch((error) => {
                console.error(error);
                setActivitiesFetchStatus({
                    status: "error",
                    errorMessage: "An unexpected error ocurred",
                });
            });
    }, []);

    return { activities, fetchStatus, fetchActivities };
}
