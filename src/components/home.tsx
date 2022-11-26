import React, { useEffect, useRef, useState } from "react";
import PropTypes from 'prop-types';
import axios from 'axios';
import'../styles/home.scss';
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";


const Home = () => {

    const [users,setUsers] = useState<any[]>([]);
    const [disabledState,setDisabledState] = useState(true)


    const [name, setName] = useState("");
    const [mail, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [id, setId] = useState("");

    interface IUser {
      id:string ;
      name:string ;
      mail:string ;
      password:string
    }


    const getAllUsers = () =>{
        axios.get('http://localhost:3000/users').then((response) => {
            setUsers([...users, ...response.data])
          }, (error) => {
            console.log(error);
          });
    }

     const handleDelete = async(userId:any) =>{

      await axios.delete(`http://localhost:3000/users/${userId}`)

       const result = users.filter(user => user.id !== userId);
       console.log(result)
       setUsers(result)
    }

    const handleSelect = (userData:IUser) =>{
        setName(userData?.name);
        setEmail(userData?.mail);
        setPassword(userData?.password);
        setId(userData?.id);
        setDisabledState(false);
     }


    useEffect(()=>{
    getAllUsers();
    },[])


    const handleSaveEdit = async(userId:any) =>{

      setDisabledState(true);

      await axios.put(`http://localhost:3000/users/${userId}`, {
        id:userId,
        name,
        mail,
        password
    });

    const index:number = users.findIndex(object => {
      return object.id === userId;
    });

    users[index] ={id:userId,name:name , mail:mail,password:password}

    setUsers([...users]);

    clearForm()


    }

    const clearForm = () =>{
      setName('');
      setEmail('');
      setPassword('');
    }

    return (
        <div className="wrapper">
           
            <ul>
            <h3 className="title">All users</h3>
              {users?.map(user => (
               <li key={user.id} >

                <div  onClick={()=>handleSelect(user)}>{user.name}</div>
                
                <Button variant="danger" type="button" 
                        onClick={()=> handleDelete(user.id)}>
                   Delete
                </Button>

               
               </li>
            ))}
            </ul>
            
     {/* **************************************************************** */}


            <Form className="updateForm"> 

            <h4 className="title">Update User</h4>


            <Form.Group className="mb-3">
            <Form.Label className="label">User Name</Form.Label>
            <Form.Control
            type="text"
            value={name}
            onChange={e =>setName(e.target.value)}

            />
            </Form.Group>

            <Form.Group className="mb-3">
            <Form.Label className="label">Email address</Form.Label>
            <Form.Control
            type="email"
            value={mail}
            onChange={(e) => setEmail(e.target.value)}
            />
            </Form.Group>

            <Form.Group className="mb-3">
            <Form.Label className="label">Password</Form.Label>
            <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
            </Form.Group>

            <Button variant="primary" type="button" disabled={disabledState}
            onClick={()=>handleSaveEdit(id)}>
              Save
            </Button>


            </Form>

 
   
        </div>
    );
};

Home.propTypes = {
    
};

export default Home;