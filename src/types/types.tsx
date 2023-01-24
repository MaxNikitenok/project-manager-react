export type State = {
  tasks: TasksState;
};

export type TasksState = {
  tasks: { _id: number; name: string; isDone: boolean | null }[];
};

