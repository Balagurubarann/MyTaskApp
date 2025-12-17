import type { Status } from "@/types/task.type";
import React from "react";

function StatusIndicator(props: { status: Status }): React.ReactNode {
    const { status } = props;
  return (
    <span
      className={`h-6 w-6 ${
        status === "pending"
          ? "bg-amber-400/30"
          : status === "completed"
          ? "bg-green-400/30"
          : "bg-red-400/30"
      } rounded-full flex justify-center items-center`}
    >
      <span
        className={`h-3 w-3 ${
          status === "pending"
            ? "bg-amber-400"
            : status === "completed"
            ? "bg-green-400"
            : "bg-red-400"
        } rounded-full block`}
      ></span>
    </span>
  );
}

export default StatusIndicator;
