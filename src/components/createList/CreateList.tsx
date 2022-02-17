import { FC, useEffect } from "react";
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
import {
  StyledListContainer,
  StyledListForm,
  StyledLists,
  StyledLink,
} from "./CreateList.styles";
import { DeleteSubmitBtn, StyledSubmitBtn } from "../../styles/GlobalStyles";

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

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const listId = nanoid();
    const newList = {
      listName: data.listName,
      listId: listId,
      tasks: [],
    };

    const postReq = async () => {
      try {
        await axios.post(
          `https://620bd0cce8751b8b5facfda6.mockapi.io/todoapp/`,

          { listName: data.listName, listId: listId, tasks: [] }
        );
      } catch (error) {
        console.log(error);
      }
    };
    postReq();
    setListArray([...listArray, newList]);
    reset();
  };
  const handleDeleteTodoList = async (list: IFormInput) => {
    const newArray = listArray.filter((task) => {
      return task.listId !== list.listId;
    });

    try {
      await axios.delete(
        `https://620bd0cce8751b8b5facfda6.mockapi.io/todoapp/${list.id}`
      );
    } catch (error) {
      console.log(error);
    }

    setListArray(newArray);
  };

  return (
    <StyledListContainer>
      <h1>Create new todo list</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <StyledListForm>
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
          <StyledSubmitBtn type="submit">Submit</StyledSubmitBtn>
        </StyledListForm>
      </form>

      <StyledLists>
        {listArray.map((list: IFormInput, index: number) => {
          return (
            <StyledLink key={index}>
              <Link to={`/${list.id}`}>{list.listName}</Link>

              <DeleteSubmitBtn onClick={() => handleDeleteTodoList(list)}>
                X
              </DeleteSubmitBtn>
            </StyledLink>
          );
        })}
      </StyledLists>
    </StyledListContainer>
  );
};

export default CreateList;
