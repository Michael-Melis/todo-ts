import { useParams } from "react-router-dom";
import { ITask } from "../../../../interfaces/Interfaces";
import { Button } from "@mui/material";
import { SetterOrUpdater } from "recoil";
import styled from "styled-components";
import axios from "axios";

interface Props {
  task: ITask;
  tasksArray: ITask[];
  setTasksArray: SetterOrUpdater<ITask[]>;
}

const TaskView = ({ task, tasksArray, setTasksArray }: Props) => {
  const index = tasksArray.findIndex((listItem) => listItem === task);
  let { slug } = useParams();

  const handleDeleteTask = async () => {
    const newList = removeItemAtIndex(tasksArray, index);

    setTasksArray(newList);
    console.log(newList);
    try {
      await axios.put(
        `https://620bd0cce8751b8b5facfda6.mockapi.io/todoapp/${slug}`,
        {
          tasks: newList,
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleCompleteTask = async () => {
    const newTaskList = replaceItemAtIndex(tasksArray, index, {
      ...task,
      isCompleted: !task.isCompleted,
    });
    setTasksArray(newTaskList);

    try {
      await axios.put(
        `https://620bd0cce8751b8b5facfda6.mockapi.io/todoapp/${slug}`,
        {
          tasks: newTaskList,
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <StyledTask>
      <StyledTaskContent>
        <h1
          style={
            task.isCompleted
              ? { textDecoration: "line-through", background: "red" }
              : { textDecoration: "underline", background: "green" }
          }
        >
          Task: {task.taskName}
        </h1>

        <h2>Content: {task.optionalInfo}</h2>
        <p>Deadline: {task.deadline}</p>
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
  margin: 1rem 5rem;
  justify-content: space-between;
  align-items: center;
`;
const StyledTaskContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  h1 {
    text-decoration: underline;
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
