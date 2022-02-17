import styled from "@emotion/styled";
import { useState, ChangeEvent } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { taskArrayState, todoListFilterState } from "../../../../atoms/atom";
import { Select, MenuItem, TextField } from "@mui/material";

const TaskFilter = () => {
  const [filter, setFilter] = useRecoilState(todoListFilterState);
  const taskArray = useRecoilValue(taskArrayState);
  const [search, setSearch] = useState();
  const updateFilter = ({ target: { value } }) => {
    setFilter(value);
  };
  const [tasksArray, setTasksArray] = useRecoilState(taskArrayState);
  const searchArray = (e: ChangeEvent<HTMLInputElement>): void => {
    const input = e.target.value;
    setTasksArray(taskArray.filter((obj) => obj.taskName.includes(input)));
  };
  return (
    <>
      <StyledSelect
        value={filter}
        label="Filter option"
        onChange={updateFilter}
      >
        <MenuItem value="Show All">All</MenuItem>
        <MenuItem value="Show Completed">Completed</MenuItem>
        <MenuItem value="Show Uncompleted">Uncompleted</MenuItem>
      </StyledSelect>
      <TextField onChange={searchArray} label="Search yout tasks" />
    </>
  );
};

const StyledSelect = styled(Select)`
  background: grey;
`;

export default TaskFilter;
