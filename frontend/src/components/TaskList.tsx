import React, { useEffect, useState } from "react";
import TaskPopupModel from "./TaskPopupModel";
import type { Status, Task } from "@/types/task.type";
import StatusIndicator from "./StatusIndicator";
import useTask from "../hooks/useTask.tsx";

type Tab = "all" | "pending" | "completed" | "failed";


function TaskList(props: { activeTab: Tab }): React.ReactNode {
  const { activeTab } = props;

  const [selectedTask, setSelectedTask] = useState<Task>({
    title: "",
    status: "pending",
    description: "",
    taskStartDate: "",
    taskEndDate: "",
  });

  const [isRendered, setIsRendered] = useState<boolean>(false);

  function renderTaskModel() {
    setIsRendered(true);
  }

  useEffect(() => {
    if (selectedTask.title) {
      renderTaskModel();
    }
  }, [selectedTask, setSelectedTask]);

  return (
    <>
      {isRendered && (
        <TaskPopupModel
          setIsRendered={setIsRendered}
          selectedTask={selectedTask}
          setSelectedTask={setSelectedTask}
        />
      )}

      {[].map((task, index) => {
        return (
          (activeTab === task.status || activeTab === "all") && (
            <div
              className="w-full p-5 bg-white drop-shadow-md space-y-3 rounded-lg border-black border-2 hover:bg-indigo-100/20 cursor-pointer"
              key={index}
              onClick={() => setSelectedTask(task as Task)}
            >
              <div className="w-full flex justify-between">
                <div className="flex gap-4 items-center">
                  <StatusIndicator status={task.status as Status} />
                  <h4 className="font-bold">{task.title}</h4>
                </div>

                <p className="text-right font-semibold text-xs text-gray-500">
                  {task.taskEndDate}
                </p>
              </div>
              <p className="text-neutral-600 text-sm">
                {task.description}
              </p>
            </div>
          )
        );
      })}
    </>
  );
}

export default TaskList;
