export const isTomorrow = (dateStr) => {
  const today = new Date();
  const deadline = new Date(dateStr);

  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  return deadline.toDateString() === tomorrow.toDateString();
};
