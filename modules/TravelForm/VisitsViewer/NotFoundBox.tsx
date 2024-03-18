import { Box } from "@mui/material";
import { ReactNode } from "react";

type NotFoundBoxProps = {
    children: ReactNode;
};

export function NotFoundBox({ children }: NotFoundBoxProps) {
    return (
        <Box
            height="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
            paddingX={4}
            paddingY={3}
            sx={{
                boxShadow: 4,
                borderRadius: "4px",
            }}
        >
            {children}
        </Box>
    );
}
