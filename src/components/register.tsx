import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import "../styles/register.scss";
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { Navigate } from "react-router-dom";

const Register = () => {


  const [name, setName] = useState("");
  const [mail, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [text,setText] = useState('');

  // send post method
  const handleSubmit = (props:any) =>{

    setText('')

    axios.post('http://localhost:3000/users',{
      id:uuidv4().slice(0,8),
      name,
      mail,
      password
    }).then((response) => {
       console.log(response);
       if(response.status === 201){
         setText('Thanks for registeration')
       }
    }, (error) => {
  console.log(error);
   });

  }


  return (
    <div className="formContainer">
      <Form className="registerForm">


        <p>{text}</p>

        <Form.Group className="mb-3">
          <Form.Label className="label">User Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="label">Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={mail}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="label">Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="button" onClick={handleSubmit}>
          Save
        </Button>

        <Link className="link" to="/">
          Back to Login
        </Link>
      </Form>
    </div>
  );
};

Register.propTypes = {};

export default Register;
