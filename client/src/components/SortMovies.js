import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import movieFields from "../constants/movieFields";

function SortMovies({ setSort, sort }) {
  function onChange(e) {
    setSort(e.target.value);
  }
  return (
    <div className="d-flex">
      <div>Sort by: </div>
      <Form.Select value={sort} onChange={onChange}>
        {movieFields.map((field) => (
          <option key={field.name} value={field.name}>
            {field.display}
          </option>
        ))}
      </Form.Select>
    </div>
  );
}

export default SortMovies;
