import { Fragment } from "react";
import { useLoaderData, Link, Outlet, useLocation } from "react-router-dom";
import { Card } from "../components/Card";
import { getNotes } from "../notes";

export async function loader() {
  return getNotes();
}

export default function Root() {
  const notes = useLoaderData();
  const location = useLocation();

  const onMenuClick = () => {
    document.getElementsByTagName("body")[0].classList.toggle("minimized");
  };

  return (
    <Fragment>
      <header className="flex border-t-4 border-t-red-400 border-b-[1px] border-b-gray-300">
        <button
          className="w-16 flex justify-center items-center hover:bg-red-400 hover:text-white"
          onClick={() => onMenuClick()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
            />
          </svg>
        </button>
        <div className="w-full flex justify-center">
          <Link to="/">
            <div className="flex flex-col py-2 text-center">
              <h1 className="font-bold text-4xl">Lotion</h1>
              <span className="font-semibold text-gray-500">
                Like Notion, but worse.
              </span>
            </div>
          </Link>
        </div>
      </header>

      <main className="flex-grow flex">
        <aside className="notes-sidebar w-72 min-w-[18rem] flex flex-col border-b-[1px] border-b-gray-300">
          <div className="flex justify-between px-4">
            <h2 className="font-semibold py-2 text-2xl">Notes</h2>
            <Link to={"/new"}>
              <button className="font-bold py-2 w-10 text-2xl hover:bg-red-400 hover:text-white">
                +
              </button>
            </Link>
          </div>
          <section className="border-t-gray-300 border-t-[1px]">
            {location.pathname === "/new" && (
              <Card title="Untitled" date={new Date()} content={""} isActive={true} />
            )}
            {notes.map((note) => (
              <Link key={note.id} to={`/note/${note.id}`}>
                <Card
                  title={note.title}
                  date={note.date}
                  content={note.content}
                />
              </Link>
            ))}
          </section>
        </aside>

        <section className="flex-grow border-l-gray-300 border-l-[1px] flex flex-col">
          <Outlet />
        </section>
      </main>
    </Fragment>
  );
}
