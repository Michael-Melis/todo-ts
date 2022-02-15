import { atom } from "recoil";
import { IFormInput, ITask } from "../interfaces/Interfaces";

export const listArrayState = atom({
  key: "listArrayState",
  default: [] as IFormInput[],
});
export const taskArrayState = atom({
  key: "taskArrayState",
  default: [] as ITask[],
});
