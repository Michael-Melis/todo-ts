import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { TextField, Button, TextareaAutosize } from "@mui/material";
import { LocalizationProvider } from "@mui/lab";
import DateAdapter from "@mui/lab/AdapterDayjs";
import {
  filteredTodoListState,
  listArrayState,
  taskArrayState,
} from "../../../atoms/atom";
import { useRecoilValue, useRecoilState } from "recoil";
import { ITask } from "./../../../interfaces/Interfaces";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { nanoid } from "nanoid";
import axios from "axios";
import TaskView from "./task/TaskView";
import styled from "styled-components";
import TaskFilter from "./filter/TaskFilter";

const taskSchema = yup.object().shape({
  taskName: yup.string().required("Please fill the name of the task"),
  deadline: yup.number().required("Please fill the deadline"),
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
                <TextareaAutosize {...field} minRows={4} />
              )}
            />
            <Controller
              name="deadline"
              control={control}
              defaultValue={0}
              render={({ field }) => (
                <StyledTextField
                  {...field}
                  label="Deadline in days"
                  type="number"
                  error={!!errors.deadline}
                  helperText={errors ? errors.deadline?.message : ""}
                />
              )}
            />

            <Button type="submit">submit</Button>
          </LocalizationProvider>
        </StyledListDetailContainer>
      </form>
      <TaskFilter />
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

const StyledListDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const StyledTextField = styled(TextField)`
  margin: 1rem 0;
`;

export default ListDetail;
