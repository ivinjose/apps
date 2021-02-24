import { useState, useEffect } from 'react';
import logo from '../images/logo.svg';
import './App.css';
import ApiHelper from "../helpers/ApiHelper";
import Signup from "../Signup";

function App() {  
  return (
    <div className="app">
      <header className="header">
        <img className="logo" src={logo} className="logo" alt="logo" />
        <Signup />
        {/* <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
      </header>
    </div>
  );
}

export default App;
