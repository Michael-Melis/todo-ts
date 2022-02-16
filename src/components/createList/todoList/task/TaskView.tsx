import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ITask } from "../../../../interfaces/Interfaces";
import { Button } from "@mui/material";
import { SetterOrUpdater } from "recoil";
import styled from "styled-components";

interface Props {
  task: ITask;
  tasksArray: ITask[];
  setTasksArray: SetterOrUpdater<ITask[]>;
}

const TaskView = ({ task, tasksArray, setTasksArray }: Props) => {
  const index = tasksArray.findIndex((listItem) => listItem === task);
  let { slug } = useParams();

  const handleDeleteTask = (): void => {
    const newList = removeItemAtIndex(tasksArray, index);

    setTasksArray(newList);
  };

  const handleCompleteTask = async () => {
    const newTaskList = replaceItemAtIndex(tasksArray, index, {
      ...task,
      isCompleted: !task.isCompleted,
    });
    setTasksArray(newTaskList);
  };
  return (
    <StyledTask>
      <StyledTaskContent>
        <h1
          style={
            task.isCompleted
              ? { textDecoration: "line-through" }
              : { textDecoration: "none" }
          }
        >
          Task: {task.taskName}
        </h1>
        <p>Deadline: {task.deadline}</p>
        <p>Content: {task.optionalInfo}</p>
      </StyledTaskContent>
      <div>
        <Button onClick={handleDeleteTask}>X</Button>
        <Button onClick={handleCompleteTask}>Complete</Button>
      </div>
    </StyledTask>
  );
};

const StyledTask = styled.div`
  display: flex;
  border: 3px solid black;
  margin: 1rem 0;
  justify-content: space-between;
  align-items: center;
`;
const StyledTaskContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  h1 {
    background: grey;
  }
  p {
    background: #c5c1c1;
  }
`;

export default TaskView;

function replaceItemAtIndex(arr: ITask[], index: number, newValue: ITask) {
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
}

function removeItemAtIndex(arr: ITask[], index: number) {
  return [...arr.slice(0, index), ...arr.slice(index + 1)];
}
