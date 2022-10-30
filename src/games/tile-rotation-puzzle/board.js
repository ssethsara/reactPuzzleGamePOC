import React, { useEffect, useState } from "react";
import Tile from "./tile";
import { TILE_COUNT, GRID_SIZE, BOARD_SIZE } from "../../constants"

const VALID_ANGLES = [0, 90, 180, 270];

function Board({ imgUrl }) {
  // const [tiles, setTiles] = useState([...Array(TILE_COUNT).keys()]);
  const tiles = [...Array(TILE_COUNT).keys()];
  const [tilesData, setTilesData] = useState([]);
  const [isStarted, setIsStarted] = useState(false);
  console.log('is started:', isStarted)

  useEffect(() => {
    setupTile(false);
  }, [])

  const setupTile = (suffled) => {

    const tileData = [];
    tiles.forEach((key, index) => {
      const random = suffled ? Math.floor(Math.random() * (VALID_ANGLES.length - 1) + 1) : 0;
      tileData.push({
        key: key,
        rotationAngle: VALID_ANGLES[random]
      })
    })
    console.log(tileData);
    setTilesData(tileData);
  }

  const handleTileClick = (index, newRotationAngle) => {
    //setTilesData(...tilesData,tilesData[index].rotationAngle=newRotationAngle)
    var newTilesData = [...tilesData];
    newTilesData[index].rotationAngle = newRotationAngle;
    setTilesData(newTilesData);
    console.log(index, newRotationAngle);
  }

  const handleShuffleClick = () => {
    setupTile(true);
  }

  const handleStartClick = () => {
    setIsStarted(true);
    setupTile(true);
  }

  const isSolved = () => {
    const unsolvedTiles = tilesData.filter(t => t.rotationAngle % 360 !== 0);
    console.log("unsolvedTiles",unsolvedTiles)
    return unsolvedTiles?.length === 0;
  }

  const pieceWidth = Math.round(BOARD_SIZE / GRID_SIZE);
  const pieceHeight = Math.round(BOARD_SIZE / GRID_SIZE);
  const style = {
    width: BOARD_SIZE,
    height: BOARD_SIZE,
  };
  // const hasWon = isSolved(tiles)

  return (
    <>
      <ul style={style} className="board">
        {tilesData.map((tile, index) => (
          <Tile
            key={tile.key}
            index={index}
            rotationAngle={tile.rotationAngle}
            imgUrl={imgUrl}
            tile={tile.key}
            width={pieceWidth}
            height={pieceHeight}
            handleTileClick={handleTileClick}
          />
        ))}
      </ul>
      {isSolved() && isStarted && <div>Puzzle solved 🧠 🎉</div>}
      {!isStarted ?
        (<button onClick={() => handleStartClick()}>Start game</button>) :
        (<button onClick={() => handleShuffleClick()}>Restart game</button>)}
    </>
  );
}

export default Board;
