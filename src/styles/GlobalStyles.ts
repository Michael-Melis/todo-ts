import styled, { createGlobalStyle } from "styled-components";
import { Button, Select, TextField } from "@mui/material";

const GlobalStyle = createGlobalStyle`
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body{
   background: #E8E8E8;
    font-family: monospace;    
}
`;
export default GlobalStyle;

export const StyledSubmitBtn = styled(Button)`
  background: #252525;
  color: #049172;
  transition: all 300ms ease-in-out;

  &:hover {
    background: #049172;
    color: #252525;
  }
`;
export const DeleteSubmitBtn = styled(Button)`
  background: #8b0000;
  color: #fff;
  transition: all 300ms ease-in-out;
  margin: 1rem;
  padding: 0.4rem 1rem;

  &:hover {
    background: #fff;
    color: #8b0000;
  }
`;
export const CompleteSubmitBtn = styled(Button)`
  background: #008000;
  color: #fff;
  transition: all 300ms ease-in-out;
  margin: 1rem;
  padding: 0.4rem 1rem;

  &:hover {
    background: #fff;
    color: #008000;
  }
`;

export const StyledTextField = styled(TextField)`
  margin: 0.5rem 0;
  & .MuiOutlinedInput-notchedOutline {
    border-color: #252525;
  }
  & .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
    border-color: #049172;
  }
`;
export const StyledSelect = styled(Select)`
  & .MuiOutlinedInput-notchedOutline {
    border-color: #252525;
  }
`;
