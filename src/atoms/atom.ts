import { atom } from "recoil";
import { IList, ITask } from "../interfaces/Interfaces";

export const listArrayState = atom({
  key: "listArrayState",
  default: [] as IList[],
});
export const taskArrayState = atom({
  key: "taskArrayState",
  default: [] as ITask[],
});

export const todoListFilterState = atom({
  key: "todoListFilterState",
  default: "Show All",
});
