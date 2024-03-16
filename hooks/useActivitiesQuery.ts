import { getEmployeeActivities } from "@/actions/getEmployeeActivities";
import { useQuery } from "react-query";

export function useActivitiesQuery(employeeId: number | null | undefined) {
    const query = useQuery(
        ["activities", employeeId],
        () => getEmployeeActivities(employeeId!),
        { enabled: !!employeeId },
    );

    return query;
}
