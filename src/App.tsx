import React, { useReducer } from 'react';
import './App.css';
import Navigation from './Navigation';
import {
  BrowserRouter as Router
} from "react-router-dom";
import { GameContextProvider, gameReducer, initialGameState } from './context/GridContext';

function App() {

  const [gameState, gameDispatch] = useReducer(gameReducer, initialGameState);

  const gameContextValues = {
    gameState,
    gameDispatch
  }

  return (
    <GameContextProvider value={gameContextValues}>
      <Router>
        <Navigation />
      </Router>
    </GameContextProvider>
  );
}

export default App;
