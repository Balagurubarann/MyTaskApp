import React, { useState } from "react";
import { NotebookPen, PenTool, RotateCcw } from "lucide-react";
import type { Task } from "@/types/task.type";
import { useTaskStore } from "@/store/useTaskStore.ts";

function AddTaskForm(): React.ReactNode {
  const [task, setTask] = useState<Task>({
    title: "",
    status: "pending",
    description: "",
    taskStartDate: new Date().toISOString().split("T")[0] || "",
    taskEndDate: "",
  });

  const addTask = useTaskStore(state => state.addTask);

  function handleTaskInputChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value, type } = e.target;

    setTask((prev) => ({
      ...prev,
      [name as keyof typeof prev]:
        type === "date" ? new Date(value).toISOString().split("T")[0] : value,
    }));
  }

  async function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/add-task", {
        method: "POST",
        body: JSON.stringify(task),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();

        addTask(data.task);

        setTask({
          title: "",
          status: "pending",
          description: "",
          taskStartDate: new Date().toISOString().split("T")[0] || "",
          taskEndDate: "",
        });
      }
    } catch (error) {
      throw error;
    }
  }

  return (
    <form
      className="w-[70vmin] h-[80vmin] bg-white drop-shadow-lg rounded-xl p-5 space-y-2 border-black border-2"
      onSubmit={handleFormSubmit}
    >
      <div className="py-2 flex gap-2">
        <span className="h-6 w-6 bg-indigo-400/30 rounded-full flex justify-center items-center">
          <span className="bg-indigo-400 rounded-full h-3 w-3 block"></span>
        </span>
        <p className="capitalize font-bold">Your new task goes here</p>
      </div>
      <div className="flex gap-1 border-2 p-1 rounded-md">
        <label
          className="flex items-center bg-black px-3 rounded-md cursor-pointer"
          htmlFor="title"
        >
          <PenTool size={18} className="text-zinc-100" />
        </label>
        <input
          id="title"
          name="title"
          className="px-4 py-2 border-none outline-none"
          placeholder="Enter New Task"
          required
          onChange={handleTaskInputChange}
          value={task.title}
        />
      </div>
      <div className="flex justify-between py-4">
        <div>
          <p className="text-zinc-500 mb-1">Start Date:</p>
          <div className="p-2 border-2 rounded-md cursor-pointer">
            <input
              type="date"
              name="taskStartDate"
              id="taskStartDate"
              className="outline-none border-none appearance-none cursor-pointer"
              onChange={handleTaskInputChange}
              value={task.taskStartDate}
              required
            />
          </div>
        </div>
        <div>
          <p className="text-zinc-500 mb-1">End Date:</p>
          <div className="p-2 border-2 rounded-md cursor-pointer">
            <input
              type="date"
              name="taskEndDate"
              id="taskEndDate"
              className="outline-none border-none appearance-none cursor-pointer"
              required
              onChange={handleTaskInputChange}
              value={task.taskEndDate}
            />
          </div>
        </div>
      </div>
      <div className="border-2 rounded-md">
        <textarea
          name="description"
          id="description"
          className="w-full h-[30vmin] p-5 outline-none appearance-none border-none tracking-wide resize-none"
          placeholder="Add Task description ..."
          required
          onChange={handleTaskInputChange}
          value={task.description}
        ></textarea>
      </div>
      <div className="flex gap-10">
        <button
          type="reset"
          className="w-full flex items-center justify-center gap-4 p-2 rounded-md text-white bg-black transition-all cursor-pointer mt-2"
        >
          <RotateCcw size={20} />
          <span>Reset</span>
        </button>
        <button
          type="submit"
          className="w-full flex items-center justify-center gap-4 rounded-md text-white border-2 bg-indigo-500 transition-all cursor-pointer mt-2"
        >
          <NotebookPen size={20} />
          <span>Add Task</span>
        </button>
      </div>
    </form>
  );
}

export default AddTaskForm;
