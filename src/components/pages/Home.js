import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Drop from '../pages/Drop'
import { useHistory, } from "react-router-dom";
import { Alert } from "rsuite";

function refreshPage() {
  window.location.reload(false);
}

const Home = () => {
  const [users, setUser] = useState([]);
  // const {id } = useParams();
  let history = useHistory();

  useEffect(() => {
    loadUsers();
  }, []);


  const loadUsers = async () => {
    const result = await axios.get("http://localhost:3003/users");
    setUser(result.data);

  };

  const deleteUser = async id => {
   
   
    await axios.delete(`http://localhost:3003/users/${id}`);
  
    history.push("/");
    Alert.success('This is a successful message.', 4000);
    loadUsers();

  };


  return (
    <div>
      <Drop />
    <div className="container ptop1">
    
      <div className="py-4">
       
        
        <table class="table border shadow">
          <thead class="thead-dark" align="center">
            <tr>
              <th scope="col">S.No</th>
              <th scope="col">Name</th>
              <th scope="col">Position</th>
              <th scope="col">Qualification</th>
              <th scope="col">Age</th>
              <th >Action</th>
            </tr>
          </thead>
          <tbody align="center">
            {users.map((user, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.position}</td>
                <td>{user.qualification}</td>
                <td>{user.age}</td>
                <td>
                  <Link class="btn btn-primary mr-2" to={`/users/${user.id}`}
                  data-bs-toggle="tooltip" data-bs-placement="top" title="View">
                  
                    <i class="fa fa-eye"></i>
                  </Link>
                  <Link
                    class="btn btn-outline-primary mr-2"
                    to={`/users/edit/${user.id}`}
                    data-bs-toggle="tooltip" data-bs-placement="top" title="Edit"
                  >
                    
                    <i class="fa fa-edit"></i>
                  </Link>
                  <Link
                    class="btn btn-danger"
                    onClick={() =>{ deleteUser(user.id); refreshPage(); }}
                    data-bs-toggle="tooltip" data-bs-placement="top" title="Delete Field"
                  >
                   
                    <i class="fa fa-trash"></i>
                  </Link>
                
 
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>

  </div>

   
  );
};

export default Home;
