import { prisma } from "@/lib/prisma";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const SnippetDetailPage = async ({ params }: { params: { id: string } }) => {
  const id = parseInt(params.id);

  const snippet = await prisma.snippet.findUnique({
    where: {
      id,
    },
  });

  if (!snippet) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center text-red-600 font-semibold text-xl">
        Snippet Not Found 
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-blue-700 mb-6">
          {snippet.title}
        </h1>

        <div className="flex flex-col sm:flex-row gap-4 justify-end mt-8">
        <Link href={`/snippet/${snippet.id}/edit`}>

          <Button className="bg-yellow-500 hover:cursor-pointer text-white px-6 py-2 rounded hover:bg-yellow-600 transition w-full sm:w-auto">
            Edit
          </Button>
          </Link>
          <Button className="bg-red-500 hover:cursor-pointer text-white px-6 py-2 rounded hover:bg-red-600 transition w-full sm:w-auto">
            Delete
          </Button>
        </div>
      </div>

      <div className="mt-10 bg-gray-900 text-white rounded-lg p-6 overflow-x-auto">
        <pre className="whitespace-pre-wrap text-sm font-mono">
          <code>{snippet.code}</code>
        </pre>
      </div>
    </div>
  );
};

export default SnippetDetailPage;
