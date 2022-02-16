import React, { FC } from "react";
import ListDetail from "./components/createList/todoList/ListDetail";
import CreateList from "./components/createList/CreateList";
import { Routes, Route } from "react-router-dom";
import styled from "@emotion/styled";

const App: FC = () => {
  return (
    <StyledApp>
      <Routes>
        <Route path="/" element={<CreateList />} />
        <Route path="/:slug" element={<ListDetail />} />
      </Routes>
    </StyledApp>
  );
};
const StyledApp = styled.div`
  margin: 0;
  padding: 0;
  box-sizing: border-box;
`;
export default App;
