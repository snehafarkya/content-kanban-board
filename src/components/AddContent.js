import { useState } from "react";
import Modal from "./Modal";
import ContentForm from "./ContentForm";

export default function AddContent({ setTasks }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Add Content Button */}
      <div className="flex justify-center mt-6">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gray-800 px-6 py-2 text-white rounded-lg hover:bg-gray-600 transition"
        >
          Add Content
        </button>
      </div>

      {/* Modal */}
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ContentForm
          setTasks={setTasks}
          onClose={() => setIsOpen(false)}
        />
      </Modal>
    </>
  );
}
