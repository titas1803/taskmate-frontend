import { useContext } from "react";
import { TaskContext } from "../context/TaskMasterContext";

export const useTaskCtx = () => {
  const ctx = useContext(TaskContext);
  if (!ctx) {
    throw new Error("Task context used outside its provider");
  }

  return ctx;
};
