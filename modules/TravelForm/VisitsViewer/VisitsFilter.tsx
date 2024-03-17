import { useTravelForm } from "@/hooks/useTravelForm";
import { Box, Stack } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";

type VisitsFilterProps = {};

export function VisitsFilter({}: VisitsFilterProps) {
    const { startDate, endDate, setStartDate, setEndDate } = useTravelForm();

    return (
        <Box>
            <Stack direction="row" spacing={2}>
                <DatePicker
                    label="Start date (UTC)"
                    value={startDate}
                    onChange={(t) => setStartDate(t)}
                    format="YYYY/MM/DD"
                    timezone="UTC"
                />

                <DatePicker
                    label="End date (UTC)"
                    value={endDate}
                    onChange={(t) => setEndDate(t)}
                    format="YYYY/MM/DD"
                    minDate={startDate}
                    timezone="UTC"
                />
            </Stack>
        </Box>
    );
}
