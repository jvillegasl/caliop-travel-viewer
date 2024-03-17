"use client";

import { useTravelForm } from "@/hooks/useTravelForm";
import { Button } from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import Link from "next/link";

export function MapButton() {
    const { travelItem } = useTravelForm();

    if (!travelItem) return;

    return (
        <Button
            LinkComponent={Link}
            variant="contained"
            href={`/${travelItem.type}/${travelItem.id}`}
            target="_blank"
            endIcon={<OpenInNewIcon />}
        >
            Go to map
        </Button>
    );
}
