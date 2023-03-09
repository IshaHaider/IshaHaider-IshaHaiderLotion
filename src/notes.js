import { v4 as uuidv4 } from "uuid";

export async function getNotes() {
  let notes = JSON.parse(localStorage.getItem("notes"));
  if (!notes) notes = [];
  return notes;
}

export async function createNote({ title, content, date }) {
  let id = uuidv4();
  let note = { id, title, content, date };
  let notes = await getNotes();
  notes.unshift(note);
  await set(notes);
  return note;
}

export async function updateNote({ id, title, content, date }) {
  const note = await getNote(id);
  let notes = await getNotes();
  let index = notes.findIndex((note) => note.id === id);
  const updatedNote = { ...note, title, content, date };
  notes[index] = updatedNote;
  await set(notes);
  return updatedNote;
}

export async function getNote(id) {
  let notes = JSON.parse(localStorage.getItem("notes"));
  let note = notes.find((note) => note.id === id);
  return note ?? null;
}

export async function deleteNote(id) {
  let notes = JSON.parse(localStorage.getItem("notes"));
  let index = notes.findIndex((note) => note.id === id);
  if (index > -1) {
    notes.splice(index, 1);
    await set(notes);
    return true;
  }
  return false;
}

function set(notes) {
  localStorage.setItem("notes", JSON.stringify(notes));
}
