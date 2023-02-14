export const initialData = {
  tasks: [
    {id: 'task-1', content: 'task-1 content'},
    {id: 'task-2', content: 'task-2 content'},
    {id: 'task-3', content: 'task-3 content'},
    {id: 'task-4', content: 'task-4 content'},
  ],
  columns: [
    {
      id: 'column-1',
      title: 'To-do',
      taskIds: ['task-1', 'task-2', 'task-3', 'task-4'],
    },
    {
      id: 'column-2',
      title: 'In progress',
      taskIds: [],
    },
    {
      id: 'column-3',
      title: 'Done',
      taskIds: [],
    },
  ],
  columnOrder: ['column-1', 'column-2', 'column-3'],
};
