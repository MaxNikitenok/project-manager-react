import { State } from "../types/types";


export const isAuthorized = (state: State) => state.user.isAuthorized;
export const isRegistrationSuccessfully = (state: State) => state.user.isRegistrationSuccessfully;

export const columnsFromBoard = (state: State) => state.boards.columns;
export const tasksFromBoard = (state: State) => state.boards.tasks