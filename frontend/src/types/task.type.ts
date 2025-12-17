export type Task = {
  title: string;
  status: "pending" | "completed" | "failed";
  description: string;
  taskStartDate: string;
  taskEndDate: string;
};

export type Tab = "all" | "pending" | "completed" | "failed";

export type Status = "pending" | "completed" | "failed";