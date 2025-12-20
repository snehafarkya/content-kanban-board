export const loadTasks = () => {
  try {
    return JSON.parse(localStorage.getItem("content-tasks")) || [];
  } catch {
    return [];
  }
};

export const saveTasks = (tasks) => {
  localStorage.setItem("content-tasks", JSON.stringify(tasks));
};
