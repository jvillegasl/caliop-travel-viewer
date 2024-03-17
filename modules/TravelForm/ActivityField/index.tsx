"use client";

import { useTravelForm } from "@/hooks/useTravelForm";
import { useActivitiesQuery } from "@/hooks/useActivitiesQuery";
import { ActivitiesTable } from "./ActivitiesTable";

export function ActivityField() {
    const { employeeId } = useTravelForm();
    const {
        data: activities,
        isLoading,
        isSuccess,
        error,
    } = useActivitiesQuery(employeeId);

    if (!employeeId) return null;

    if (isLoading) return <b>Loading...</b>;

    if (error || !isSuccess) {
        const errorMessage =
            error instanceof Error
                ? error.message
                : "An unexpected error ocurred";

        return <b className="text-red-500">{errorMessage}</b>;
    }

    return <ActivitiesTable activities={activities} />;
}
