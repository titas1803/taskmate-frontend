import { useReducer } from "react";
import { TaskContext } from "./TaskMasterContext";
import PropTypes from "prop-types";

const initialState = [];
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      if (action.payload.task) {
        return [...state, action.payload.task];
      } else throw new Error("No new task provided to add");
    case "DELETE":
      if (!action.payload.id) throw new Error("Provide a task id");
      return state.filter((task) => task.id !== action.payload.id);
    case "DELETEALL":
      return [];
    case "EDIT": {
      if (action.payload.task) {
        const taskAt = state.findIndex(
          (task) => task.id === action.payload.task.id
        );
        if (taskAt === -1) throw new Error("task not found");
        return [
          ...state.slice(0, taskAt),
          action.payload.task,
          ...state.slice(taskAt + 1),
        ];
      } else throw new Error("No task provided to edit");
    }
    case "DONE": {
      if (!action.payload.id) throw new Error("Provide a task id");
      const taskAt = state.findIndex((task) => task.id === action.payload.id);
      const newData = { ...state[taskAt], status: "COMPLETED" };
      return [...state.slice(0, taskAt), newData, ...state.slice(taskAt + 1)];
    }
    case "PENDING": {
      if (!action.payload.id) throw new Error("Provide a task id");
      const taskAt = state.findIndex((task) => task.id === action.payload.id);
      const newData = { ...state[taskAt], status: "PENDING" };
      return [...state.slice(0, taskAt), newData, ...state.slice(taskAt + 1)];
    }
    default:
      throw new Error("Not a valid action");
  }
};

export const TaskMasterContest = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};
TaskMasterContest.propTypes = {
  children: PropTypes.node.isRequired,
};
