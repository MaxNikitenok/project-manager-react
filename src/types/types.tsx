export type State = {
  userState: UserState;
  boardState: BoardState;
}

export interface UserState {
  name: string | null;
  login: string | null;
  token: string | null;
}

export interface BoardState {

}

export interface User {
  _id: string;
  name: string;
  login: string;
}

export type UsersResponse = User[];

export interface Board {
  _id: string;
  title: string;
  owner: string;
  users: string[];
}

export type BoardsResponse = Board[];

export interface Column {
  _id: string;
  title: string;
  order: number;
  boardId: string;
}

export type ColumnsResponse = Column[];

export interface Task {
  _id: string;
  title: string;
  order: number;
  boardId: string;
  columnId: string;
  description: string;
  userId: number;
  users: string[];
}

export type TasksResponse = Column[];
