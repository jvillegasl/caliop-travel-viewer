import { TravelFormProvider } from "@/providers/TravelFormProvider";
import { EmployeeField } from "./EmployeeField";
import { selEmployees } from "@/db/queries/employee";
import { ActivityField } from "./ActivityField";
import { MapButton } from "./MapButton";

export default async function TravelForm() {
    const employees = await selEmployees();

    return (
        <TravelFormProvider employees={employees}>
            <EmployeeField />

            <ActivityField />

            <MapButton />
        </TravelFormProvider>
    );
}
