import Modal from "./Modal";

export default function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Delete content?",
  description = "This action cannot be undone.",
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <p className="text-sm text-zinc-400 mb-6">
        {description}
      </p>

      <div className="flex justify-end gap-3">
        <button
          onClick={onClose}
          className="px-4 py-2 text-sm text-zinc-400 hover:text-white"
        >
          Cancel
        </button>

        <button
          onClick={onConfirm}
          className="px-4 py-2 text-sm bg-red-600 hover:bg-red-500 text-white rounded-lg"
        >
          Delete
        </button>
      </div>
    </Modal>
  );
}
