import React from 'react';
// import logo from './logo.svg';
import './App.scss';
// import { Button } from 'react-bootstrap';
import Header from './components/header';
import Login from './components/login';
import Register from './components/register';
import {BrowserRouter,Routes,Route,Link} from "react-router-dom";
import Home from './components/home';

function App() {
  return (
    <div className="App">
      <Header />
      <BrowserRouter>
      <div>

        {/* <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
        </ul> */}

        <Routes>

          <Route  path="/" element={<Login />} > </Route>

          <Route path="/register" element={<Register />}></Route>

          <Route path="/home" element={<Home />}> </Route>

        </Routes>
      </div>
    </BrowserRouter>
    </div>
  );
}

export default App;
