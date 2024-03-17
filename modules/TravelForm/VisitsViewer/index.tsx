"use client";

import { useTravelForm } from "@/hooks/useTravelForm";
import { useEmployeeVisitsQuery } from "@/hooks/useEmployeeVisitsQuery";
import { VisitsTable } from "./VisitsTable";

export function VisitsViewer() {
    const { employeeId } = useTravelForm();
    const {
        data: visits,
        isLoading,
        isSuccess,
        error,
    } = useEmployeeVisitsQuery(employeeId);

    if (!employeeId) return null;

    if (isLoading) return <b>Loading...</b>;

    if (error || !isSuccess) {
        const errorMessage =
            error instanceof Error
                ? error.message
                : "An unexpected error ocurred";

        return <b className="text-red-500">{errorMessage}</b>;
    }

    return <VisitsTable visits={visits} />;
}
