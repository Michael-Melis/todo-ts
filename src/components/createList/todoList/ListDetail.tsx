import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { TextField, Button, TextareaAutosize } from "@mui/material";
import { listArrayState, taskArrayState } from "../../../atoms/atom";
import { useRecoilValue, useRecoilState } from "recoil";
import { ITask } from "./../../../interfaces/Interfaces";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { nanoid } from "nanoid";
import axios from "axios";
import TaskView from "./task/TaskView";

const taskSchema = yup.object().shape({
  taskName: yup.string().required("Please fill the name of the task"),
  deadline: yup.number().required("Please fill the deadline"),
  optionalInfo: yup.string(),
});

const ListDetail = () => {
  let { id } = useParams();
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<ITask>({ resolver: yupResolver(taskSchema) });

  const [tasksArray, setTasksArray] = useRecoilState(taskArrayState);
  const onSubmit: SubmitHandler<ITask> = async (data) => {
    const nanoId = nanoid();
    const newTask = {
      taskName: data.taskName,
      deadline: data.deadline,
      optionalInfo: data.optionalInfo,
      id: nanoId,
      isCompleted: false,
      isSoftDeleted: false,
    };
    setTasksArray([...tasksArray, newTask]);
    try {
      const res = await axios.get(
        `https://620bd0cce8751b8b5facfda6.mockapi.io/todoapp/:listName`
      );
      console.log(res);

      // {

      //   tasks: [
      //     {
      //       taskName: data.taskName,
      //       deadline: data.deadline,
      //       id: nanoId,
      //       isCompleted: false,
      //       isDeleted: false,
      //       tasks: [],
      //     },
      //   ],
      // }
    } catch (error) {
      console.log(error);
    }
    reset();
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="taskName"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
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
          defaultValue=""
          render={({ field }) => <TextareaAutosize {...field} minRows={3} />}
        />
        <Controller
          name="deadline"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Deadline (in days)"
              type="text"
              error={!!errors.deadline}
              helperText={errors ? errors.deadline?.message : ""}
            />
          )}
        />
        <Button type="submit">submit</Button>
      </form>
      {tasksArray.map((task: ITask) => (
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
