import { FC } from "react";
import ListDetail from "./components/createList/todoList/ListDetail";
import CreateList from "./components/createList/CreateList";
import { Routes, Route } from "react-router-dom";
import styled from "@emotion/styled";

const App: FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<CreateList />} />
        <Route path="/:slug" element={<ListDetail />} />
      </Routes>
    </>
  );
};

export default App;
