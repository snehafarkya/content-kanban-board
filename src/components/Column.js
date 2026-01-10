import { useDroppable } from "@dnd-kit/core";
import ContentCard from "./ContentCard";

const STATUS_CONFIG = {
  idea: {
    label: "Ideas",
    dot: "bg-orange-500",
  },
  writing: {
    label: "Writing",
    dot: "bg-blue-500",
  },
  review: {
    label: "Review",
    dot: "bg-purple-500",
  },
  published: {
    label: "Published",
    dot: "bg-green-500",
  },
};

export default function Column({ id, title, tasks = [], setTasks }) {
  const { setNodeRef } = useDroppable({ id });
  const config = STATUS_CONFIG[title];

  return (
    <div
      ref={setNodeRef}
      className="bg-[#f5f7f9] rounded-xl p-4 min-h-[400px]"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {/* Colored dot */}
          <span
            className={`w-2 h-2 rounded-full ${config.dot}`}
          />

          {/* Title */}
          <h2 className="font-semibold text-black">
            {config.label}
          </h2>
        </div>

        {/* Count badge */}
        <span className="bg-gray-200 text-gray-700 rounded-md px-2 py-0.5 text-sm font-medium">
          {tasks.length}
        </span>
      </div>

      {/* Cards */}
      {tasks.map((task) => (
        <ContentCard
          key={task.id}
          task={task}
          setTasks={setTasks}
        />
      ))}
    </div>
  );
}
