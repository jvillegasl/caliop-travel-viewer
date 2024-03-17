import { TravelFormProvider } from "@/providers/TravelFormProvider";
import { EmployeeField } from "./EmployeeField";
import { selEmployees } from "@/db/queries/employee";
import { ActivityField } from "./ActivityField";
import { Box } from "@mui/material";

export default async function TravelForm() {
    const employees = await selEmployees();

    return (
        <TravelFormProvider employees={employees}>
            <Box>
                <EmployeeField />

                <br />

                <ActivityField />
            </Box>
        </TravelFormProvider>
    );
}
