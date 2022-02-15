import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ITask } from "../../../../interfaces/Interfaces";
import { Button } from "@mui/material";
import { SetterOrUpdater } from "recoil";

interface Props {
  task: ITask;
  tasksArray: ITask[];
  setTasksArray: SetterOrUpdater<ITask[]>;
}

const TaskView = ({ task, tasksArray, setTasksArray }: Props) => {
  const index = tasksArray.findIndex((listItem) => listItem === task);

  const handleDeleteTask = (): void => {
    const newList = removeItemAtIndex(tasksArray, index);

    setTasksArray(newList);
  };

  const handleCompleteTask = (): void => {
    const newTaskList = replaceItemAtIndex(tasksArray, index, {
      ...task,
      isCompleted: !task.isCompleted,
    });
    setTasksArray(newTaskList);
    console.log(task);
  };
  return (
    <div>
      <h1
        style={
          task.isCompleted
            ? { textDecoration: "line-through" }
            : { textDecoration: "none" }
        }
      >
        {task.taskName}
      </h1>
      <p>{task.deadline}</p>
      <Button onClick={handleDeleteTask}>X</Button>
      <Button onClick={handleCompleteTask}>Complete</Button>
    </div>
  );
};

export default TaskView;

function replaceItemAtIndex(arr: ITask[], index: number, newValue: ITask) {
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
}

function removeItemAtIndex(arr: ITask[], index: number) {
  return [...arr.slice(0, index), ...arr.slice(index + 1)];
}
