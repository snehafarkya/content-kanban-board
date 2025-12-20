export const requestNotificationPermission = () => {
  if ("Notification" in window) {
    Notification.requestPermission();
  }
};

export const sendDeadlineNotification = (task) => {
  if (
    "Notification" in window &&
    Notification.permission === "granted"
  ) {
    new Notification("⏰ Deadline Tomorrow", {
      body: `Your story "${task.title}" is scheduled for tomorrow.`,
    });
  }
};
