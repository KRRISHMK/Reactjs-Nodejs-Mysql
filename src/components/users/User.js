import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";


const User = () => {
  const [user, setUser] = useState({
    name: "",
   position: "",
   qualification: "",
   age: "",
  });
  const { id } = useParams();
  useEffect(() => {
    loadUser();
  },);
  const loadUser = async () => {
    const res = await axios.get(`http://localhost:3003/users/${id}`);
    setUser(res.data[0]);
    console.log(res.data[0]);
  };
  return (
    <div className="container py-4">
      <Link className="btn btn-primary" to="/">
        back to Home
      </Link>
      <h3 className="display-4">User Id: {id}</h3>
      <hr />
      <ul className="list-group w-50">
        <li className="list-group-item">Name: {user.name}</li>
        <li className="list-group-item">Position: {user.position}</li>
        <li className="list-group-item">Qualification: {user.qualification}</li>
        <li className="list-group-item">Age: {user.age}</li>
      </ul>
    </div>
  );
};

export default User;
