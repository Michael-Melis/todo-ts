import { FC } from "react";
import ListDetail from "./components/createList/todoList/ListDetail";
import CreateList from "./components/createList/CreateList";
import { Routes, Route } from "react-router-dom";

const App: FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<CreateList />} />
        <Route path="/:id" element={<ListDetail />} />
      </Routes>
    </>
  );
};

export default App;
