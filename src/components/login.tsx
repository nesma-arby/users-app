
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import'../styles/login.scss';
import { Link } from 'react-router-dom';

const Login = () => {

    const [name,setName]= useState('');
    const [email,setEmail] = useState('');

    return (

<div className='formContainer'> 

        <Form className='loginForm'>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label className='label'>User Name</Form.Label>
          <Form.Control type="text" placeholder="Enter name" />
        </Form.Group>
  
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label className='label'>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
     
        <Button variant="primary" type="submit">
          Submit
        </Button>

        <Link className='link' to="/register">Register Account</Link>

      </Form>



</div>
    );
};

Login.propTypes = {
    
};

export default Login;