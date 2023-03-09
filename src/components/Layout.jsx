import { Fragment, useState } from "react";
import ReactQuill from "react-quill";
import { Form, Link, useSubmit } from "react-router-dom";
import { formatDate } from "../utils";

export function Layout({ note, isEdit }) {
  const isNewNote = !note && !isEdit;
  const isViewNote = note && !isEdit;
  const showSaveButton = isNewNote || isEdit;
  const showForm = isNewNote || isEdit;
  let submit = useSubmit();

  const [value, setValue] = useState(note ? note.content : "");

  const formatDate2 = (today) => {
    //example initial format: Wed Mar 08 2023 21:09:39 GMT-0700 (Mountain Standard Time)
    var minutes = today.getMinutes();
    var hours = today.getHours();

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;

    var seconds = today.getSeconds();
    seconds = seconds < 10 ? "0" + seconds : seconds;

    var month = today.getMonth() + 1;
    month = month < 10 ? "0" + month : month;

    var day = today.getDate();
    day = day < 10 ? "0" + day : day;

    var dateTime =
      today.getFullYear() +
      "-" +
      month +
      "-" +
      day +
      "T" +
      hours +
      ":" +
      minutes;
    return dateTime; //example final format: yyyy-MM-ddThh:mm
  };

  const handleSubmit = (e) => {
    const answer = window.confirm("Are you sure?");
    if (!answer) {
      e.preventDefault();
    }
  };

  const handleEditDelete = (e) => {
    const answer = window.confirm("Are you sure?");
    if (answer) {
      const actionInput = document.getElementById("hiddenActionInput");
      actionInput.value = "delete";
      const form = document.getElementById("editNoteForm");
      submit(form);
    } else {
      e.preventDefault();
    }
  };

  return (
    <Fragment>
      <section className="pl-4 flex justify-between border-b-gray-300 border-b-[1px]">
        <div className="py-2">
        {showSaveButton ? (
            <h3 className="text-lg tracking-wider">
            {showForm ? (
              <input
                name="title"
                type="text"
                placeholder="Untitled"
                className="outline-none"
                defaultValue={note ? note.title : ""}
              ></input>
            ) : (
              note.title
            )}
          </h3>
          ) : (
            <h3 className="font-bold text-lg tracking-wider">
            {showForm ? (
              <input
                name="title"
                type="text"
                placeholder="Untitled"
                className="outline-none"
                defaultValue={note ? note.title : ""}
              ></input>
            ) : (
              note.title
            )}
          </h3>
          )}
          
          <span className="text-sm text-gray-500">
            {showForm ? (
              <input
                name="date"
                type="datetime-local"
                defaultValue={
                  note
                    ? `${formatDate2(new Date(note.date))}`
                    : `${formatDate2(new Date())}`
                }
              />
            ) : (
              formatDate(note.date)
            )}
          </span>
        </div>
        <div className="flex">
          {showSaveButton ? (
            <button
              className="w-16 h-full flex justify-center items-center hover:bg-red-400 hover:text-white"
              type="submit"
            >
              Save
            </button>
          ) : (
            <Link to={`/note/${note.id}/edit`}>
              <button className="w-16 h-full flex justify-center items-center hover:bg-red-400 hover:text-white">
                Edit
              </button>
            </Link>
          )}

          {isNewNote && (
            <Link to="/">
              <button className="w-16 h-full flex justify-center items-center hover:bg-red-400 hover:text-white">
                Delete
              </button>
            </Link>
          )}
          {isViewNote && (
            <Form method="post" className="flex" onSubmit={handleSubmit}>
              <button className="w-16 h-full flex justify-center items-center hover:bg-red-400 hover:text-white">
                Delete
              </button>
            </Form>
          )}
          {isEdit && (
            <Fragment>
              <input
                name="action"
                className="hidden"
                id="hiddenActionInput"
              ></input>
              <button
                className="w-16 h-full flex justify-center items-center hover:bg-red-400 hover:text-white"
                onClick={handleEditDelete}
              >
                Delete
              </button>
            </Fragment>
          )}
        </div>
      </section>

      {isEdit && (
        <input
          name="id"
          className="hidden"
          defaultValue={note ? note.id : ""}
        ></input>
      )}

      <div className="flex-grow">
        {showForm ? (
          <Fragment>
            <textarea
              name="content"
              className="hidden"
              id="hiddenContent"
              readOnly
              value={value}
            ></textarea>
            <ReactQuill
              theme="snow"
              placeholder="Your Note Here"
              value={value}
              onChange={setValue}
              className="h-full"
            />
          </Fragment>
        ) : (
          <div
            className="p-4 note-content"
            dangerouslySetInnerHTML={{ __html: note.content }}
          ></div>
        )}
      </div>
    </Fragment>
  );
}
