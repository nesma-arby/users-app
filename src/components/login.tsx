
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../styles/login.scss';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const Login = (props: any) => {

  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('')
  const navigate = useNavigate();

     

  const checkUserExist = (users: any[]) => {

    const returendUser = users.filter(u => (u.name === name) && (u.password === password));

    if (returendUser.length > 0) {

      localStorage.setItem('username', name)
      localStorage.setItem("authenticated", 'true');

      navigate("/");
    }
    else {
      setErrorMsg('sorry , username or password is not correct')
    }

  }

  const handleLogin = () => {

    setErrorMsg('');

    if (name === '' || password === '') {
      setErrorMsg('please fill all fields');
      return;
    }

    axios.get('http://localhost:3000/users').then((response) => {
      console.log(response);
      checkUserExist(response.data);

    }, (error) => {
      console.log(error);
    });

  }


 



  if (localStorage.getItem("authenticated")) { return (<Navigate replace to="/" />) }
  else {
    return (

      <div className='formContainer'>

        <Form className='loginForm'>

          <p style={{ color: 'red' , textAlign:'center' }}>{errorMsg}</p>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className='label'>{t('userName')}</Form.Label>
            <Form.Control type="text"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className='label'>{t('password')}</Form.Label>
            <Form.Control type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="button" onClick={handleLogin}>
           {t('signIn')}
          </Button>

          <Link className='link' to="/register">{t('registerAccount')}</Link>

        </Form>



      </div>

    );
  }

};

Login.propTypes = {

};

export default Login;