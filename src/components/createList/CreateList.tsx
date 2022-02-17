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
import styled from "styled-components";

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

    setListArray([...listArray, newList]);
    const fectchApi = async () => {
      try {
        await axios.post(
          `https://620bd0cce8751b8b5facfda6.mockapi.io/todoapp/`,

          { listName: data.listName, listId: listId, tasks: [] }
        );
      } catch (error) {
        console.log(error);
      }
    };
    fectchApi();

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
          <Button type="submit">Submit</Button>
        </StyledListForm>
      </form>
      <StyledLists>
        {listArray.map((list: IFormInput, index: number) => {
          return (
            <StyledLink key={index}>
              <Link to={`/${list.id}`}>{list.listName}</Link>

              <Button onClick={() => handleDeleteTodoList(list)}>delete</Button>
            </StyledLink>
          );
        })}
      </StyledLists>
    </StyledListContainer>
  );
};

const StyledListContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const StyledListForm = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  margin: 0 auto;
`;
const StyledLists = styled.div`
  display: flex;
  flex-direction: column;
  background: #252525;
  padding: 3rem;
  width: 50%;
  margin: 0 auto;
`;
const StyledLink = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background: #252525;
  width: 50%;
  margin: 0 auto;
  a {
    color: #fff;
    text-decoration: none;
  }
  a:hover {
    color: red;
  }
`;

export default CreateList;
