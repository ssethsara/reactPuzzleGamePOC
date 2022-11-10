import React, { useEffect, useState } from "react";
import Tile from "./tile";
import {
 TILE_COUNT,
 GRID_SIZE,
 BOARD_SIZE_DESKTOP,
 BOARD_SIZE_MOBILE
} from "../../constants";
import Modal from "../components/modal";
import seedrandom from "seedrandom";

var rng = seedrandom("Puzzle_1");

const VALID_ANGLES = [0, 90, 180, 270];

const Board = ({ imgUrl, isMobile }) => {
 const tiles = [...Array(TILE_COUNT).keys()];
 const [tilesData, setTilesData] = useState([]);
 const [isStarted, setIsStarted] = useState(false);
 const [timer, setTimer] = useState(1);
 const [isSolved, setIsSolved] = useState(false);
 const [isModalOpen, setIsModalOpen] = useState(false);

 const boardSize = isMobile ? BOARD_SIZE_MOBILE : BOARD_SIZE_DESKTOP;
 const zeroPad = (num, places) => String(num).padStart(places, "0");

 const secondsToTime = (secs) => {
  let hours = Math.floor(secs / (60 * 60));

  let divisor_for_minutes = secs % (60 * 60);
  let minutes = Math.floor(divisor_for_minutes / 60);

  let divisor_for_seconds = divisor_for_minutes % 60;
  let seconds = Math.ceil(divisor_for_seconds);

  let obj = {
   h: zeroPad(hours, 2),
   m: zeroPad(minutes, 2),
   s: zeroPad(seconds, 2)
  };
  return obj;
 };

 useEffect(() => {
  setupTile(false);
  const startTimerOut = setTimeout(() => {
   setIsStarted(true);
   setupTile(true);
  }, 2000);
  return () => {
   clearTimeout(startTimerOut);
  };
 }, []);

 useEffect(() => {
  const interval =
   !isSolved &&
   isStarted &&
   setInterval(() => {
    setTimer((prev) => prev + 1);
   }, 1000);

  const freezeTimer =
   isSolved &&
   isStarted &&
   setTimeout(() => {
    setIsModalOpen(true);
   }, 2000);

  return () => {
   clearInterval(interval);
   clearTimeout(freezeTimer);
  };
 }, [isSolved, isStarted]);

 const setupTile = (suffled) => {
  const tileData = [];
  tiles.forEach((key, index) => {
   const random = suffled
    ? Math.floor(rng() * (VALID_ANGLES.length - 1) + 1)
    : 0;
   tileData.push({
    key: key,
    rotationAngle: VALID_ANGLES[random]
   });
  });
  setTilesData(tileData);
 };

 const handleTileClick = (index, newRotationAngle) => {
  if (!isSolved) {
   var newTilesData = [...tilesData];
   newTilesData[index].rotationAngle = newRotationAngle;
   setTilesData(newTilesData);
   CheckIsSolved(newTilesData);
  }
 };

 const CheckIsSolved = (newTileData) => {
  const unsolvedTiles = newTileData.filter((t) => t.rotationAngle % 360 !== 0);
  if (isStarted && unsolvedTiles?.length === 0) {
   setIsSolved(true);
  } else {
   setIsSolved(false);
  }
 };

 const getTimerString = () => {
  const timerObject = secondsToTime(timer);
  return `${timerObject.m}:${timerObject.s}`;
 };

 const onModalClose = () => {
  setIsModalOpen(false);
 };

 const pieceWidth = Math.round(boardSize / GRID_SIZE);
 const pieceHeight = Math.round(boardSize / GRID_SIZE);
 const style = {
  width: boardSize,
  height: boardSize
 };

 return (
  <>
   {isModalOpen && (
    <Modal
     text="Puzzle Solved"
     time={getTimerString()}
     onModalClosed={onModalClose}
    ></Modal>
   )}
   <ul
    style={style}
    className={isStarted && isSolved ? "board board-shine-animation" : "board"}
   >
    {tilesData.map((tile, index) => (
     <Tile
      key={tile.key}
      index={index}
      rotationAngle={tile.rotationAngle}
      imgUrl={imgUrl}
      tile={tile.key}
      width={pieceWidth}
      height={pieceHeight}
      boardSize={boardSize}
      handleTileClick={handleTileClick}
      isSolved={isSolved}
      isStarted={isStarted}
     />
    ))}
   </ul>
   <div className="timerStyle">
    <div>
     <span className="timeText">Time: </span>
     <span>{getTimerString()}</span>
    </div>
   </div>
  </>
 );
};

export default Board;
