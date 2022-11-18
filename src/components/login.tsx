
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import'../styles/login.scss';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Login = (props:any) => {

    const [name,setName]= useState('');
    const [password,setPassword] = useState('');
    const [errorMsg,setErrorMsg] = useState('')
    const navigate = useNavigate();

    const checkUserExist = (users:any[]) =>{
      console.log(name,password)

     const returendUser =  users.filter(u => (u.name === name) && (u.password === password));
     console.log(returendUser)

     if(returendUser.length > 0){
        navigate("/home");
       localStorage.setItem('username',name)
     }
     else{
      setErrorMsg('sorry , username or password is not correct')
     }

    }

    const handleLogin = () =>{

      setErrorMsg('');
        
      axios.get('http://localhost:3000/users').then((response) => {
        console.log(response);
        checkUserExist(response.data);
      
      }, (error) => {
        console.log(error);
      });

    }



    return (

<div className='formContainer'> 

        <Form className='loginForm'>

          <p style={{color:'red'}}>{errorMsg}</p>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label className='label'>User Name</Form.Label>
          <Form.Control type="text" placeholder="Enter name"
          value={name}
          onChange={e => setName(e.target.value)}
           />
        </Form.Group>
  
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label className='label'>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" 
                   value={password}
                   onChange={e => setPassword(e.target.value)}
          />
        </Form.Group>
     
        <Button variant="primary" type="button" onClick={handleLogin}>
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