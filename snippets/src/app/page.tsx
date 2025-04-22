import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-4">Home</h1>

      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Snippets</h2>

        <Link href="/snippet/new">
          <Button className="bg-blue-500 text-white px-4 py-2 rounded hover:cursor-pointer ">
            New
          </Button>
        </Link>
      </div>
    </div>
  );
}
