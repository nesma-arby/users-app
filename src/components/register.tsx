import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import '../styles/register.scss';

const Register = () => {
    return (
        <div  className='formContainer'>
            
   <Form className='registerForm'>

   <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label className='label'>User Name</Form.Label>
          <Form.Control type="text" placeholder="Enter name" />
    </Form.Group>
  

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label className='label'>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label className='label'>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>


      <Button variant="primary" type="submit">
        Save
      </Button>

      <Link className='link' to="/">Back to Login</Link>


    </Form>

        </div>
    );
};

Register.propTypes = {
    
};

export default Register;