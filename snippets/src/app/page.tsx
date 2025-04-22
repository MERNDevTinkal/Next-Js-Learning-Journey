import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function Home() {
  const snippets = await prisma.snippet.findMany();

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-4xl sm:text-5xl font-bold mb-10 text-center text-blue-700">
        📘 Code Snippets
      </h1>

      <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
        <h2 className="text-2xl font-semibold text-gray-800">
          All Snippets
        </h2>
        <Link href="/snippet/new">
          <Button className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition duration-200">
            + New Snippet
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {snippets.map((snippet) => (
          <div
            key={snippet.id}
            className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 flex flex-col justify-between hover:shadow-lg transition duration-300 ease-in-out hover:scale-[1.02]"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              {snippet.title}
            </h3>
            <div className="text-right">
              <Link href={`/snippet/${snippet.id}`}>
                <Button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition hover:cursor-pointer">
                  View
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
