import React, { Fragment, useState, useEffect } from 'react';
import './App.css';

import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";

//components
import Dashboard from "./components/ManagerDashboard";
import Login from "./components/Login";
import Register from "./components/Register";
import ManagerAllItems from "./components/AllItems";

// Main
function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = boolean => {
    setIsAuthenticated(boolean);
  };


  async function isAuth() {
    try {

      const response = await fetch("http://localhost:5000/auth/is-verified", {method: "GET", headers: {token: localStorage.token}});

      const parseResponse = await response.json();

      parseResponse === true ? setIsAuthenticated(true): setIsAuthenticated(false);

    } catch (error) {
      console.error(error.message);
    }
  };


  useEffect(() => {
    isAuth();
  });


  return (
    <Fragment>
      <Router>
        <div className = "container">
          <Routes>
            <Route path = "/" element = {!isAuthenticated ? (<Login setAuth = {setAuth} />) : (<Navigate to= "/dashboard" />)}/>
            <Route path = "/login" element = {!isAuthenticated ? (<Login setAuth = {setAuth} />) : (<Navigate to= "/dashboard" />)}/>
            <Route path = "/register"  element = {!isAuthenticated ? (<Register setAuth = {setAuth}/>) : (<Navigate to= "/login" />)}/>
            <Route path = "/dashboard" element = {isAuthenticated ? (<Dashboard setAuth = {setAuth}/>) : (<Navigate replace to= "/login" />)}/>
            <Route path = "/allItems" element = {(<ManagerAllItems setAuth = {setAuth}/>)}/>
          </Routes>
        </div>
      </Router>
    </Fragment>
  );
}

export default App;
