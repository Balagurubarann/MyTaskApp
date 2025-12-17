/*
  Fetching tasks using useTask hook
*/

import { useState, useEffect } from "react";
import type { Task } from "@/types/task.type.ts";

function useTask() {

  const [fetchedTaskArray, setFetchedTaskArray] = useState<Task[]>([]);

  async function fetchTask() {

    try {

      const response = await fetch("http://localhost:5000/api/tasks", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setFetchedTaskArray(data.tasks);
      }

    } catch (error) {
      throw error;
    }

  }

  useEffect(() => {
    fetchTask();
  }, []);

  return {
    fetchedTaskArray,
    fetchTask
  };

}

export default useTask;
