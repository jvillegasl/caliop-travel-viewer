"use client";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { PropsWithChildren } from "react";

export function MuiLocalizationProvider({ children }: PropsWithChildren) {
    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
            {children}
        </LocalizationProvider>
    );
}
