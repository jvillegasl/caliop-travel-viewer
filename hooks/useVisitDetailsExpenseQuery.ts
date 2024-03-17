import { getVisitDetailsExpense } from "@/actions/getVisitDetailsExpense";
import { useQuery } from "react-query";

export function useVisitDetailsExpenseQuery(
    visitId: number | null | undefined,
) {
    const query = useQuery(
        ["visitDetailsExpense", visitId],
        () => getVisitDetailsExpense(visitId!),
        { enabled: false },
    );

    return query;
}
