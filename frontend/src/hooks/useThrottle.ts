import { useRef } from "react";

const useThrottle = (callback: (...args: any[]) => void, delay: number) => {
    const lastExecuted = useRef(0);

    return (...args: any[]) => {
        const now = Date.now();
        if (now - lastExecuted.current >= delay) {
            callback(...args);
            lastExecuted.current = now;
        }
    };
};

export default useThrottle;
