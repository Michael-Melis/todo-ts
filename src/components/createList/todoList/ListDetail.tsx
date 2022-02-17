import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LocalizationProvider } from "@mui/lab";
import DateAdapter from "@mui/lab/AdapterDayjs";
import { taskArrayState } from "../../../atoms/atom";
import { useRecoilState } from "recoil";
import { IList, ITask } from "./../../../interfaces/Interfaces";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { nanoid } from "nanoid";
import axios from "axios";
import TaskView from "./task/TaskView";
import { StyledListDetailContainer } from "./ListDetail.styles";
import TaskFilter from "./filter/TaskFilter";
import { StyledSubmitBtn, StyledTextField } from "../../../styles/GlobalStyles";

import { api } from "./../../../api/url";

const taskSchema = yup.object().shape({
  taskName: yup.string().required("Please fill the name of the task"),
  deadline: yup.string().required("Please fill thedeadline"),
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

  const [tasks, setTasks] = useRecoilState(taskArrayState);

  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("Show All");
  const [filteredTasks, setFilteredTasks] = useState<ITask[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get<IList>(`${api}/${id}`);

        const tasksData = res.data.tasks;

        setTasks(tasksData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTasks();
  }, []);

  useEffect(() => {
    const filteredTasks = tasks.filter((obj) => {
      switch (filter) {
        case "Show Completed":
          return obj.taskName.includes(searchQuery) && obj.isCompleted;
        case "Show Uncompleted":
          return obj.taskName.includes(searchQuery) && !obj.isCompleted;
        default:
          return obj.taskName.includes(searchQuery) && obj;
      }
    });
    setFilteredTasks(filteredTasks);
  }, [searchQuery, filter, tasks]);

  const onSubmit: SubmitHandler<ITask> = async (data) => {
    const nanoId = nanoid();
    const newTask = {
      taskName: data.taskName,
      deadline: data.deadline,
      optionalInfo: data.optionalInfo,
      id: nanoId,
      isCompleted: false,
      isDeleted: false,
      listNameId: id,
    };
    setTasks([...tasks, newTask]);

    try {
      const res = await axios.put<ITask[]>(`${api}/${id}`, {
        tasks: [...tasks, newTask],
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }

    reset();
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <StyledListDetailContainer>
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
            defaultValue=""
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
                type="datetime-local"
                error={!!errors.deadline}
                helperText={errors ? errors.deadline?.message : ""}
              />
            )}
          />

          <StyledSubmitBtn type="submit">submit</StyledSubmitBtn>

          <TaskFilter
            setSearchQuery={setSearchQuery}
            filter={filter}
            setFilter={setFilter}
          />
        </StyledListDetailContainer>
      </form>

      {(filteredTasks.length === 0 ? tasks : filteredTasks).map(
        (task: ITask) => (
          <TaskView
            key={task.id}
            task={task}
            tasks={tasks}
            setTasks={setTasks}
          />
        )
      )}
    </div>
  );
};

export default ListDetail;
