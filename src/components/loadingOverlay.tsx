import { memo } from "react";
import { Spinner } from "@nextui-org/react";
import { useTableContext } from "@/contexts/tableContext";

export const LoadingOverlay = memo(() => {
    const { isLoading } = useTableContext();

    return (
        <div
            className="absolute w-screen h-screen bg-black/25 backdrop-blur-sm z-50"
            hidden={!isLoading}
        >
            <Spinner
                color="secondary"
                size="lg"
                className="left-1/2 top-1/2 -translate-x-20 -translate-y-32"
                classNames={{
                    circle1: "w-40 h-40 border-8",
                    circle2: "w-40 h-40 border-8"
                }}
            />
        </div>
    )
});