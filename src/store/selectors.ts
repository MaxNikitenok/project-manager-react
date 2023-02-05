import { State } from "../types/types";


export const isAuthorized = (state: State) => state.user.isAuthorized;
export const isRegistrationSuccessfully = (state: State) => state.user.isRegistrationSuccessfully;
