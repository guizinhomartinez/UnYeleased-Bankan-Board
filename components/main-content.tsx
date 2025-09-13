'use client';

import { Root, RootTasks } from "@/app/page";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { AlertCircle, Circle, CircleCheck, CircleCheckBig, CircleDashed, CircleX, Hourglass, LucideIcon, LucideProps, SignalHigh, SignalLow, StarHalf, WifiHigh, WifiLow, WifiZero, X } from "lucide-react";
import Navbar from "./navbar";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { capitalizeFirstLetter } from "@/lib/capitalize-first-letter";
import { Badge } from "./ui/badge";
import { useIsMobile } from "@/hooks/use-mobile";

type Mask = {
    top: boolean;
    bottom: boolean;
    left: boolean;
    right: boolean;
};

export default function MainContent(props: { requiredData: Root }) {
    const [showMask, setShowMask] = useState<Mask>({ top: false, bottom: false, left: false, right: false });
    const viewportRef = useRef<HTMLDivElement>(null);
    const isMobile = useIsMobile();

    const checkScrollability = useCallback(() => {
        const element = viewportRef.current;
        if (!element) return;

        const { scrollTop, scrollLeft, scrollWidth, clientWidth, scrollHeight, clientHeight } = element;
        setShowMask((prev) => ({
            ...prev,
            top: scrollTop > 0,
            bottom: scrollTop + clientHeight < scrollHeight - 1,
            left: scrollLeft > 0,
            right: scrollLeft + clientWidth < scrollWidth - 1,
        }));
    }, []);

    useEffect(() => {
        if (typeof window === "undefined") return;

        const element = viewportRef.current;
        if (!element) return;

        const controller = new AbortController();
        const { signal } = controller;

        const resizeObserver = new ResizeObserver(checkScrollability);
        resizeObserver.observe(element);

        element.addEventListener("scroll", checkScrollability, { signal });
        window.addEventListener("resize", checkScrollability, { signal });

        // Run an initial check whenever dependencies change (including pointer mode)
        checkScrollability();

        return () => {
            controller.abort();
            resizeObserver.disconnect();
        };
    }, [checkScrollability]);

    return (
        <div className="h-screen w-screen flex flex-col">
            <ScrollArea  className="overflow-auto relative h-full" ref={viewportRef}>
                <div className="m-3 flex flex-col md:flex-row gap-4 md:gap-2.5 max-w-full md:max-w-max md:w-max">
                    <CardComponent Icon={CircleDashed} title="Backlog" filterType="backlog" requiredData={props.requiredData} />
                    <CardComponent Icon={Circle} title="To-do" filterType="todo" requiredData={props.requiredData} />
                    <CardComponent Icon={Hourglass} title="In Progress" filterType="in progress" requiredData={props.requiredData} />
                    <CardComponent Icon={CircleCheckBig} title="Completed" filterType="done" requiredData={props.requiredData} />
                    <CardComponent Icon={CircleX} title="Cancelled" filterType="cancelled" requiredData={props.requiredData} />
                </div>
                <ScrollBar orientation={!isMobile ? 'horizontal' : 'vertical'} />
            </ScrollArea>
        </div>
    )
}

export function CardComponent(props: { Icon: LucideIcon, title: string, filterType: RootTasks['type'], requiredData: Root }) {
    let color: string = '';

    function CorrectIcon({ element }: { element: RootTasks }) {
        if (element.priority === 'none') return <CircleDashed />;
        if (element.priority === 'low') return <SignalLow />;
        if (element.priority === 'medium') return <SignalHigh />;
        if (element.priority === 'high') return <AlertCircle />;
        return <AlertCircle />;
    }

    if (props.title === 'Backlog') color = 'text-muted-foreground/80';
    if (props.title === 'To-do') color = 'text-yellow-600 dark:text-yellow-400';
    if (props.title === 'In Progress') color = 'text-purple-600 dark:text-purple-400';
    if (props.title === 'Completed') color = 'text-green-600 dark:text-green-400';
    if (props.title === "Cancelled") color = 'text-red-600 dark:text-red-400';

    return (
        <Card className="p-0 h-full overflow-hidden gap-0">
            <CardHeader className="bg-secondary p-4">
                <CardTitle className={cn("flex gap-2 items-center", color)}><props.Icon /> {props.title}</CardTitle>
            </CardHeader>
            <CardContent className="p-0 md:min-w-md md:max-w-md h-full overflow-hidden gap-0">
                <div className="overflow-auto">
                    {props.requiredData.tasks
                        .sort((a, b) => {
                            const priorityOrder = {
                                high: 3,
                                medium: 2,
                                low: 1,
                                none: 0
                            };
                            return priorityOrder[b.priority] - priorityOrder[a.priority];
                        })
                        .filter(e => e.type === props.filterType).map((element, index) => (
                            <div key={index} className={cn("p-4 py-2 flex-col gap-2 border rounded-lg bg-secondary m-3", props.title === "Cancelled" && "opacity-50")}>
                                <p className={cn("font-bold text-lg", props.title === "Cancelled" && "line-through")}>{element.title}</p>
                                <div className="flex gap-1 items-center mt-2">
                                    <Badge
                                        variant='outline'
                                        className={cn(
                                            "rounded-full px-3 py-1.5",
                                            'bg-muted text-muted-foreground',
                                            element.tag === 'content' && 'bg-blue-500 text-white dark:bg-blue-600',
                                            element.tag === 'bug' && 'bg-yellow-500 text-white dark:bg-yellow-600',
                                            element.tag === 'improvement' && 'bg-indigo-500 text-white dark:bg-indigo-600'
                                        )}
                                    >
                                        {capitalizeFirstLetter(element.tag)}
                                    </Badge>
                                    <Badge className="bg-primary-foreground/50 rounded-full p-1 border-border">
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger>
                                                    <p
                                                        className={cn(
                                                            "text-foreground",
                                                            "text-muted-foreground/50",
                                                            element.priority === "medium" && "text-yellow-500 dark:text-yellow-400 translate-x-0.5 -translate-y-0.5",
                                                            element.priority === "high" && "text-red-600 dark:text-red-400",
                                                            element.priority === "low" && "text-green-600 dark:text-green-400 translate-x-0.5 -translate-y-0.5",
                                                            element.priority === "none" && "text-muted-foreground/50"
                                                        )}>
                                                        {<CorrectIcon element={element} />}
                                                    </p>
                                                </TooltipTrigger>
                                                <TooltipContent align="center" className="-translate-y-1">
                                                    <p>{capitalizeFirstLetter(element.priority)}</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </Badge>
                                </div>
                            </div>
                        ))}
                </div>
            </CardContent>
        </Card>
    )
}