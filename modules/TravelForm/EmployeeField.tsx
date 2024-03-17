"use client";

import { useTravelForm } from "@/hooks/useTravelForm";
import { Autocomplete, TextField } from "@mui/material";

export function EmployeeField() {
    const { employees, setEmployeeId } = useTravelForm();

    return (
        <Autocomplete
            sx={{ width: 320 }}
            disablePortal
            options={employees}
            getOptionKey={(option) => option.Id}
            getOptionLabel={(option) => option.Lastname + ", " + option.Name}
            renderInput={(params) => <TextField {...params} label="Employee" />}
            onChange={(_, value) => setEmployeeId(value?.Id)}
        />
    );
}
