import { useDraggable } from "@dnd-kit/core";

export default function ContentCard({ task, setTasks }) {
  const { setNodeRef, attributes, listeners, transform } =
    useDraggable({ id: task.id });

  const handleDelete = (e) => {
    e.stopPropagation(); // 🔥 IMPORTANT
    e.preventDefault();

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this content card?"
    );

    if (!confirmDelete) return;

    setTasks((prev) => prev.filter((t) => t.id !== task.id));
  };

  return (
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
        onClick={handleDelete}
        className="absolute top-2 right-2 text-zinc-400 hover:text-red-400 text-sm z-10"
        title="Delete"
      >
        🗑️
      </button>

      {/* Drag Handle */}
      <div
        {...listeners}
        {...attributes}
        className="cursor-grab"
      >
        <a href={task.link} target="_blank" rel="noopener noreferrer">
        <h3 className="font-semibold pr-6">{task.title}</h3>

        <p className="text-xs text-zinc-400 mt-1">
          {task.type} • {task.platform} <br/>
          {task.notes ? `Desc: ${task.notes}` : ""}
        </p>

        {task.status !== "idea" && task.deadline && (
          <p className="text-xs mt-2">📅 {task.deadline} <br/>
          {task.notes ? `Desc: ${task.notes}` : ""}</p>

        )}

        {task.status === "review" && (
          <p className="text-xs text-yellow-400 mt-2">
            Needs final polish ✨
          </p>
        )}

        {task.status === "published" && (
          <p className="text-xs text-green-400 mt-2">
            Published 🎉
          </p>
        )}
        </a>
      </div>
    </div>
  );
}
