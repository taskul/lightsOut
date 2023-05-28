import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/


function isLit(chance) {
  // returns true if random float created is lower than chance float
  let rand = Math.random();
  return rand <= chance ? true : false;
}

function Board({ nrows = 3, ncols = 3, chanceLightStartsOn = 0.25 }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    // creating an array-of-arrays of true/false values
    for (let r = 1; r <= nrows; r++) {
      const gameRow = Array.from({ length: ncols }, () => isLit(chanceLightStartsOn))
      initialBoard.push(gameRow)
    }
    return initialBoard;
  }


  function hasWon() {
    // checks the board in state to determine whether the player has won.
    // checks to see if every item in the board array of arrays is false
    // false item means that light is turned off
    // if all of the lights are turned off, then the game is won
    const lightsOut = board.every(row => row.every((item) => item === false))
    return lightsOut
  }

  function flipCellsAround(coord) {
    setBoard(board => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it
        // toggles the value of the element by using the logical NOT operator (!). 
        // If the element was originally true, it will be set to false, and vice versa.
        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
          // then we flip the light switch on elements around it
          if (x < (nrows - 1)) boardCopy[y][x + 1] = !boardCopy[y][x + 1];
          if (y < (ncols - 1)) boardCopy[y + 1][x] = !boardCopy[y + 1][x];
          if (x > 0) boardCopy[y][x - 1] = !boardCopy[y][x - 1];
          if (y > 0) boardCopy[y - 1][x] = !boardCopy[y - 1][x];
        }

      };

      // creating a deep copy of a board array
      const deepCopy = board.map(row => [...row])

      // in the copy, fliping this cell and the cells around it
      flipCell(y, x, deepCopy)

      // returning the copy
      return deepCopy;
    });
  }


  // if the game is won, show a winning msg & render nothing else
  // making table board
  return (
    <div>
      {hasWon() ?
        <h1>You won!</h1>
        :
        <table className="Board">
          {board.map((col, y) => (
            <tr>
              {col.map((cell, x) => (
                <Cell isLit={cell} flipCellsAroundMe={flipCellsAround} coord={`${y}-${x}`} />
              ))}
            </tr>
          ))}
        </table>
      }
    </div>
  )
}

export default Board;
