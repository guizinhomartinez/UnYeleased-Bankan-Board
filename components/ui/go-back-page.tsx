'use client'

import { ArrowLeft } from "lucide-react";
import { Button } from "./button";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function GoBackPage() {
    const pathName = usePathname();
    const [mouseOver, setMouseOver] = useState(false);

    if (pathName === "/") {
        return <div></div>;
    }

    return (
        <div className={cn("flex items-center gap-1.5 justify-end p-2 fixed top-1 left-1 bg-primary-foreground/80 transition-[width,opacity] max-w-96 duration-300 rounded-full z-50 backdrop-blur-sm opacity-30 hover:opacity-100")}>
            <Link href='/' className="rounded-full group" onMouseOver={() => setMouseOver(true)} onMouseOut={() => setMouseOver(false)}>
                <Button variant='secondary' size='icon' className="rounded-full border size-10 hover:w-28 justify-start px-3 duration-300">
                    <ArrowLeft />
                    <span className="opacity-0 group-hover:opacity-100 duration-300">Go back</span>
                </Button>
            </Link>
        </div>
    )
}