import { FC, useEffect } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { nanoid } from "nanoid";
import { Link, useNavigate } from "react-router-dom";
import { IList } from "../../interfaces/Interfaces";
import { useRecoilState } from "recoil";
import axios from "axios";
import { listArrayState } from "./../../atoms/atom";
import {
  StyledListContainer,
  StyledListForm,
  StyledLists,
  StyledLink,
} from "./CreateList.styles";
import {
  DeleteSubmitBtn,
  StyledSubmitBtn,
  StyledTextField,
} from "../../styles/GlobalStyles";
import { api } from "../../api/url";

const schema = yup.object().shape({
  listName: yup.string().required("Please fill the name of the list"),
});

const CreateList: FC = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<IList>({ resolver: yupResolver(schema) });
  const navigate = useNavigate();
  const [listArray, setListArray] = useRecoilState(listArrayState);

  useEffect(() => {
    const fectchApi = async () => {
      try {
        const res = await axios.get<IList[]>(api);
        setListArray(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fectchApi();
  }, []);

  const onSubmit: SubmitHandler<IList> = async (data) => {
    const postReq = async () => {
      try {
        const res = await axios.post<IList>(
          api,

          { listName: data.listName, listId: nanoid(), tasks: [] }
        );
        console.log(res.data);
        setListArray([...listArray, res.data]);
        navigate(`/${res.data.id}`);
      } catch (error) {
        console.log(error);
      }
    };
    postReq();
    reset();
  };
  const handleDeleteTodoList = async (list: IList) => {
    try {
      const res = await axios.delete<IList>(`${api}/${list.id}`);
      const newArray = listArray.filter((task) => {
        return task.listId !== res.data.listId;
      });
      setListArray(newArray);
    } catch (error) {
      console.log(error);
    }
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
              <StyledTextField
                {...field}
                autoComplete="off"
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
        {listArray
          ? listArray.map((list: IList, index: number) => {
              return (
                <StyledLink key={index}>
                  <Link to={`/${list.id}`}>{list.listName}</Link>

                  <DeleteSubmitBtn onClick={() => handleDeleteTodoList(list)}>
                    X
                  </DeleteSubmitBtn>
                </StyledLink>
              );
            })
          : "loading..."}
      </StyledLists>
    </StyledListContainer>
  );
};

export default CreateList;
