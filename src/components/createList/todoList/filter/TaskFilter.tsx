import styled from "@emotion/styled";
import { useRecoilState } from "recoil";
import { todoListFilterState } from "../../../../atoms/atom";
import { Select, MenuItem } from "@mui/material";

const TaskFilter = () => {
  const [filter, setFilter] = useRecoilState(todoListFilterState);
  const updateFilter = ({ target: { value } }) => {
    setFilter(value);
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
    </>
  );
};

const StyledSelect = styled(Select)`
  background: grey;
`;

export default TaskFilter;
