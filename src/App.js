import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './styles/main.scss';
import StartPage from "./pages/startPage";
import RotatePuzzleGame from './pages/rotatePuzzleGamePage';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<StartPage />} />
        <Route exact path="/puzzle-game" element={<RotatePuzzleGame />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
