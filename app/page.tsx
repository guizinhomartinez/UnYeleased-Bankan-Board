import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export interface Root {
  tasks: RootTasks[];
}

export interface RootTasks {
  title: string;
  type: 'backlog' | 'todo' | 'in progress' | 'cancelled' | 'done';
  priority: 'none' | 'low' | 'medium' | 'high';
  tag: 'improvement' | 'bug' | 'content' | 'other';
}

export default async function Page() {

  return (
    <div className="w-screen h-dvh p-5 flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-3 duration-700 items-center justify-center relative">
      <p className="tracking-tight font-bold text-3xl font-mono text-center">UnYeleased's progress</p>
      <p className="text-xl text-muted-foreground/60 font-mono text-center">Check the progress of UnYeleased</p>
      <Link
        href="/content"
        rel="noopener noreferrer"
        className="rounded-2xl"
      >
        <Button className="rounded-2xl px-4 mt-4 py-6 group active:translate-y-1">
          <p className="translate-x-1">
            Go to content page
          </p>
          <ArrowRight className="transition-[width,height] duration-300 size-0 group-hover:size-4" />
        </Button>
      </Link>
    </div>
  )
}