import React from "react";
 
// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";
 
// We import all the components we need in our app
import Navbar from "./components/navbar";
import MemberList from "./components/MemberList";
import MovieList from "./components/MovieList";
 
const App = () => {
 return (
   <div>
     <Navbar />
     <Routes>
     <Route exact path="/" element={<MovieList />} />
       <Route path="/members" element={<MemberList />} />
       <Route path="/movies" element={<MovieList />} />
     </Routes>
   </div>
 );
};
 
export default App;