import { TravelType } from "@/enums/travelType";
import { Box, Button, Link, List, Typography } from "@mui/material";
import { ReactNode } from "react";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

type ActivityDetailsBox = {
    id: number;
    type: TravelType;
    title: string;
    children: ReactNode;
};

export function ActivityDetailsBox({
    id,
    type,
    title,
    children,
}: ActivityDetailsBox) {
    return (
        <Box
            height="100%"
            display="flex"
            flexDirection="column"
            paddingX={4}
            paddingY={3}
            sx={{
                boxShadow: 4,
                borderRadius: "4px",
            }}
        >
            <Typography
                variant="subtitle1"
                gutterBottom
                component="div"
                fontWeight="bold"
            >
                {title}
            </Typography>

            <Box marginBottom={2}>
                <List
                    sx={{
                        listStyleType: "disc",
                        listStylePosition: "inside",
                    }}
                >
                    {children}
                </List>
            </Box>

            <Box marginTop="auto">
                <Button
                    fullWidth
                    LinkComponent={Link}
                    variant="contained"
                    href={`/${type}/${id}`}
                    target="_blank"
                    endIcon={<OpenInNewIcon />}
                >
                    Go to map
                </Button>
            </Box>
        </Box>
    );
}
