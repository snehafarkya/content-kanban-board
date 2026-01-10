export default function Analytics({ tasks }) {
  const published = tasks.filter((t) => t.status === "published");

  const platformCount = tasks.reduce((acc, t) => {
    acc[t.platform] = (acc[t.platform] || 0) + 1;
    return acc;
  }, {});

  const avgTurnaround =
    published.length === 0
      ? 0
      : Math.round(
          published.reduce((sum, t) => {
            const start = new Date(t.createdAt);
            const end =
              new Date(t.history?.at(-1)?.at || t.createdAt);
            return sum + (end - start);
          }, 0) /
            published.length /
            (1000 * 60 * 60 * 24)
        );

  return (
    <div className="max-w-6xl mx-auto mt-10 bg-zinc-900 p-6 rounded-xl border border-zinc-700">
      <h2 className="text-lg font-semibold mb-4">📊 Analytics</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
        <div className="bg-zinc-800 p-4 rounded">
          Total content
          <div className="text-xl font-bold">{tasks.length}</div>
        </div>

        <div className="bg-zinc-800 p-4 rounded">
          Published
          <div className="text-xl font-bold">{published.length}</div>
        </div>

        <div className="bg-zinc-800 p-4 rounded">
          Avg turnaround
          <div className="text-xl font-bold">
            {avgTurnaround} days
          </div>
        </div>

        <div className="bg-zinc-800 p-4 rounded">
          Platforms
          <div className="mt-2 space-y-1">
            {Object.entries(platformCount).map(([p, c]) => (
              <div key={p} className="text-xs">
                {p}: {c}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
