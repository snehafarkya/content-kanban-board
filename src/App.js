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

export default function App() {
  const [tasks, setTasks] = useState(loadTasks());
  const [reminders, setReminders] = useState([]);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-800 text-white">
      <Header />
      <ReminderBanner reminders={reminders} />
      <ContentForm setTasks={setTasks} />
      <Board tasks={tasks} setTasks={setTasks} />
    </div>
  );
}
