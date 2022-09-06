import { useEffect, useState } from 'react';
import React from 'react';
import { NUM_ROWS, NUM_COLUMNS, NUM_BOMBS, fillWithBombs, fillNeighbors } from './bombFunctions';

let initialArray = Array.from(Array(NUM_ROWS), () =>
  Array.from(Array(NUM_COLUMNS), () => null)
);

export default function BoardGame() {
  const [grid, setGrid] = useState(null);
  const [uiGrid, setUiGrid] = useState(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    // set up bombs and neighbors
    let emptyArray = initialArray.map((row) => row.map((cell) => null));
    let justBombs = fillWithBombs(emptyArray, NUM_BOMBS);
    let bombsAndNeighbors = fillNeighbors(justBombs);
    setGrid([...bombsAndNeighbors]);

    // set up the UI
    setUiGrid(initialArray.map((row) => row.map((cell) => null)));

    // now we're ready to play!
    setPlaying(true);
  }, []);

  function blockClicked(theClickThing, x, y) {
    console.log('Clicked');
    if (theClickThing === '💣') {
      alert('You Lost');
      setPlaying(false);
    } else {
      //console.log(theClickThing)
      uiGrid[y][x] = 'Shown';
      console.log(uiGrid[y][x]);
    }
  }

  console.log(`RENDERING and playing is`, playing);

  if (!playing) {
    return (
      <div>
        <p>Loading game board...</p>
      </div>
    );
  }

  return (
    <table>
      <tbody>
        {grid.map((ele, rowIndex) => {
          return (
            <tr key={`row-${rowIndex}`}>
              {ele.map((ele2, colIndex) => {
                let x = colIndex;
                let y = rowIndex;
                return (
                  <td
                    key={`col-${colIndex}`}
                    onClick={(e) => blockClicked(ele2, x, y)}
                  >
                    {uiGrid[y][x] === 'hidden' ? (
                      <div> </div>
                    ) : (
                      <h3>{grid[y][x]}</h3>
                    )}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
