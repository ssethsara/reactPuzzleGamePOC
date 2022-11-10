import React, { useEffect, useState } from "react";
import { Motion, spring } from "react-motion";
import { GRID_SIZE } from "../../constants";

const Tile = (props) => {
 const {
  tile,
  index,
  width,
  height,
  handleTileClick,
  imgUrl,
  rotationAngle,
  boardSize,
  isSolved,
  isStarted
 } = props;

 // Get the row/col pair from a linear index.
 function getMatrixPosition(index) {
  return {
   row: Math.floor(index / GRID_SIZE),
   col: index % GRID_SIZE
  };
 }

 function getVisualPosition(row, col, width, height) {
  return {
   x: col * width,
   y: row * height
  };
 }

 const { row, col } = getMatrixPosition(index);
 const visualPos = getVisualPosition(row, col, width, height);
 const [rotate, SetRotate] = useState(rotationAngle);
 const tileStyle = {
  width: `calc(100% / ${GRID_SIZE})`,
  height: `calc(100% / ${GRID_SIZE})`,
  translateX: visualPos.x,
  translateY: visualPos.y,
  backgroundImage: `url(${imgUrl})`,
  backgroundSize: `${boardSize}px`,
  backgroundPosition: `${(100 / (GRID_SIZE - 1)) * (tile % GRID_SIZE)}% ${
   (100 / (GRID_SIZE - 1)) * Math.floor(tile / GRID_SIZE)
  }%`,
  boxShadow: `inset 1px 1px 2px 2px rgba(0,0,0,0.3)`
 };
 const motionStyle = {
  translateX: spring(visualPos.x),
  translateY: spring(visualPos.y),
  rotate: spring(rotate)
 };

 useEffect(() => {
  SetRotate(rotationAngle);
 }, [rotationAngle]);

 const Rotate = () => {
  if (!isSolved && isStarted) {
   const newRotationAngle = rotate + 90;
   SetRotate(newRotationAngle);
   handleTileClick(index, newRotationAngle);
  }
 };

 return (
  <Motion
   defaultStyle={{ rotate: 0, translateX: 0, translateY: 0 }}
   style={motionStyle}
  >
   {({ translateX, translateY, rotate }) => (
    <li
     style={{
      ...tileStyle,
      transform: `translate3d(${translateX}px, ${translateY}px, 0) rotate(${rotate}deg) `,
      cursor: "pointer"
     }}
     className="tile"
     onClick={Rotate}
    >
     {!imgUrl && `${tile + 1}`}
    </li>
   )}
  </Motion>
 );
};

export default Tile;
