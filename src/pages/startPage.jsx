import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Parallax from "parallax-js";
import bg_layer_1 from "../assets/images/start-menu-background/Museum_Updelat.png";
import bg_layer_2 from "../assets/images/start-menu-background/Museum_Updelat_2.png";
import bg_layer_3 from "../assets/images/start-menu-background/Museum_Updelat_3.png";
import LogoImage from "../assets/images/Konstskatten_logo.png";

const StartPage = () => {
 const navigate = useNavigate();
 const [started, setStarted] = useState(false);

 useEffect(() => {
  var scene = document.getElementById("scene");
  var parallaxInstance = new Parallax(scene);
 }, []);

 useEffect(() => {
  const startTimerOut =
   started &&
   setTimeout(() => {
    navigate("/puzzle-game");
   }, 3000);
  return () => {
   clearTimeout(startTimerOut);
  };
 }, [started]);

 return (
  <>
   <div className="bg">
    <div id="scene">
     <div
      className={started ? "layer bgLayer-Animation" : "layer"}
      data-depth="0.05"
     >
      <img alt="bg_layer_3" className="image" src={bg_layer_3}></img>
     </div>
     <div
      className={started ? "layer middleLayer-Animation" : "layer middleLayer"}
      data-depth="0.1"
     >
      <img alt="bg_layer_2" className="image" src={bg_layer_2}></img>
     </div>
     <div
      className={started ? "layer frontLayer-Animation" : "layer frontLayer"}
      data-depth="0.15"
     >
      <img className="image" alt="bg_layer_1" src={bg_layer_1}></img>
     </div>
     <div className="layer">
      <div className="header">
       <img className="logoImage" alt="logo" src={LogoImage}></img>
      </div>
     </div>
     <div className={started ? "layer shine-effect" : "layer"}></div>
    </div>

    {!started && (
     <div className="button-wrapper">
      <button className="start-button" onClick={() => setStarted(true)}>
       Start
      </button>
     </div>
    )}
   </div>
  </>
 );
};

export default StartPage;
