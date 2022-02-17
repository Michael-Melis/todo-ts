import styled from "styled-components";
import { TextareaAutosize, TextField } from "@mui/material";

export const StyledListDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  margin: 0 auto;
  text-align: center;
`;
export const StyledTextField = styled(TextField)`
  margin: 1rem 0;
  background: #dddada;
`;
export const StyledTextareaAutosize = styled(TextareaAutosize)`
  margin: 1rem 0;
  background: #dddada;
`;
