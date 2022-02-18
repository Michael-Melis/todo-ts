export interface IList {
  listName: string;
  id: number;
  tasks: any[];
  listId: string;
}
export interface ITask {
  taskName: string;
  deadline: string;
  id: string;
  isCompleted: boolean;
  optionalInfo?: string;
  listNameId: string | undefined;
}
