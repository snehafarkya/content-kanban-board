export default function ReminderBanner({ reminders }) {
  if (!reminders.length) return null;

  return (
    <div className="max-w-5xl mx-auto mt-6 mb-2 px-4">
      <div className="bg-yellow-400/10 border border-yellow-400/30 text-yellow-300 rounded-xl p-4">
        <p className="font-semibold mb-1">⏰ Upcoming deadlines</p>

        <ul className="text-sm space-y-1">
          {reminders.map((task) => (
            <li key={task.id}>
              “<span className="font-medium">{task.title}</span>” goes live
              tomorrow
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
