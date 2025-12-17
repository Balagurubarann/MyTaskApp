import React, { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import TaskList from "./TaskList";
import type { Tab } from "@/types/task.type";
import type { Task } from "@/types/task.type";

function TaskInfo(): React.ReactNode {
  const [activeTab, setActiveTab] = useState<Tab>("all");


  return (
    <>
      <div className="w-[120vmin] h-[80vmin] bg-white drop-shadow-lg rounded-xl p-5 space-y-2">
        <h3 className="text-2xl font-light p-2">Task Window</h3>
        <Tabs
          defaultValue="all"
          className="w-full"
          onValueChange={(value) => setActiveTab(value as Tab)}
        >
          <TabsList className="w-full flex justify-between mb-4">
            <TabsTrigger
              value="all"
              className={`cursor-pointer ${
                activeTab === "all" && "bg-indigo-700/80 text-black"
              }`}
            >
              All
            </TabsTrigger>
            <TabsTrigger
              value="pending"
              className={`cursor-pointer`}
            >
              Pending
            </TabsTrigger>
            <TabsTrigger
              value="completed"
              className={`cursor-pointer`}
            >
              Completed
            </TabsTrigger>
            <TabsTrigger
              value="failed"
              className={`cursor-pointer`}
            >
              Failed
            </TabsTrigger>
          </TabsList>
          <TabsContent value={activeTab}>
            <div className="w-full h-[55vmin] overflow-y-auto space-y-4 px-4">
              <TaskList activeTab={activeTab} />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}

export default TaskInfo;
