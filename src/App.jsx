import "./App.css";
import "react-quill/dist/quill.snow.css";
import Root, { loader as rootLoader } from "./routes/root";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NewNote, { action as newNoteAction } from "./routes/new";
import Notes, {
  loader as noteLoader,
  action as noteAction,
} from "./routes/note";
import NoteEdit, {
  loader as noteEditLoader,
  action as noteEditAction,
} from "./routes/edit";
import IndexPage from "./routes";

let router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    loader: rootLoader,
    children: [
      {
        path: "/",
        element: <IndexPage />,
      },
      {
        path: "new",
        element: <NewNote />,
        action: newNoteAction,
      },
      {
        path: "note/:noteId",
        element: <Notes />,
        loader: noteLoader,
        action: noteAction,
        errorElement: <h2>Note not found</h2>,
      },
      {
        path: "note/:noteId/edit",
        element: <NoteEdit />,
        loader: noteEditLoader,
        action: noteEditAction,
        errorElement: <h2>Note not found</h2>,
      },
    ],
  },
]);

function App() {
  return (
    <div className="App flex flex-col min-h-screen">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
