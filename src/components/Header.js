import AddContent from "./AddContent";
import { useState } from "react";

export default function Header({setTasks}) {
  return (
    <header className="flex flex-col md:flex-row justify-between items-center md:items-start mt-6 md:mt-0 ">
      <div className="flex flex-col justify-center items-center md:items-start">
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
