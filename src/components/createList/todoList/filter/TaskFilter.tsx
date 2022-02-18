import { ChangeEvent } from "react";
import { MenuItem } from "@mui/material";
import { StyledFilterContainer } from "./TaskFilter.styles";

import {
  StyledTextField,
  StyledSelect,
} from "./../../../../styles/GlobalStyles";

interface Props {
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
  filter: string;
}

const TaskFilter = ({ setSearchQuery, setFilter, filter }: Props) => {
  const updateFilter = ({ target: { value } }) => {
    setFilter(value);
  };

  const searchArray = (e: ChangeEvent<HTMLInputElement>): void => {
    const input = e.target.value;
    setSearchQuery(input);
  };

  return (
    <StyledFilterContainer>
      <StyledSelect value={filter} onChange={updateFilter}>
        <MenuItem value="Show All">All</MenuItem>
        <MenuItem value="Show Completed">Completed</MenuItem>
        <MenuItem value="Show Uncompleted">Uncompleted</MenuItem>
      </StyledSelect>
      <StyledTextField onChange={searchArray} label="Search your tasks" />
    </StyledFilterContainer>
  );
};

export default TaskFilter;
