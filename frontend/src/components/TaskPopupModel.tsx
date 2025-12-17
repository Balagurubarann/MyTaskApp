import { CircleX, Save, Trash2 } from "lucide-react";
import React, { useState } from "react";
import type { Status, Task } from "@/types/task.type.ts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import StatusIndicator from "./StatusIndicator";

function TaskPopupModel(props: {
  setIsRendered: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedTask: React.Dispatch<React.SetStateAction<Task>>;
  selectedTask: Task;
}): React.ReactNode {
  const { selectedTask, setIsRendered, setSelectedTask } = props;

  const [readyToRemove, setReadyToRemove] = useState<boolean>(false);

  function closeTaskModel() {
    setIsRendered(false);
    setSelectedTask({
      title: "",
      status: "pending",
      description: "",
      taskStartDate: "",
      taskEndDate: "",
    });
  }

  function handleStatusChange(status: Status) {
    setSelectedTask({
      ...selectedTask,
      status,
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center transition-all">
      <div className="absolute inset-0 bg-black/30 h-[80vmin] rounded-md" />
      <div className="relative z-50 bg-white rounded-lg p-6 w-[65vmin] h-[65vmin]">
        <div className="flex justify-between">
          <div className="flex gap-2 items-center">
            <StatusIndicator status={selectedTask.status} />
            <Select
              defaultValue={selectedTask.status}
              onValueChange={handleStatusChange}
              disabled={readyToRemove}
            >
              <SelectTrigger className="border-none appearance-none outline-none w-[20vmin] bg-zinc-300/30 cursor-pointer">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem className="cursor-pointer" value="completed">Completed</SelectItem>
                <SelectItem className="cursor-pointer" value="pending">Pending</SelectItem>
                <SelectItem className="cursor-pointer" value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-zinc-500">
              {selectedTask.taskStartDate}
            </p>
          </div>
          <div className="flex items-center gap-6">
            <button className="cursor-pointer" onClick={() => setReadyToRemove(!readyToRemove)}>
              <Trash2
                size={28}
                className={`text-red-500 border-2 border-red-500 ${readyToRemove && "bg-red-400/30"} p-1 rounded-full`}
              />
            </button>
            <button className="cursor-pointer" onClick={closeTaskModel}>
              <CircleX size={24} />
            </button>
          </div>
        </div>
        <div className="mt-6 flex flex-col space-y-4">
          <h3 className="text-xl text-black">{selectedTask.title}</h3>
          <p className="text-justify text-sm h-[20vmin]">
            {selectedTask.description}
          </p>
          <div className="p-2 flex justify-between rounded bg-zinc-300/30 mt-4">
            <p>Task ends on:</p>
            <input type="date" defaultValue={selectedTask.taskEndDate} />
          </div>
          <button className={`${
            readyToRemove ? "bg-red-500": "bg-indigo-500"
          } p-2 mt-3 rounded flex gap-4 justify-center items-center cursor-pointer`}>
            {
              readyToRemove ? (
                <Trash2 className="text-white" size={20} />
              ): (
                <Save className="text-white" size={20} />
              )
            }
            <p className="text-white capitalize">
              {
                readyToRemove ? "Delete Task": "Save task"
              }
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskPopupModel;
