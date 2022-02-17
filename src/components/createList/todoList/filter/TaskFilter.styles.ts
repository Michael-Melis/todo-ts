import styled from "styled-components";
import { Select, TextField } from "@mui/material";
export const StyledFilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  margin: 2rem auto;
`;
export const StyledSelect = styled(Select)`
  background: #dddada;
`;
export const StyledTextField = styled(TextField)`
  background: #dddada;
  margin: 1rem 0;
`;
