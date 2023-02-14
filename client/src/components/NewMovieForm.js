import React, { useState } from "react";
import movieFields from "../constants/movieFields";

function NewMovieForm() {
  const [data, setData] = useState({
    title: "",
    year: "",
    genre: "",
    rating: "",
    director: "",
    picker: "",
  });

  async function onSubmit(e) {
    e.preventDefault();
    const newMovie = { ...data };

    await fetch("http://localhost:3001/movies/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMovie),
    }).catch((error) => {
      window.alert(error);
      return;
    });

    setData({ title: "", year: "", director: "", picker: "" });
  }

  function updateForm(value) {
    const newData = { ...data, ...value };
    setData(newData);
  }

  return (
    <div>
      <h3>Add new movie</h3>
      <form onSubmit={onSubmit}>
        {movieFields.map((field) => (
          <div className="form-group my-2" key={field.name}>
            <label htmlFor={field.name}>{field.display}</label>
            <input
              type="text"
              className="form-control"
              id="title"
              value={data[field.name]}
              onChange={(e) => updateForm({ [field.name]: e.target.value })}
            />
          </div>
        ))}

        <div className="form-group mt-3">
          <input type="submit" value="Add movie" className="btn btn-primary" />
        </div>
      </form>
    </div>
  );
}
export default NewMovieForm;
