export interface IList {
  listName: string;
  id?: number;
  tasks: any[];
  listId: string;
}
export interface ITask {
  taskName: string;
  deadline: string;
  id: string;
  isCompleted: boolean;
  isDeleted: boolean;
  optionalInfo?: string;
  listNameId: string | undefined;
}
