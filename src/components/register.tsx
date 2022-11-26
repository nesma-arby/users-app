import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import "../styles/register.scss";
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const Register = () => {


  const [name, setName] = useState("");
  const [mail, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [text,setText] = useState('');
  const [error,setError] = useState('');

  // send post method
  const handleSubmit = (props:any) =>{

    setText('');
    setError('');

    if(name === '' || mail === '' || password === ''){

      setError('Please Enter All Data ');
      return ; 

    } 

      axios.post('http://localhost:3000/users',{
        id:uuidv4().slice(0,8),
        name,
        mail,
        password
      }).then((response) => {
         console.log(response);
         if(response.status === 201){
           setText('Thanks for registeration');
           setTimeout(()=>{
            clearForm()
           },1000)
         }
      }, (error) => {
           console.log(error);
     });


  }


  const clearForm = () =>{
    setName('');
    setEmail('');
    setPassword('');
    setText('')
  }

  return (
    <div className="formContainer">

      <Form className="registerForm">

      <p style={{color:'red'}}>{error}</p>

      <p style={{color:'green'}}>{text}</p>

        <Form.Group className="mb-3">
          <Form.Label className="label">User Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="label">Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={mail}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="label">Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name={password}
            onChange={(e) => setPassword(e.target.value)}
            required

          />
        </Form.Group>

        <Button variant="primary" type="button" onClick={handleSubmit}>
          Sign Up
        </Button>


        <Link className="link" to="/login">
          Back to Login
        </Link>
      </Form>
    </div>
  );
};

Register.propTypes = {};

export default Register;
