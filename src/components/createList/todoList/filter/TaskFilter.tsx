import { ChangeEvent } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { taskArrayState, todoListFilterState } from "../../../../atoms/atom";
import { MenuItem } from "@mui/material";
import {
  StyledFilterContainer,
  StyledSelect,
  StyledTextField,
} from "./TaskFilter.styles";

const TaskFilter = () => {
  const [filter, setFilter] = useRecoilState(todoListFilterState);

  const updateFilter = ({ target: { value } }) => {
    setFilter(value);
  };
  const [tasks, setTasks] = useRecoilState(taskArrayState);

  const searchArray = (e: ChangeEvent<HTMLInputElement>): void => {
    const input = e.target.value;
    setTasks(tasks.filter((obj) => obj.taskName.includes(input)));
  };
  return (
    <StyledFilterContainer>
      <StyledSelect value={filter} label="age" onChange={updateFilter}>
        <MenuItem value="Show All">All</MenuItem>
        <MenuItem value="Show Completed">Completed</MenuItem>
        <MenuItem value="Show Uncompleted">Uncompleted</MenuItem>
      </StyledSelect>
      <StyledTextField onChange={searchArray} label="Search your tasks" />
    </StyledFilterContainer>
  );
};

export default TaskFilter;
