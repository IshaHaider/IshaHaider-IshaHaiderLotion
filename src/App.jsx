import "./App.css";
import "react-quill/dist/quill.snow.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// pages
import Root, { loader as rootLoader } from "./routes/root";
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

let router = createBrowserRouter([ //router: array of route objects.
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
        path: "note/:noteId", //URL pattern for the route
        element: <Notes />, //React component to be rendered when that URL is visited
        loader: noteLoader, //load data for the component (server)
        action: noteAction, //update the state of the component (client)
        errorElement: <h2>Note not found</h2>, //render if an error occurs
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
 
// <RouterProvider> component: from the react-router-dom library - provides the routing functionality for the application. 
// is passed a router object that is created using the createBrowserRouter function from the same library.

function App() {
  return (
    <div className="App flex flex-col min-h-screen">
      <RouterProvider router={router} /> 
    </div>
  );
}

export default App;
