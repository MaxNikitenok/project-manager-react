export type State = {
  user: UserState;
  boards: BoardsState;
}

export interface UserState {
  isAuthorized: boolean;
  isRegistrationSuccessfully: boolean;
}

export interface BoardsState {
  boards: IBoard[];
  columns: ColumnState[];
  tasks: ITask[];
  columnOrder: string[];
}

export interface IUser {
  _id: string;
  name: string;
  login: string;
}

export type UsersResponse = IUser[];

export interface IBoard {
  _id: string;
  title: string;
  owner: string;
  users: string[];
}

export type BoardsResponse = IBoard[];

export interface IColumn {
  _id: string;
  title: string;
  order: number;
  boardId: string;
}

export type ColumnsResponse = IColumn[];

export interface ColumnState extends IColumn {
  taskIds: string[]; 
}

export interface ITask {
  _id: string;
  title: string;
  order: number;
  boardId: string | undefined;
  columnId: string;
  description: string;
  userId: string;
  users: string[];
}

export type TasksResponse = ITask[];
