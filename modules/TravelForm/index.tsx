import { TravelFormProvider } from "@/providers/TravelFormProvider";
import { EmployeeField } from "./EmployeeField";
import { getEmployees } from "@/db/queries/employee";
import { ActivityField } from "./ActivityField";
import { MapButton } from "./MapButton";

export default async function TravelForm() {
    const employees = await getEmployees();

    return (
        <TravelFormProvider employees={employees}>
            <EmployeeField />

            <ActivityField />

            <MapButton />
        </TravelFormProvider>
    );
}
