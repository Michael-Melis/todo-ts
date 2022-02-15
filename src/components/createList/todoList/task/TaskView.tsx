import React from "react";
import { ITask } from "../../../../interfaces/Interfaces";

import { Button } from "@mui/material";
import { SetterOrUpdater } from "recoil";

interface Props {
  task: ITask;
  tasksArray: ITask[];
  setTasksArray: SetterOrUpdater<ITask[]>;
}

const TaskView = ({ task, tasksArray, setTasksArray }: Props) => {
  const handleDeleteTask = (): void => {
    setTasksArray(tasksArray.filter((exactTask) => task.id !== exactTask.id));
  };
  return (
    <div>
      <h1>{task.taskName}</h1>
      <p>{task.deadline}</p>
      <Button onClick={handleDeleteTask}>X</Button>
    </div>
  );
};

export default TaskView;
