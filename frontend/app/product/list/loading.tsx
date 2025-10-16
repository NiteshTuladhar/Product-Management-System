import { CustomLoader } from "@/components/elements/custom-loader";

export default function Loading() {
  return (
    <div className="p-4">
      <CustomLoader text="Loading data, please wait..." />
    </div>
  );
}
