"use client";

import React from "react";
import { FaLink, FaLinkSlash } from "react-icons/fa6";
import { useTableContext } from "@/contexts/tableContext";

export const DisplayIndicator = React.memo(() => {
    const { connectionStatus } = useTableContext();

    switch(connectionStatus) {
        case "error":
            return <FaLinkSlash className="text-red-500 text-2xl" />
        case "success":
            return <FaLink className="text-green-500 text-2xl" />
        default:
            return <></>
    }
});