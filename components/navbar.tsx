import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { ModeToggle } from "./ui/change-theme";
import Link from "next/link";
import GoBackPage from "./ui/go-back-page";

export default function Navbar() {
    return (
        <>
            <GoBackPage />
            <div className="flex items-center gap-1.5 justify-end p-2 fixed top-1 right-1 bg-primary-foreground/80 transition-[width,opacity] max-w-96 duration-300 rounded-full z-50 backdrop-blur-sm opacity-30 hover:opacity-100">
                <Link
                    href="https://unyeleased.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-transparent hover:border-border group"
                >
                    <Button variant="ghost" className="rounded-full">
                        <p className="tracking-tight font-bold translate-x-1">
                            UnYeleased
                        </p>
                        <ArrowRight className="transition-[width,height] duration-300 size-0 group-hover:size-4" />
                    </Button>
                </Link>
                <ModeToggle />
            </div>
        </>
    );
}
