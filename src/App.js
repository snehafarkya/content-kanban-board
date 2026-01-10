import { useEffect, useState } from "react";
import Header from "./components/Header";
import ContentForm from "./components/ContentForm";
import Board from "./components/Board";
import ReminderBanner from "./components/ReminderBanner";
import { loadTasks, saveTasks } from "./utils/storage";
import { isTomorrow } from "./utils/date";
import {
  requestNotificationPermission,
  sendDeadlineNotification,
} from "./utils/notifications";
import Analytics from "./components/Analytics";
import CalendarView from "./components/CalendarView";
import AddContent from "./components/AddContent";
import Overview from "./components/Overview";

export default function App() {
  const [tasks, setTasks] = useState(loadTasks());
  const [reminders, setReminders] = useState([]);
  const [query, setQuery] = useState("");
  const [platformFilter, setPlatformFilter] = useState("");

  const [view, setView] = useState("board");

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  // Ask permission once
  useEffect(() => {
    requestNotificationPermission();
  }, []);

  // Reminder logic
  useEffect(() => {
    const dueTomorrow = tasks.filter(
      (task) =>
        task.deadline &&
        task.status !== "published" &&
        isTomorrow(task.deadline) &&
        !task.notified
    );

    if (dueTomorrow.length) {
      setReminders(dueTomorrow);

      setTasks((prev) =>
        prev.map((task) =>
          dueTomorrow.find((t) => t.id === task.id)
            ? { ...task, notified: true }
            : task
        )
      );

      dueTomorrow.forEach(sendDeadlineNotification);
    } else {
      setReminders([]);
    }
  }, [tasks]);
  const visibleTasks = tasks.filter(
    (t) =>
      t.title.toLowerCase().includes(query.toLowerCase()) &&
      (!platformFilter || t.platform === platformFilter)
  );

  return (
    <div className="min-h-screen bg-gray-100 text-black md:p-16 p-4">
      <Header setTasks={setTasks}/>
      <div className="flex justify-center gap-3 mb-6">
        {/* <button
          onClick={() => setView("board")}
          className={`px-4 py-2 rounded text-sm ${
            view === "board"
              ? "bg-blue-700 text-white"
              : "bg-zinc-800 text-zinc-300"
          }`}
        >
          Board
        </button>

        <button
          onClick={() => setView("calendar")}
          className={`px-4 py-2 rounded text-sm ${
            view === "calendar"
              ? "bg-blue-700 text-white"
              : "bg-zinc-800 text-zinc-300"
          }`}
        >
          Calendar
        </button>

        <button
          onClick={() => setView("analytics")}
          className={`px-4 py-2 rounded text-sm ${
            view === "analytics"
              ? "bg-blue-700 text-white"
              : "bg-zinc-800 text-zinc-300"
          }`}
        >
          Analytics
        </button> */}
      </div>
        <Overview tasks={tasks}/>
      <ReminderBanner reminders={reminders} />
      {/* <AddContent/> */}
      {view === "board" && <Board tasks={tasks} setTasks={setTasks} />}

      {view === "calendar" && <CalendarView tasks={tasks} />}

      {view === "analytics" && <Analytics tasks={tasks} />}
    </div>
  );
}
