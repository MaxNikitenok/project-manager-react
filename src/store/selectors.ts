import { State } from "../types/types";


export const isAuthorizedSelector = (state: State) => state.user.isAuthorized;
export const isRegistrationSuccessfullySelector = (state: State) => state.user.isRegistrationSuccessfully;

export const columnsFromBoardSelector = (state: State) => state.boards.columns;
export const tasksFromBoardSelector = (state: State) => state.boards.tasks;
export const newColumnOrderSelector = (state: State) => state.boards.newColumnOrder;