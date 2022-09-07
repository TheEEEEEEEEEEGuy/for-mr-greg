import { useEffect, useState } from "react";
import React from 'react'
import { fillWithBombs, fillNeighbors } from "./bombFunctions"


let ROWS = 9;
let COLUMNS = 9;
let NUM_BOMBS = 10;







export default function BoardGame() {

    const [Originalgrid, setGrid] = useState(Array.from(Array(ROWS), () => Array.from(Array(COLUMNS), () => null)));
    const [uiGrid, setUiGrid] = useState(Array.from(Array(ROWS), () => Array.from(Array(COLUMNS), () => "hidden")));
    const [loosed, setLoosed] = useState(false)
    const [playing, setPlaying] = useState(false)
    const [score, setScore] = useState(0)

    let bombsAndNeighbors


    function blockClicked(theClickThing, x, y) {
        if (theClickThing === "💣") {
            setLoosed(true)
        } else {
            let newUi = [...uiGrid]
            newUi[y][x] = "Shown"
            setUiGrid(newUi)
            let newScore = score + 1
            setScore(newScore)
        }
    }
    function startFunc() {
        console.log("starting...")
        bombsAndNeighbors = fillWithBombs(NUM_BOMBS);
        setGrid(bombsAndNeighbors);
        setPlaying(true)
        console.log("the grid: ")
        console.table(Originalgrid)
    }

    if (playing) {
        if (!loosed) {
            return (
                <div>
                    <h1>Score: {score}</h1>
                    <table>
                        <tbody>
                            {
                                Originalgrid.map((ele, rowIndex) => { //here
                                    return (
                                        <tr key={`row-${rowIndex}`} >
                                            {
                                                ele.map((ele2, colIndex) => {
                                                    let x = colIndex
                                                    let y = rowIndex
                                                    return (<td key={`col-${colIndex}`} onClick={(e) => blockClicked(ele2, x, y)}>{uiGrid[y][x] === "hidden" ? <div>{" "}</div> : <h3>{Originalgrid[y][x]}</h3>}</td>)
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
                                Originalgrid.map((ele, rowIndex) => { //here
                                    return (
                                        <tr key={`row-${rowIndex}`} >
                                            {
                                                ele.map((ele2, colIndex) => {
                                                    let x = colIndex
                                                    let y = rowIndex
                                                    return (<td key={`col-${colIndex}`} onClick={(e) => blockClicked(ele2, x, y)}><h3>{ele2}</h3></td>)
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
    } else {
        return (
            <div>
                <button onClick={(e) => startFunc()} className={"btn"}>Start</button>
                
            </div>
        )
    }
}

//last