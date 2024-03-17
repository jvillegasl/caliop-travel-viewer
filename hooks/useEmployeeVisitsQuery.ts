import { getEmployeeVisits } from "@/actions/getEmployeeVisits";
import { useQuery } from "react-query";

export function useEmployeeVisitsQuery(employeeId: number | null | undefined) {
    const query = useQuery(
        ["visits", employeeId],
        () => getEmployeeVisits(employeeId!),
        { enabled: !!employeeId },
    );

    return query;
}
