import React, { FC, useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, TextField } from "@mui/material";
import { nanoid } from "nanoid";
import { Link } from "react-router-dom";

const schema = yup.object().shape({
  listName: yup.string().required("Please fill the name of the list"),
});

interface IFormInput {
  listName: string;
  id: string;
}

const CreateList: FC = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<IFormInput>({ resolver: yupResolver(schema) });

  const [listArray, setListArray] = useState<IFormInput[]>([]);

  const onSubmit: SubmitHandler<IFormInput> = (data): void => {
    const newList = {
      listName: data.listName,
      id: nanoid(),
    };
    setListArray([...listArray, newList]);

    reset();
  };
  console.log(listArray);
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
            <Link to={`/todolist/${list.id}`} key={list.id}>
              {list.listName}
            </Link>
          );
        })}
      </ul>
    </div>
  );
};

export default CreateList;
