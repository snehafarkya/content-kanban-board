import { useDroppable } from "@dnd-kit/core";
import ContentCard from "./ContentCard";

export default function Column({ id, title, tasks, setTasks}) {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className="bg-zinc-900/50 rounded-xl p-4 border border-zinc-700 min-h-[400px]"
    >
      <h2 className={`capitalize font-semibold mb-4 text-black p-2 rounded-lg border-2   
        ${title === "idea" ? "bg-yellow-300" : "" || title === "writing" ? "bg-blue-300" : "" || title === "review" ? "bg-purple-300" : "" || title === "published" ? "bg-green-300" : "" }`}>
        {title}
      </h2>

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
