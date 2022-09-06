import { useEffect, useState } from "react";
import React from 'react'
import { fillWithBombs, fillNeighbors } from "./bombFunctions"


let ROWS = 5;
let COLUMNS = 6;
let NUM_BOMBS = 10;







export default function BoardGame() {

    const [grid, setGrid] = useState(Array.from(Array(ROWS), () => Array.from(Array(COLUMNS), () => null)));
    const [uiGrid, setUiGrid] = useState(Array.from(Array(ROWS), () => Array.from(Array(COLUMNS), () => "hidden")));
    const [playing, setPlaying] = useState(true)

    let justBombs
    let bombsAndNeighbors


    function blockClicked(theClickThing, x, y) {
        if (theClickThing === "💣") {
            alert("You Lost")
            setPlaying(false)
        } else {
            console.log("Clicked: ", theClickThing)
            console.log("Before: ", uiGrid[y][x])
            let newUi = uiGrid
            newUi[y][x] = "Shown"
            setUiGrid(newUi)
            console.log("After: ", uiGrid[y][x])
        }
    }
    function startFunc() {
        console.log("starting...")
        justBombs = fillWithBombs(NUM_BOMBS);
        bombsAndNeighbors = fillNeighbors(justBombs);
        setGrid(bombsAndNeighbors);
        //setPlaying(true)
        console.log("Grid:", grid)
    }

    if (playing) {
        return (
            <div>
                <button onClick={(e) => startFunc()}>Start</button>
                <table>
                    <tbody>
                        {
                            grid.map((ele, rowIndex) => { //here
                                return (
                                    <tr key={`row-${rowIndex}`} >
                                        {
                                            ele.map((ele2, colIndex) => {
                                                let x = colIndex
                                                let y = rowIndex
                                                return (<td key={`col-${colIndex}`} onClick={(e) => blockClicked(ele2, x, y)}>{uiGrid[y][x] == "hidden" ? <div>{" "}</div> : <h3>{uiGrid[y][x]}</h3>}</td>)
                                            })
                                        }
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        )
    } else {
        return (
            <div>
                <table>
                    <tbody>
                        {
                            grid.map((ele, rowIndex) => { //here
                                return (
                                    <tr key={`row-${rowIndex}`} >
                                        {
                                            ele.map((ele2, colIndex) => {
                                                let x = colIndex
                                                let y = rowIndex
                                                return (<td key={`col-${colIndex}`} onClick={(e) => blockClicked(ele2, x, y)}>{ele2}</td>)
                                            })
                                        }
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}

//last