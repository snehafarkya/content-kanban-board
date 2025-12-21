import { useState } from "react";

export default function ContentForm({ setTasks }) {
  const [form, setForm] = useState({
    title: "",
    type: "Blog",
    platform: "Substack",
    deadline: "",
    link: "",
    notes: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title) return;

    setTasks((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        ...form,
        status: "idea",
        createdAt: new Date().toISOString(),
      },
    ]);

    setForm({
      title: "",
      type: "Blog",
      platform: "Substack",
      deadline: "",
      link: "",
      notes: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-5xl md:mx-auto mx-6 bg-zinc-900/60 backdrop-blur p-6 rounded-xl border text-black border-zinc-700"
    >
      {/* Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <input
          className="input p-2 rounded-lg"
          placeholder="Content title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <select
          className="input p-2 rounded-lg"
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
        >
          <option>Blog</option>
          <option>Video</option>
          <option>Thread</option>
        </select>

        <input
          placeholder="Add link of the content"
          className="input p-2 rounded-lg"
          value={form.link}
          onChange={(e) => setForm({ ...form, link: e.target.value })}
        />

        <select
          className="input p-2 rounded-lg"
          value={form.platform}
          onChange={(e) => setForm({ ...form, platform: e.target.value })}
        >
          <option>Substack</option>
          <option>Medium</option>
          <option>LinkedIn</option>
          <option>Twitter</option>
        </select>

        <input
          type="date"
          className="input p-2 rounded-lg"
          value={form.deadline}
          onChange={(e) => setForm({ ...form, deadline: e.target.value })}
        />
      </div>

      {/* Notes */}
      <textarea
        className="input mt-4 p-2 rounded-lg w-full h-24"
        placeholder="Notes / angle / hook"
        value={form.notes}
        onChange={(e) => setForm({ ...form, notes: e.target.value })}
      />

      {/* Centered Button */}
      <div className="flex justify-center mt-6">
        <button
          type="submit"
          className="bg-blue-800 px-8 py-2 text-white hover:bg-blue-600 font-semibold rounded-lg transition"
        >
          Add Content
        </button>
      </div>
    </form>
  );
}
