import { notFound, redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { getPostById } from "@/lib/posts";
import EditForm from "./edit-form";


export const instant = false;

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const { id } = await params;
  const post = await getPostById(id);
  if (!post) notFound();

  return (
    <EditForm
      post={{
        id: post.id,
        title: post.title,
        body: post.body,
        kind: post.kind,
        image: post.image,
        published: post.published,
      }}
    />
  );
}