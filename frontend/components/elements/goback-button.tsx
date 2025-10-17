import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

export function GoBackButton() {
  const router = useRouter();

  return (
    <Button
      variant="ghost"
      onClick={() => router.back()}
      className="flex items-center gap-2 hover:bg-accent p-1"
    >
      <ArrowLeft className="h-4 w-4" />
      Go Back
    </Button>
  );
}
