import React, { useState } from "react";
import movieFields from "../constants/movieFields";
import { addNewMovie } from "../api/movies";

const startingState = {
    title: "",
    year: "",
    director: "",
    genre: "",
    rating: "",
    picker: "",
    awards: "",
  }

function EditMovieForm() {
  const [data, setData] = useState(startingState);

  async function onSubmit(e) {
    e.preventDefault();
    const newMovie = { ...data };

    addNewMovie(newMovie)
      .then(() => {
        setData(startingState);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function updateForm(value) {
    const newData = { ...data, ...value };
    setData(newData);
  }

  return (
    <div>
      <h3>Edit movie</h3>
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
export default EditMovieForm;
