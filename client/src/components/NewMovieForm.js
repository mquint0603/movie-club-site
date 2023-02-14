import React, { useState } from "react";

function NewMovieForm() {
  const [data, setData] = useState({
    title: "",
    year: "",
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
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={data.title}
            onChange={(e) => updateForm({ title: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="year">Year</label>
          <input
            type="text"
            className="form-control"
            id="year"
            value={data.year}
            onChange={(e) => updateForm({ year: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="director">Director</label>
          <input
            type="text"
            className="form-control"
            id="director"
            value={data.director}
            onChange={(e) => updateForm({ director: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="title">Picker</label>
          <input
            type="text"
            className="form-control"
            id="picker"
            value={data.picker}
            onChange={(e) => updateForm({ picker: e.target.value })}
          />
        </div>
        <div className="form-group mt-3">
          <input
            type="submit"
            value="Add movie"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}
export default NewMovieForm;
