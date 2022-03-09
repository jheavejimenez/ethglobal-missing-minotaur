import React from 'react';
import './App.css';
import Navigation from './Navigation';
import {
  BrowserRouter as Router
} from "react-router-dom";

function App() {

  return (
    <Router>
      <Navigation />
    </Router>
  );
}

export default App;
