import { State } from '../types/types';

export const tasksSelector = (state: State) => state.tasks.tasks;
