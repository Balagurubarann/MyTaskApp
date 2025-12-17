import { create } from 'zustand';
import type { Task } from "@/types/task.type.ts";

type TaskStore = {
  tasks: Task[],
  addTask: () => void;
}

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  addTask: (task) => (
    set((state) => ({
      tasks: [...state.tasks, task]
    }))
  ),
  fetchTask: async () => {
    try {

      const response = await fetch("http://localhost:5000/api/tasks", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (response.ok) {
        const data = await response.json();
        set({ tasks: data.tasks });
      }

    } catch (error) {
      throw error;
    }
  },
  removeTask: (taskId) => (
    set((state) => ({
      tasks: state.tasks.filter(task => task.id !== taskId)
    }))
  ),
  updateTask: (payload) => (
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === payload.id ? { ...task, ...payload } : task
      ),
    }))
  )
}));
