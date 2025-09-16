import MainContent from "@/components/main-content";
import { Root } from "../page";

export default async function ContentPage() {
    const requiredData: Root = await fetch(
        "https://unyeleased-bankan-board-app.tiiny.site/board.json"
    ).then((res) => res.json());

    return (
        <div className="flex flex-col" id="main-content">
            <div className="w-full h-[98dvh] flex flex-col gap-3 justify-center items-center">
                <p className="font-mono text-2xl font-bold">Content</p>
                <p className="text-xl text-muted-foreground/60 font-mono text-center">
                    Just scroll down a bit bro
                </p>
            </div>
            <div className="bg-primary-foreground/50 overflow-hidden">
                <MainContent requiredData={requiredData} />
            </div>
        </div>
    );
}
