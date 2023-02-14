import React, { useState } from "react";
// import { useNavigate } from "react-router";

export default function NewMemberForm() {
  const [name, setName] = useState("");

  // These methods will update the state properties.
  function updateForm(value) {
    setName(value);
  }

  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();

    // When a post request is sent to the create url, we'll add a new record to the database.
    const newPerson = { name };

    await fetch("http://localhost:3001/members/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPerson),
    }).catch((error) => {
      window.alert(error);
      return;
    });

    setName("");
  }

  // This following section will display the form that takes the input from the user.
  return (
    <div>
      <h3>Add new member</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => updateForm(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Create person"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}
