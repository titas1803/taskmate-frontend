export type Task = {
  id: number;
  name: string;
  details: string;
  time: string;
  status: "PENDING" | "COMPLETED";
};
export type Action = {
  type: string;
  payload: {
    id?: number;
    task?: Task;
  };
};
export type TaskContextType = {
  state: Task[];
  dispatch: React.Dispatch<Action>;
};