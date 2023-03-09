import { Form, redirect } from "react-router-dom";
import { Layout } from "../components/Layout";
import { createNote } from "../notes";

export default function NewNote() {
  return (
    <Form method="post" className="flex-grow flex flex-col">
      <Layout></Layout>
    </Form>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const note = await createNote({
    title: formData.get("title"),
    date: formData.get("date"),
    content: formData.get("content"),
  });
  return redirect(`/`);
}
