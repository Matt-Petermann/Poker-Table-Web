"use client";

import React from "react";
import { FaLink, FaLinkSlash } from "react-icons/fa6";
import { useTableContext } from "@/contexts/tableContext";

interface DisplayIndicator {
    className: string;
}

export const DisplayIndicator = React.memo<DisplayIndicator>(({ className }) => {
    const { connectionStatus } = useTableContext();

    switch(connectionStatus) {
        case "loading":
            return <p className={className}>...</p>
        case "error":
            return <FaLinkSlash className={`${className} text-red-500 text-2xl`} />
        case "success":
            return <FaLink className={`${className} text-green-500 text-2xl`} />
        default:
            return <></>
    }
});