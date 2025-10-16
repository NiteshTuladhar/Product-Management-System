import { CustomLoader } from "@/components/ui/tabel-skeleton";

export default function Loading() {
  return (
    <div className="p-4">
      <CustomLoader text="Loading data, please wait..." />
    </div>
  );
}
