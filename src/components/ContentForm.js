import { useState } from "react";
import CustomDropdown from "./dropdown";

export default function ContentForm({ setTasks, onClose }) {
  const [form, setForm] = useState({
    title: "",
    type: "Blog",
    platform: "Substack",
    deadline: "",
    link: "",
    notes: "",
  });
  const TYPE_OPTIONS = [
    { key: "Blog", label: "Blog" },
    { key: "Video", label: "Video" },
    { key: "Thread", label: "Thread" },
  ];
  const Publish_options = [
    { key: "Hashnode", label: "Hashnode" },
    { key: "Medium", label: "Medium" },
    { key: "LinkedIn", label: "LinkedIn" },
    { key: "YouTube", label: "YouTube" },
    { key: "Twitter", label: "Twitter" },
  ];
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
    onClose?.();
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
      className="max-w-5xl md:mx-auto mx-6  backdrop-blur p-6 rounded-xl border text-black border-zinc-700"
    >
      {/* Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <input
          className="input p-2 rounded-lg border"
          placeholder="Content title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <CustomDropdown
          options={TYPE_OPTIONS}
          value={form.type}
          onChange={(value) => setForm({ ...form, type: value })}
          placeholder="Content type"
        />

        <input
          placeholder="Add link of the content"
          className="input p-2 rounded-lg border"
          value={form.link}
          onChange={(e) => setForm({ ...form, link: e.target.value })}
        />

        <CustomDropdown
          options={Publish_options}
          value={form.platform}
          onChange={(value) => setForm({ ...form, platform: value })}
          placeholder="Content platform"
        />

        <input
          type="date"
          className="input p-2 rounded-lg"
          value={form.deadline}
          onChange={(e) => setForm({ ...form, deadline: e.target.value })}
        />
      </div>

      {/* Notes */}
      <textarea
        className="input mt-4 p-2 rounded-lg border w-full h-24"
        placeholder="Notes / angle / hook"
        value={form.notes}
        onChange={(e) => setForm({ ...form, notes: e.target.value })}
      />

      {/* Centered Button */}
      <div className="flex justify-center mt-6">
         <button
        type="submit"
        className="bg-blue-800 w-max px-4 py-2 text-white rounded-lg hover:bg-blue-600 transition"
      >
        Add 
      </button>
      </div>
    </form>
  );
}
