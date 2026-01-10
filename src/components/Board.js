import { DndContext } from "@dnd-kit/core";
import Column from "./Column";
import { isPublicView } from "../utils/ViewMode";
const readOnly = isPublicView();

const STATUSES = ["idea", "writing", "review", "published"];

export default function Board({ tasks, setTasks }) {
  const handleDragEnd = ({ active, over }) => {
    if (!over) return;

    setTasks((prev) =>
      prev.map((task) =>
        task.id === active.id ? { ...task, status: over.id } : task
      )
    );
  };

  return (
    <DndContext onDragEnd={readOnly ? undefined : handleDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6 md:max-w-7xl md:mx-auto">
        {STATUSES.map((status) => (
          <Column
            key={status}
            id={status}
            title={status}
            tasks={tasks.filter((t) => t.status === status)}
            setTasks={setTasks}
          />
        ))}
      </div>
    </DndContext>
  );
}
