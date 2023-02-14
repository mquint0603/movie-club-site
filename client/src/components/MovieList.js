import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AddMovie from "./AddMovie";
 
const Record = (props) => (
 <tr>
   <td>{props.record.title}</td>
   <td>{props.record.year}</td>
   <td>{props.record.director}</td>
   <td>{props.record.picker}</td>
   <td>
     <Link className="btn btn-link" to={`/edit/${props.record._id}`}>Edit</Link> |
     <button className="btn btn-link"
       onClick={() => {
         props.deleteRecord(props.record._id);
       }}
     >
       Delete
     </button>
   </td>
 </tr>
);
 
function MovieList() {
 const [records, setRecords] = useState([]);
 const [showAdd, setShowAdd] = useState(false);
 
 // This method fetches the records from the database.
 useEffect(() => {
   async function getRecords() {
     const response = await fetch(`http://localhost:3001/movies/`);
 
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
 }, []);
 
 // This method will delete a record
 async function deleteRecord(id) {
   await fetch(`http://localhost:3001/${id}`, {
     method: "DELETE"
   });
 
   const newRecords = records.filter((el) => el._id !== id);
   setRecords(newRecords);
 }
 
 // This method will map out the records on the table
 function recordList() {
   return records.map((record) => {
     return (
       <Record
         record={record}
         deleteRecord={() => deleteRecord(record._id)}
         key={record._id}
       />
     );
   });
 }
 
 // This following section will display the table with the records of individuals.
 return (
   <div className="p-3">
     <h3>Movies</h3>
     <button className="my-3" onClick={()=>setShowAdd(!showAdd)}>{showAdd ? "Done" : "Add Movie"}</button>
      {showAdd ? <AddMovie /> : null}
     <table className="table table-striped" style={{ marginTop: 20 }}>
       <thead>
         <tr>
           <th>Title</th>
           <th>Position</th>
           <th>Level</th>
           <th>Action</th>
         </tr>
       </thead>
       <tbody>{recordList()}</tbody>
     </table>
   </div>
 );
}
export default MovieList;