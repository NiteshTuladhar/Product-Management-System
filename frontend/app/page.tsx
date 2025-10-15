import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="flex flex-col items-center justify-center space-y-14">
          <h1 className="font-bold text-2xl">Product Management System</h1>
          <div className="flex items-center gap-6 justify-center">
            <Link href={`/product/create/`}>
              <Button>Add a Product</Button>
            </Link>
            <Link href={`/product/list/`}>
              <Button>View Products</Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
