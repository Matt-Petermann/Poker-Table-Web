import { Button } from "@nextui-org/react";
import { FaArrowLeft } from "react-icons/fa6";

export default () => {
    return (
        <main>        
            <Button
                    as="a"
                    color="success"
                    className="fixed top-2 right-2 z-10"
                    startContent={<FaArrowLeft />}
                    href="/"
                >
                    Return to Table
                </Button>
        </main>
    );
}
