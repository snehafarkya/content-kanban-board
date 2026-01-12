import { useDraggable } from "@dnd-kit/core";
import { useState, useMemo } from "react";
import EditContentModal from "./EditContentModal";
import DeleteConfirmModal from "./DeleteConfirmModal";
import { FaCalendar, FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export default function ContentCard({ task, setTasks }) {
  const [editing, setEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const {
    id,
    title,
    notes,
    type,
    platform,
    status,
    deadline,
    link,
  } = task;

  const { setNodeRef, attributes, listeners, transform } = useDraggable({
    id,
  });

  const style = useMemo(
    () => ({
      transform: transform
        ? `translate(${transform.x}px, ${transform.y}px)`
        : undefined,
    }),
    [transform]
  );

  const typeBadgeClass = useMemo(() => {
    switch (type) {
      case "Blog":
        return "bg-yellow-100 text-yellow-600";
      case "Video":
        return "bg-red-100 text-red-600";
      default:
        return "bg-blue-100 text-blue-600";
    }
  }, [type]);

  const handleEdit = (e) => {
    e.stopPropagation();
    setEditing(true);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    setShowDeleteModal(false);
  };

  const handleSave = (updatedTask) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? updatedTask : t))
    );
  };

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        className="relative mb-4 rounded-xl border bg-white p-4 transition"
      >
        {/* Action Buttons */}
        <div className="absolute top-4 right-2 flex gap-2 z-10">
          <button
            onClick={handleEdit}
            className="text-zinc-400 hover:text-blue-400 text-sm"
            title="Edit"
          >
            <FaEdit />
          </button>

          <button
            onClick={handleDelete}
            className="text-zinc-400 hover:text-red-400 text-sm"
            title="Delete"
          >
            <MdDelete />
          </button>
        </div>

        {/* Drag Handle + Content */}
        <div {...listeners} {...attributes} className="cursor-grab">
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex w-[80%] flex-col gap-2 break-words whitespace-normal"
          >
            <h3 className="font-semibold capitalize break-words">
              {title}
            </h3>

            {notes && (
              <p className="text-zinc-500">{notes}</p>
            )}

            <div className="flex items-center justify-between">
              <p className="flex items-center gap-2 text-xs text-zinc-500">
                <span
                  className={`rounded-lg px-2 py-0.5 text-xs font-medium ${typeBadgeClass}`}
                >
                  {type}
                </span>
                {platform}
              </p>

              {status !== "idea" && deadline && (
                <span className="absolute right-2 flex items-center gap-1 text-xs text-zinc-500">
                  <FaCalendar /> {deadline}
                </span>
              )}
            </div>

            {status === "review" && (
              <p className="mt-2 text-xs text-yellow-400">
                Needs final polish ✨
              </p>
            )}

            {status === "published" && (
              <p className="mt-2 text-xs text-green-400">
                Published 🎉
              </p>
            )}
          </a>
        </div>
      </div>

      {/* Modals */}
      <EditContentModal
        task={task}
        isOpen={editing}
        onClose={() => setEditing(false)}
        onSave={handleSave}
      />

      <DeleteConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete this content?"
        description="This content card will be permanently removed."
      />
    </>
  );
}
