import React, { FC, useEffect, useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, TextField } from "@mui/material";
import { nanoid } from "nanoid";
import { Link } from "react-router-dom";
import { IFormInput } from "../../interfaces/Interfaces";
import { useRecoilState } from "recoil";
import axios from "axios";
import { listArrayState } from "./../../atoms/atom";

const schema = yup.object().shape({
  listName: yup.string().required("Please fill the name of the list"),
});

const CreateList: FC = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<IFormInput>({ resolver: yupResolver(schema) });

  const [listArray, setListArray] = useRecoilState(listArrayState);

  useEffect(() => {
    const fectchApi = async () => {
      try {
        const res = await axios.get(
          `https://620bd0cce8751b8b5facfda6.mockapi.io/todoapp`
        );
        setListArray(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fectchApi();
  }, []);

  console.log(listArray);
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const nanodId = nanoid();
    const newList = {
      listName: data.listName,
      id: nanodId,
    };
    setListArray([...listArray, newList]);

    try {
      await axios.post(`https://620bd0cce8751b8b5facfda6.mockapi.io/todoapp`, {
        listName: data.listName,
        id: nanodId,
        isCompleted: false,
        isDeleted: false,
        tasks: [],
      });
    } catch (error) {
      console.log(error);
    }

    reset();
  };
  const handleDeleteTodoList = (listNameToDelete: string): void => {
    setListArray(
      listArray.filter((task) => {
        return task.listName !== listNameToDelete;
      })
    );
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="listName"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Todo list name"
              type="text"
              error={!!errors.listName}
              helperText={errors ? errors.listName?.message : ""}
            />
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
      <ul>
        {listArray.map((list: IFormInput) => {
          return (
            <li key={list.id}>
              <Link to={`/todolist/${list.id}`}>{list.listName}</Link>
              <Button onClick={() => handleDeleteTodoList(list.listName)}>
                X
              </Button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CreateList;
