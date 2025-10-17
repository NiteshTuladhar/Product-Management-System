import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface LoaderProps {
  text?: string;
  className?: string;
}

export function CustomLoader({ text = "Loading...", className }: LoaderProps) {
  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center bg-background/40 backdrop-blur-sm", // Changed from bg-background/80 to bg-background/40
        className
      )}
    >
      <div className="flex flex-col items-center gap-4 rounded-lg bg-background p-6 shadow-lg border">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground">{text}</p>
      </div>
    </div>
  );
}
