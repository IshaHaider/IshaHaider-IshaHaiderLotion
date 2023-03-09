import { Form, redirect, useLoaderData } from "react-router-dom";
import { Layout } from "../components/Layout";
import { deleteNote, getNote, updateNote } from "../notes";

////////////////////////////////////////////////////////////////////////////////
export default function EditNote() {
  const note = useLoaderData();
  return (
    <Form method="post" className="flex-grow flex flex-col" id="editNoteForm">
      <Layout note={note} isEdit></Layout>
    </Form>
  );
}

export async function loader({ params }) {
  const note = await getNote(params.noteId);
  if (!note) throw new Response("", { status: 404 });
  return note;
}

export async function action({ request }) {
  const formData = await request.formData();
  const isDeleteAction = formData.get("action") === "delete";

  console.log(
    formData.get("id"),
    formData.get("action"),
    formData.get("title"),
    formData.get("date"),
    formData.get("content")
  );

  if (isDeleteAction) {
    await deleteNote(formData.get("id"));
    return redirect(`/`);
  } else {
    const note = await updateNote({
      id: formData.get("id"),
      title: formData.get("title"),
      date: formData.get("date"),
      content: formData.get("content"),
    });
    return redirect(`/note/${note.id}`);
  }
}
