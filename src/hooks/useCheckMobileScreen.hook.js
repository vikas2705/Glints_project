import { useEffect, useState } from "react";

const useCheckMobileScreen = () => {
    const [width, setWidth] = useState(window.screen.width);
    const handleWindowSizeChange = () => {
        setWidth(window.screen.width);
    };

    useEffect(() => {
        // bind the event listener on resize window
        window.addEventListener("resize", handleWindowSizeChange);
        return () => {
            window.removeEventListener("resize", handleWindowSizeChange);
        };
    }, []);

    return width <= 768;
};

export default useCheckMobileScreen;
