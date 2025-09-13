'use client'

import { ArrowDown } from "lucide-react";
import { Button } from "./ui/button";

export default function scrollButton(props: { targetId: string }) {
    const handleClick = () => {
        const element = document.getElementById(props.targetId);
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    return (
        <Button className="rounded-full absolute left-1/2 -translate-x-1/2 bottom-4 size-12" variant='secondary' onClick={handleClick}><ArrowDown /></Button>
    );
}