import { useLoaderData, redirect } from "react-router-dom";
import { Layout } from "../components/Layout";
import { deleteNote, getNote } from "../notes";

export default function Note() {
  const note = useLoaderData();
  return <Layout note={note}></Layout>;
}

export async function loader({ params }) {
  const note = await getNote(params.noteId);
  if (!note) throw new Response("", { status: 404 });
  return note;
}

export async function action({ params }) {
  await deleteNote(params.noteId);
  return redirect("/");
}
