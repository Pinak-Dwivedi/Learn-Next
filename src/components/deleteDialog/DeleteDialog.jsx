"use client";
import { useEffect } from "react";

export default function DeleteDialog(props) {
  const { message, showDeleteDialog, setShowDeleteDialog, handleDelete } =
    props;

  useEffect(() => {
    if (showDeleteDialog) {
      const timeoutId = setTimeout(() => {
        setShowDeleteDialog(false);
      }, 5000);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [showDeleteDialog]);

  return (
    <div
      className={`absolute inset-0 flex flex-col justify-between rounded-md bg-inherit p-4 ${
        showDeleteDialog
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-0"
      }`}
    >
      <h3 className="self-center text-lg font-medium">{message}</h3>

      <div className="flex flex-wrap justify-around gap-4">
        <button
          className="rounded-md bg-red-600 px-4 py-1 text-slate-100 hover:bg-red-500"
          onClick={handleDelete}
        >
          Yes
        </button>

        <button
          className="rounded-md bg-blue-700 px-4 py-1 text-slate-100 hover:bg-blue-600"
          onClick={() => setShowDeleteDialog(false)}
        >
          No
        </button>
      </div>
    </div>
  );
}
