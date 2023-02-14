export type State = {
  user: UserState;
  boards: BoardsState;
}

export interface UserState {
  name: string | null;
  login: string | null;
  isAuthorized: boolean;
  isRegistrationSuccessfully: boolean;
}

export interface BoardsState {
  boards: IBoard[];
  columns: IColumn[];
  tasks: ITask[];
  newColumnOrder: IColumn[] | null;

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
  taskIds: string[];
}

export type ColumnsResponse = IColumn[];

export interface ITask {
  _id: string;
  title: string;
  order: number;
  boardId: string;
  columnId: string;
  description: string;
  userId: number;
  users: string[];
}

export type TasksResponse = ITask[];
