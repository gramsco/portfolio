import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import NavBar from './NavBar'
import Container from './Container'
import About from './About'
import { Switch, Route } from 'react-router-dom'


function App() {
  

  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route exact path="/projects" component={Container}/>
        <Route exact path="/" component={About}/>
      </Switch>
    </div>
  );
}

export default App;
