import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Parallax from 'parallax-js';
import bg_layer_1 from "../assets/images/start-menu-background/Museum_Updelat.png";
import bg_layer_2 from "../assets/images/start-menu-background/Museum_Updelat_2.png";
import bg_layer_3 from "../assets/images/start-menu-background/Museum_Updelat_3.png";
import LogoImage from '../assets/images/Konstskatten_logo.png'



const StartPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        var scene = document.getElementById('scene');
        var parallaxInstance = new Parallax(scene);
    }, [])

    return (
        <>
        
        <div className="header">
                    <img className="logoImage" src={LogoImage}></img>
                </div>
            <div className="bg">
                {/* <button onClick={() => navigate("/puzzle-game")}>Start</button> */}
                <div id="scene">


                    <div className="layer" data-depth="0.05">
                        <img className="image" src={bg_layer_3}></img>
                    </div>
                    <div className="layer middleLayer" data-depth="0.1">
                        <img className="image" src={bg_layer_2}></img>
                    </div>
                    <div className="layer" data-depth="0.15">

                        <img className="image" src={bg_layer_1}></img>
                    </div>
                    <div className="layer" data-depth="0.2">

                    </div>

                </div>
                <button className="button" onClick={() => navigate("/puzzle-game")}>Start</button>
            </div>
        </>
    )
}

export default StartPage