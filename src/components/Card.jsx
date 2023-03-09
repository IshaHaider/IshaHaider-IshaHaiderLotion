import clsx from "clsx";
import { formatDate } from "../utils";

export function Card({ title, date, content, isActive }) {
  return (
    <div
        className={clsx(
        "px-4 py-2 hover:bg-red-400 hover:text-white flex flex-col",
        isActive && "bg-red-400 text-white"
      )}
    >
      <h3 className="font-bold text-lg tracking-wider">{title}</h3>
      <span className="text-sm text-gray-500 ">{formatDate(date)}</span>
      <p
        className="mt-2 text-sm text-ellipsis line-clamp-2"
        dangerouslySetInnerHTML={{ __html: content }}
      ></p>
    </div>
  );
}
