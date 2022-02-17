import { atom, selector } from "recoil";
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
export const filteredTodoListState = selector({
  key: "filteredTodoListState",
  get: ({ get }) => {
    const filter = get(todoListFilterState);
    const list = get(taskArrayState);

    switch (filter) {
      case "Show Completed":
        return list.filter((item) => item.isCompleted);
      case "Show Uncompleted":
        return list.filter((item) => !item.isCompleted);
      default:
        return list;
    }
  },
});
