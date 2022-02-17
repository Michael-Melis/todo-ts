import styled, { createGlobalStyle } from "styled-components";
import { Button } from "@mui/material";

const GlobalStyle = createGlobalStyle`
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body{
    background: grey;
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
