import React from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { redirect } from "next/navigation"
import { prisma } from '@/lib/prisma'; 


const CreateSnippetPage = () => {

  async function CreateSnippet (formData : FormData){
    "use server" // this function will be executed on the server
    const title = formData.get("title") as string;
    const code = formData.get("code") as string;

  const snippet = await prisma.snippet.create({
      data : {
        title,
        code,
      }
    })
    console.log("created snippet",snippet);

    redirect("/");
  }

  return (
    <form action={CreateSnippet} className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      <div className="flex flex-col space-y-2">
        <Label htmlFor="title" className="text-sm font-medium">Title</Label>
        <Input
          type="text"
          name="title"
          id="title"
          placeholder="Enter snippet title"
          className="w-full"
        />
      </div>

      <div className="flex flex-col space-y-2">
        <Label htmlFor="textarea" className="text-sm font-medium">Code</Label>
        <Textarea
          name="code"
          id="code"
          placeholder="code here..."
          className="w-full min-h-[150px]"
        />
      </div>

      <Button
        type="submit"
        className="w-full sm:w-auto bg-blue-500 text-white px-6 py-2 rounded hover:cursor-pointer hover:bg-blue-600 transition"
      >
        Create Snippet
      </Button>
    </form>
  )
}

export default CreateSnippetPage
