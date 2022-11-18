import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import axios from 'axios';
import'../styles/home.scss';
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";


const Home = () => {

    const [users,setUsers] = useState<any[]>([])
    
    const [name, setName] = useState("");
    const [mail, setEmail] = useState("");
    const [password, setPassword] = useState("");


    let selectedUser = {id:'',name:'',mail:'',password:''} ;

    const getAllUsers = () =>{
        axios.get('http://localhost:3000/users').then((response) => {
            setUsers([...users, ...response.data])
          }, (error) => {
            console.log(error);
          });
    }

     const handleDelete = async(userId:any) =>{
       await axios.delete(`http://localhost:3000/users/${userId}`);
       const result = users.filter(user => user.id !== userId);
       console.log(result)
       setUsers(result)
    }

    const handleUpdate = (userData:{id:'',name:'',mail:'',password:''}) =>{
        selectedUser = userData;
        console.log(selectedUser)
     }


    useEffect(()=>{
    getAllUsers();
    },[])



    return (
        <div>
            <h3 className="title">All users</h3>
            <ul>
              {users?.map(user => (
               <li key={user.id} onClick={()=>handleUpdate(user)}>
                {user.name}
                <Button variant="danger" type="button" onClick={()=> handleDelete(user.id)}>
                   Delete
                </Button>
               
               </li>
            ))}
            </ul>
            
            <h4 className="title">Update User</h4>

            <Form className="">

            <Form.Group className="mb-3">
            <Form.Label className="label">User Name</Form.Label>
            <Form.Control
            type="text"
            value={selectedUser?.name}
            onChange={e =>setName(e.target.value)}

            />
            </Form.Group>

            <Form.Group className="mb-3">
            <Form.Label className="label">Email address</Form.Label>
            <Form.Control
            type="email"
            value={selectedUser?.mail}
            onChange={(e) => setEmail(e.target.value)}
            />
            </Form.Group>

            <Form.Group className="mb-3">
            <Form.Label className="label">Password</Form.Label>
            <Form.Control
            type="password"
            value={selectedUser?.password}
            onChange={(e) => setPassword(e.target.value)}
            />
            </Form.Group>

            <Button variant="primary" type="button" >
            Save
            </Button>


            </Form>

 
   
        </div>
    );
};

Home.propTypes = {
    
};

export default Home;