import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, TextareaAutosize } from "@mui/material";
import { LocalizationProvider } from "@mui/lab";
import DateAdapter from "@mui/lab/AdapterDayjs";
import { filteredTodoListState, taskArrayState } from "../../../atoms/atom";
import { useRecoilValue, useRecoilState } from "recoil";
import { ITask } from "./../../../interfaces/Interfaces";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { nanoid } from "nanoid";
import axios from "axios";
import TaskView from "./task/TaskView";
import {
  StyledListDetailContainer,
  StyledTextareaAutosize,
  StyledTextField,
} from "./ListDetail.styles";
import TaskFilter from "./filter/TaskFilter";
import { StyledSubmitBtn } from "../../../styles/GlobalStyles";

const taskSchema = yup.object().shape({
  taskName: yup.string().required("Please fill the name of the task"),
  deadline: yup.string().required("Please fill thedeadline"),
  optionalInfo: yup.string(),
});

const ListDetail = () => {
  let { slug } = useParams();
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<ITask>({ resolver: yupResolver(taskSchema) });

  const [tasksArray, setTasksArray] = useRecoilState(taskArrayState);
  const filteredTaskArray = useRecoilValue(filteredTodoListState);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get(
          `https://620bd0cce8751b8b5facfda6.mockapi.io/todoapp/${slug}`
        );

        const tasksData = res.data.tasks.map((data) => {
          return data;
        });

        setTasksArray(tasksData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTasks();
  }, []);

  const onSubmit: SubmitHandler<ITask> = async (data) => {
    const nanoId = nanoid();
    const newTask = {
      taskName: data.taskName,
      deadline: data.deadline,
      optionalInfo: data.optionalInfo,
      id: nanoId,
      isCompleted: false,
      isDeleted: false,
      listNameId: slug,
    };
    setTasksArray([...tasksArray, newTask]);

    try {
      await axios.put(
        `https://620bd0cce8751b8b5facfda6.mockapi.io/todoapp/${slug}`,
        { tasks: [...tasksArray, newTask] }
      );
    } catch (error) {
      console.log(error);
    }

    reset();
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <StyledListDetailContainer>
          <LocalizationProvider dateAdapter={DateAdapter}>
            <Controller
              name="taskName"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <StyledTextField
                  {...field}
                  label="New task"
                  type="text"
                  error={!!errors.taskName}
                  helperText={errors ? errors.taskName?.message : ""}
                />
              )}
            />
            <Controller
              name="optionalInfo"
              control={control}
              render={({ field }) => (
                <StyledTextField
                  {...field}
                  label="Additional description of the task"
                  multiline
                  type="text"
                />
              )}
            />
            <Controller
              name="deadline"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <StyledTextField
                  {...field}
                  id="datetime-local"
                  type="datetime-local"
                  error={!!errors.deadline}
                  helperText={errors ? errors.deadline?.message : ""}
                />
              )}
            />

            <StyledSubmitBtn type="submit">submit</StyledSubmitBtn>
          </LocalizationProvider>
          <TaskFilter />
        </StyledListDetailContainer>
      </form>

      {filteredTaskArray.map((task: ITask) => (
        <TaskView
          key={task.id}
          task={task}
          tasksArray={tasksArray}
          setTasksArray={setTasksArray}
        />
      ))}
    </div>
  );
};

export default ListDetail;
