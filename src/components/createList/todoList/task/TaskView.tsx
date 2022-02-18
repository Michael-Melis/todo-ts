import { useParams } from "react-router-dom";
import { ITask } from "../../../../interfaces/Interfaces";
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
import { api } from "../../../../api/url";
import { monthNames, days } from "./../../../../models/calendar";

interface Props {
  task: ITask;
  tasks: ITask[];
  setTasks: SetterOrUpdater<ITask[]>;
}

const TaskView = ({ task, tasks, setTasks }: Props) => {
  const index = tasks.findIndex((listItem) => listItem === task);

  let { id } = useParams();

  const deadline = new Date(task.deadline);
  const showDeadline = `${days[deadline.getDay() - 1]} ${deadline.getDate()} ${
    monthNames[deadline.getMonth()]
  } ${deadline.getFullYear()} at ${deadline.getHours()}:${deadline.getMinutes()}`;

  const handleDeleteTask = async () => {
    const newList = removeItemAtIndex(tasks, index);
    setTasks(newList);
    try {
      await axios.put(`${api}/${id}`, {
        tasks: newList,
      });
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
      await axios.put(`${api}/${id}`, {
        tasks: newTaskList,
      });
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
          <span>Deadline:</span> {showDeadline}
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
