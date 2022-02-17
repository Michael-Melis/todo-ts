import { useParams } from "react-router-dom";
import { ITask } from "../../../../interfaces/Interfaces";
import { Button } from "@mui/material";
import { SetterOrUpdater } from "recoil";
import {
  StyledBtnContainer,
  StyledTask,
  StyledTaskContent,
} from "./Task.styles";
import axios from "axios";
import {
  CompleteSubmitBtn,
  DeleteSubmitBtn,
} from "../../../../styles/GlobalStyles";

interface Props {
  task: ITask;
  tasks: ITask[];
  setTasks: SetterOrUpdater<ITask[]>;
}

const TaskView = ({ task, tasks, setTasks }: Props) => {
  const index = tasks.findIndex((listItem) => listItem === task);
  let { slug } = useParams();

  const handleDeleteTask = async () => {
    const newList = removeItemAtIndex(tasks, index);

    setTasks(newList);
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
    const newTaskList = replaceItemAtIndex(tasks, index, {
      ...task,
      isCompleted: !task.isCompleted,
    });
    setTasks(newTaskList);

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
      <StyledTaskContent task={task}>
        <h1>
          <span> Task:</span> {task.taskName}
        </h1>

        <h2>
          <span>Additional description:</span> {task.optionalInfo}
        </h2>
        <p>
          <span>Deadline:</span> {task.deadline}
        </p>
      </StyledTaskContent>
      <StyledBtnContainer>
        <DeleteSubmitBtn onClick={handleDeleteTask}>X</DeleteSubmitBtn>
        <CompleteSubmitBtn onClick={handleCompleteTask}>✓</CompleteSubmitBtn>
      </StyledBtnContainer>
    </StyledTask>
  );
};

export default TaskView;

function replaceItemAtIndex(arr: ITask[], index: number, newValue: ITask) {
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
}

function removeItemAtIndex(arr: ITask[], index: number) {
  return [...arr.slice(0, index), ...arr.slice(index + 1)];
}
