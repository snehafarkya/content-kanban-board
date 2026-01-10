import AddContent from "./AddContent";
import { useState } from "react";

export default function Header({setTasks}) {
  return (
    <header className="flex flex-col md:flex-row justify-between items-center md:items-start  ">
      <div className="flex flex-col">
      <h1 className="text-4xl font-bold  tracking-tight">
        Content Pipeline
      </h1>
      <p className="text-gray-600 mt-2">
        Track content from Ideation to Publication.
      </p>
      </div>
      <AddContent setTasks={setTasks}/>
    </header>
  );
}
