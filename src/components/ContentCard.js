import { useDraggable } from "@dnd-kit/core";
import { useState } from "react";
import EditContentModal from "./EditContentModal";
import DeleteConfirmModal from "./DeleteConfirmModal";
import { FaCalendar, FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export default function ContentCard({ task, setTasks }) {
  const [editing, setEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { setNodeRef, attributes, listeners, transform } = useDraggable({
    id: task.id,
  });

  const handleDeleteConfirm = () => {
    setTasks((prev) => prev.filter((t) => t.id !== task.id));
    setShowDeleteModal(false);
  };

  const handleSave = (updatedTask) => {
    setTasks((prev) => prev.map((t) => (t.id === task.id ? updatedTask : t)));
  };

  return (
    <>
      <div
        ref={setNodeRef}
        style={{
          transform: transform
            ? `translate(${transform.x}px, ${transform.y}px)`
            : undefined,
        }}
        className="rounded-xl p-4 mb-4 border bg-white transition relative"
      >
        {/* Delete Button */}

        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowDeleteModal(true);
          }}
          className="absolute top-4 right-2 text-zinc-400 hover:text-red-400 text-sm z-10"
          title="Delete"
        >
          <MdDelete />
        </button>

        {/* Edit Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setEditing(true);
          }}
          className="absolute top-4 right-6 text-zinc-400 hover:text-blue-400 text-sm"
          title="Edit"
        >
          <FaEdit />
        </button>

        {/* Drag Handle */}
        <div {...listeners} {...attributes} className="cursor-grab">
          <a
            href={task.link}
            target="_blank"
            rel="noopener noreferrer"
            className=" flex flex-col gap-2"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-semibold capitalize">{task.title}</h3>

            {task.notes && (
              <p className=" text-zinc-500 ">{task.notes}</p>
            )}
            <div className="flex justify-between items-center">
            <p className="text-xs flex gap-2 items-center text-zinc-500 mt-1">
              <span
                className={`px-2 py-0.5 rounded-lg font-medium text-xs ${
                  task.type === "Blog"
                    ? "bg-yellow-100 text-yellow-600"
                    : task.type === "Video"
                    ? "bg-red-100 text-red-600"
                    : "bg-blue-100 text-blue-600"
                }`}
              >
                {task.type}
              </span>
              {task.platform}
              
            </p>
            {task.status !== "idea" && task.deadline && (
              <span className="text-xs text-zinc-500 flex gap-1 items-center "> <FaCalendar/> {task.deadline}</span>
            )}
            </div>

            {task.status === "review" && (
              <p className="text-xs text-yellow-400 mt-2">
                Needs final polish ✨
              </p>
            )}

            {task.status === "published" && (
              <p className="text-xs text-green-400 mt-2">Published 🎉</p>
            )}
          </a>
        </div>
      </div>

      {/* Edit Modal */}
      <EditContentModal
        task={task}
        isOpen={editing}
        onClose={() => setEditing(false)}
        onSave={handleSave}
      />

      {/* Delete Modal */}
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
