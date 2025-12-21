import { useDraggable } from "@dnd-kit/core";
import { useState } from "react";
import EditContentModal from "./EditContentModal";
import DeleteConfirmModal from "./DeleteConfirmModal";

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
        className="bg-zinc-800 rounded-lg p-4 mb-4 hover:bg-zinc-700 transition relative"
      >
        {/* Delete Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowDeleteModal(true);
          }}
          className="absolute top-2 right-2 text-zinc-400 hover:text-red-400 text-sm z-10"
          title="Delete"
        >
          🗑️
        </button>

        {/* Edit Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setEditing(true);
          }}
          className="absolute top-2 right-8 text-zinc-400 hover:text-blue-400 text-sm"
          title="Edit"
        >
          ✍
        </button>

        {/* Drag Handle */}
        <div {...listeners} {...attributes} className="cursor-grab">
          <a
            href={task.link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-semibold pr-6">{task.title}</h3>

            <p className="text-xs text-zinc-400 mt-1">
              {task.type} • {task.platform}
            </p>

            {task.notes && (
              <p className="text-xs text-zinc-500 mt-1">{task.notes}</p>
            )}

            {task.status !== "idea" && task.deadline && (
              <p className="text-xs mt-2">📅 {task.deadline}</p>
            )}

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
