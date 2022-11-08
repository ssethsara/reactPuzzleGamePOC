import React, { useState, useEffect } from "react";
import Board from "../games/tile-rotation-puzzle/board";

import LogoImage from '../assets/images/Konstskatten_logo.png'
import PuzzleImage from '../assets/images/puzzle-image-1.jpg';
import Modal from "../games/tile-rotation-puzzle/components/modal";

function RotatePuzzleGame() {
    const PUZZLE_IMAGE = PuzzleImage;
    const [width, setWidth] = useState(window.innerWidth);

    function handleWindowSizeChange() {
        setWidth(window.innerWidth);
    }
    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);

    const isMobile = width <= 768;

    return (
        <>
            <div className="puzzle-game">
                <div className="App game-backeground">
                    <img className="logoImage" src={LogoImage}></img>
                    <Board imgUrl={PUZZLE_IMAGE} isMobile={isMobile} />
                </div>
            </div>
        </>

    );
}
export default RotatePuzzleGame;
