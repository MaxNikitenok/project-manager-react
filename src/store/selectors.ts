import { State } from "../types/types";


export const isAuthorizedSelector = (state: State) => state.user.isAuthorized;
export const isRegistrationSuccessfullySelector = (state: State) => state.user.isRegistrationSuccessfully;

export const boardsSelector = (state: State) => state.boards.boards;
export const columnsFromBoardSelector = (state: State) => state.boards.columns;
export const tasksFromBoardSelector = (state: State) => state.boards.tasks;
export const columnOrderSelector = (state: State) => state.boards.columnOrder;