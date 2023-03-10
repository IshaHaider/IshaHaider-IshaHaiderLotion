import { v4 as uuidv4 } from "uuid";

export async function getNotes() {
  let notes = JSON.parse(localStorage.getItem("notes"));
  if (!notes) notes = [];
  return notes; //returns array of notes
}

export async function createNote({ title, content, date }) {
  let id = uuidv4();
  let note = { id, title, content, date };
  let notes = await getNotes(); 
  notes.unshift(note); //unshift adds new note to beginning of array
  await set(notes); // sets local storage to new notes array
  return note; //returns new note 
}

export async function updateNote({ id, title, content, date }) {
  const note = await getNote(id); //finds note with the specified id
  let notes = await getNotes(); //retrieves array of notes
  let index = notes.findIndex((note) => note.id === id); //finds index of note from specified id 
  const updatedNote = { ...note, title, content, date };
  notes[index] = updatedNote; //updates notes array with the updated note at specified index
  await set(notes); // sets local storage to new notes array
  return updatedNote; //returns updated note object 
}

export async function getNote(id) {
  let notes = JSON.parse(localStorage.getItem("notes"));
  let note = notes.find((note) => note.id === id); //returns note object with the specified id 
  return note ?? null; //returns note object or null - if it doesn't exist with that id
}

export async function deleteNote(id) {
  let notes = JSON.parse(localStorage.getItem("notes"));
  let index = notes.findIndex((note) => note.id === id);
  if (index > -1) { 
    notes.splice(index, 1);  //start modifying array at index, and remove 1 element
    await set(notes); // sets local storage to new notes array
    return true; //if note deleted = true
  }
  return false; //if no note deleted = false
}

function set(notes) { // sets local storage to new notes array
  localStorage.setItem("notes", JSON.stringify(notes)); //stringify converts object to string
} 
