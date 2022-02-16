export interface IFormInput {
  listName: string;
  id?: number;
  tasks: any[];
  listId: string;
}
export interface ITask {
  taskName: string;
  deadline: number;
  id: string;
  isCompleted: boolean;
  isDeleted: boolean;
  optionalInfo?: string;
  listNameId: string | undefined;
}
