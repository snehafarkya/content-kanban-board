import { useState } from "react";
import Modal from "./Modal";
import ContentForm from "./ContentForm";
import { MdAdd } from "react-icons/md";

export default function AddContent({ setTasks }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Add Content Button */}
      <div className="flex justify-center ">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-zinc-800 px-4 py-2 flex gap-1 items-center text-white rounded-lg hover:bg-zinc-700 transition"
        >
         <MdAdd/> New Content
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
