import React, { useState, useEffect } from "react";
import Board from "../games/tile-rotation-puzzle/board";

import LogoImage from '../assets/images/Konstskatten_logo.png'
import Modal from "../games/tile-rotation-puzzle/components/modal";

function RotatePuzzleGame() {
    const [imgUrl, setImgUrl] = useState("https://ascender-my.sharepoint.com/personal/supun_ascentic_se/Documents/GamePOCContent/puzzle-image-1.jpg")
    const [width, setWidth] = useState(window.innerWidth);

    const updateURLParameter = (url, param, paramVal) => {
        var newAdditionalURL = "";
        var tempArray = url.split("?");
        var baseURL = tempArray[0];
        var additionalURL = tempArray[1];
        var temp = "";
        if (additionalURL) {
            tempArray = additionalURL.split("&");
            for (var i = 0; i < tempArray.length; i++) {
                if (tempArray[i].split("=")[0] !== param) {
                    newAdditionalURL += temp + tempArray[i];
                    temp = "&";
                }
            }
        }

        var rows_txt = temp + "" + param + "=" + paramVal;
        return baseURL + "?" + newAdditionalURL + rows_txt;
    }

    function handleWindowSizeChange() {
        setWidth(window.innerWidth);
    }
    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);


    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search)
        if (urlParams.has("img")) {
            setImgUrl(urlParams.get("img"))
        }
    }, [])

    const isMobile = width <= 768;

    const handleImageChange = (e) => {
        setImgUrl(e.target.value)
        window.history.replaceState("", "", updateURLParameter(window.location.href, "img", e.target.value))
    }

    return (
        <>
            <div className="puzzle-game">
                <div className="App game-backeground">
                    <img className="logoImage" src={LogoImage}></img>
                    <Board imgUrl={imgUrl} isMobile={isMobile} />
                    {/* <input value={imgUrl} onChange={handleImageChange} /> */}
                </div>
            </div>
        </>

    );
}

export default RotatePuzzleGame;
