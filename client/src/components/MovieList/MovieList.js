import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NewMovieForm from "../NewMovieForm";
import SortMovies from "../SortMovies";

const port = 3002;

function MovieList() {
  const [records, setRecords] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [sort, setSort] = useState('year')
  const [sortOrder, setSortOrder] = useState('asc')

  // This method fetches the records from the database.
  useEffect(() => {
    async function getRecords() {
      const response = await fetch(`http://localhost:${port}/movies/?sort=${sort}&sortOrder=${sortOrder}`);
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }
      const records = await response.json();
      setRecords(records);
    }

    getRecords();

    return;
  }, [sort, sortOrder]);

  // This method will delete a record
  async function deleteRecord(id) {
    await fetch(`http://localhost:${port}/movies/${id}`, {
      method: "DELETE",
    });

    const newRecords = records.filter((el) => el._id !== id);
    setRecords(newRecords);
  }

  // This following section will display the table with the records of individuals.
  return (
    <div className="p-3">
      <h3>Movies</h3>
      <button className="my-3" onClick={() => setShowAdd(!showAdd)}>
        {showAdd ? "Done" : "Add Movie"}
      </button>
      {showAdd ? <NewMovieForm /> : null}
      <SortMovies sort={sort} setSort={setSort}/>
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Year</th>
            <th>Genre</th>
            <th>Rating</th>
            <th>Director</th>
            <th>Who Picked</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => {
            return (
              <tr key={record._id}>
              <td>{record.title}</td>
              <td>{record.year}</td>
              <td>{record.genre}</td>
              <td>{record.rating}</td>
              <td>{record.director}</td>
              <td>{record.picker}</td>
              <td>
                <Link className="btn btn-link" to={`/edit/${record._id}`}>
                  Edit
                </Link>{" "}
                |
                <button
                  className="btn btn-link"
                  onClick={() => {
                    deleteRecord(record._id);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
export default MovieList;
