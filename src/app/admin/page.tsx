"use client";

import { useEffect } from "react";

export default () => {
    useEffect(() => {
        const eventSource = new EventSource("http://192.168.1.53:8000/dealer");
        eventSource.onmessage = e => {
            console.log(e.data)
        };
        eventSource.onerror = () => {
            console.log("connection closed")
        }
        eventSource.onopen = () => {
            console.log("connection opened")
        }

        return () => {
            eventSource.close();
        };
    }, []);

    return <main></main>;
}
