import { TravelFormProvider } from "@/providers/TravelFormProvider";
import { EmployeeField } from "./EmployeeField";
import { selEmployees } from "@/db/queries/employee";
import { VisitsViewer } from "./VisitsViewer";
import { Box } from "@mui/material";

export default async function TravelForm() {
    const employees = await selEmployees();

    return (
        <TravelFormProvider employees={employees}>
            <Box>
                <EmployeeField />

                <br />

                <VisitsViewer />
            </Box>
        </TravelFormProvider>
    );
}
