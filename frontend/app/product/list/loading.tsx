import { CustomLoader } from "@/components/elements/custom-loader";

export default function Loading({
  text = "Loading data, please wait...",
}: {
  text: string;
}) {
  return (
    <div className="p-4">
      <CustomLoader text={text} />
    </div>
  );
}
