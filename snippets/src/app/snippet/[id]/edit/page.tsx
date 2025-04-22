import EditSnippetsForm from '@/components/EditSnippetsForm';
import { prisma } from '@/lib/prisma';
import React from 'react';


const EditSnippetPage = async ({ params }: { params: { id: string } }) => {
  const id = parseInt(params.id);

  const snippet = await prisma.snippet.findUnique({
    where: {
      id,
    },
  });

  if (!snippet) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 text-center text-red-600 font-semibold text-xl">
        Snippet Not Found 
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-700">
         Edit Snippet
      </h1>
      <EditSnippetsForm snippet={snippet} />
    </div>
  );
};

export default EditSnippetPage;
