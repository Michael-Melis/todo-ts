export interface IFormInput {
  listName: string;
  id: string;
}
export interface ITask {
  taskName: string;
  deadline: number;
  id: string;
  isCompleted: boolean;
  isSoftDeleted: boolean;
  optionalInfo?: string;
}
