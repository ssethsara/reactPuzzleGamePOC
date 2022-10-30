import React, { useState, useEffect } from "react";
import Board from "./games/tile-rotation-puzzle/board";

function App() {
  const [imgUrl, setImgUrl] = useState("")

  const updateURLParameter=(url, param, paramVal)=> {
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

  

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    if (urlParams.has("img")) {
      setImgUrl(urlParams.get("img"))
    }
  }, [])

  const handleImageChange = (e) => {
    setImgUrl(e.target.value)
    window.history.replaceState("", "", updateURLParameter(window.location.href, "img", e.target.value))
  }

  return (
    <div className="App">
      <h1>React sliding puzzle</h1>
      <Board imgUrl={imgUrl} />
      <input value={imgUrl} onChange={handleImageChange} />
    </div>
  );
}

export default App;
