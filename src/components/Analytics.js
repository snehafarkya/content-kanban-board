export default function Analytics({ tasks }) {
  const published = tasks.filter((t) => t.status === "published");

  return (
    <div className="max-w-5xl mx-auto mt-10 bg-zinc-900 p-6 rounded-xl border">
      <h2 className="font-semibold mb-4">📊 Analytics</h2>

      <div className="grid grid-cols-3 gap-4 text-sm">
        <div>Total content: {tasks.length}</div>
        <div>Published: {published.length}</div>
        <div>
          Avg turnaround:{" "}
          {Math.round(
            published.reduce(
              (acc, t) =>
                acc +
                (new Date(t.history.at(-1).at) -
                  new Date(t.createdAt)),
              0
            ) /
              published.length /
              (1000 * 60 * 60 * 24)
          )}{" "}
          days
        </div>
      </div>
    </div>
  );
}
