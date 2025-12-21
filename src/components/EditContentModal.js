import { useState } from "react";
import Modal from "./Modal";

export default function EditContentModal({ task, isOpen, onClose, onSave }) {
  const [form, setForm] = useState(task);

  const handleSave = () => {
    onSave(form);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="font-semibold mb-4 text-white text-lg">
        Edit Content
      </h2>

      <input
        className="input p-2 text-black rounded mb-3 w-full"
        value={form.title}
        onChange={(e) =>
          setForm({ ...form, title: e.target.value })
        }
        placeholder="Title"
      />

      <input
        className="input p-2  text-black rounded mb-3 w-full"
        value={form.link}
        onChange={(e) =>
          setForm({ ...form, link: e.target.value })
        }
        placeholder="Content link"
      />

      <textarea
        className="input p-2  text-black rounded mb-4 w-full"
        value={form.notes}
        onChange={(e) =>
          setForm({ ...form, notes: e.target.value })
        }
        placeholder="Notes / description"
      />

      <div className="flex justify-end gap-3">
        <button
          onClick={onClose}
          className="px-3 py-1 text-sm text-zinc-400 hover:text-white"
        >
          Cancel
        </button>

        <button
          onClick={handleSave}
          className="bg-blue-700 hover:bg-blue-600 px-4 py-1 rounded text-sm text-white"
        >
          Save
        </button>
      </div>
    </Modal>
  );
}
