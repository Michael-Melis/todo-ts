import React from "react";
import { useParams } from "react-router-dom";
import { TextField } from "@mui/material";

const ListDetail = () => {
  let { id } = useParams();
  return (
    <div>
      <TextField placeholder="Task" />
      <TextField placeholder="Deadline" />
    </div>
  );
};

export default ListDetail;
