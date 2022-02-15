import React, { FC } from "react";
import ListDetail from "./components/createList/todoList/ListDetail";
import CreateList from "./components/createList/CreateList";
import { Routes, Route } from "react-router-dom";

const App: FC = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<CreateList />} />
        <Route path="/todolist/:id" element={<ListDetail />} />
      </Routes>
    </div>
  );
};

export default App;
