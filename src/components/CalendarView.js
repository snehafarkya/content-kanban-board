export default function CalendarView({ tasks }) {
  const grouped = tasks.reduce((acc, task) => {
    if (!task.deadline) return acc;
    acc[task.deadline] = acc[task.deadline] || [];
    acc[task.deadline].push(task);
    return acc;
  }, {});

  const dates = Object.keys(grouped).sort();

  return (
    <div className="max-w-6xl mx-auto mt-8 space-y-6">
      {dates.length === 0 && (
        <p className="text-zinc-400 text-sm">
          No deadlines set yet.
        </p>
      )}

      {dates.map((date) => (
        <div
          key={date}
          className="bg-zinc-900 border border-zinc-700 rounded-xl p-4"
        >
          <h3 className="font-semibold mb-2">📅 {date}</h3>

          <div className="space-y-2">
            {grouped[date].map((task) => (
              <div
                key={task.id}
                className="bg-zinc-800 p-3 rounded text-sm"
              >
                <div className="font-medium">
                  {task.title}
                </div>
                <div className="text-xs text-zinc-400">
                  {task.type} • {task.platform} • {task.status}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
