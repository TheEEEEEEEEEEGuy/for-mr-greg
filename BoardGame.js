import { useEffect, useState } from "react";
import React from 'react'
import { fillWithBombs } from "./bombFunctions"


let ROWS = 5;
let COLUMNS = 6;
let NUM_BOMBS = 10;
const startUpGrid = Array.from(Array(ROWS), () => Array.from(Array(COLUMNS), () => null))
//const startUpGridUI = Array.from(Array(ROWS), () => Array.from(Array(COLUMNS), () => "hidden"))
const actualGrid = null;


export default function BoardGame() {
    
    const [grid, setGrid] = useState(null);
    const [uiGrid, setUiGrid] = useState(null);
    const [playing, setPlaying] = useState(true)
    
    function setUpForPlaying(){
        const newGrid = fillWithBombs(startUpGrid, NUM_BOMBS)
        setGrid(newGrid)
        actualGrid = newGrid
    }
    function setUpUi(){
        setUiGrid(actualGrid)
    }
    function blockClicked(theClickThing, x, y) {
        console.log("Clicked")
        if (theClickThing === "💣") {
            alert("You Lost")
            setPlaying(false)
        } else {
            //console.log(theClickThing)
            uiGrid[y][x] = "Shown"
            console.log(uiGrid[y][x])
        }
    }
    if (playing) {
        setUpForPlaying()
        return (
            <table>
                <tbody>
                    {
                        grid.map((ele, rowIndex) => {
                            return (
                                <tr key={`row-${rowIndex}`} >
                                    {
                                        ele.map((ele2, colIndex) => {
                                            let x = colIndex
                                            let y = rowIndex
                                            return (<td key={`col-${colIndex}`} onClick={(e) => blockClicked(ele2, x, y)}>{uiGrid[y][x] == "hidden" ? <div>{" "}</div> : <h3>{grid[y][x]}</h3>}</td>)
                                        })
                                    }
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        )
    } else {
        setUpUi()
        return (
            <table>
                <tbody>
                    {
                        grid.map((ele, rowIndex) => {
                            return (
                                <tr key={`row-${rowIndex}`} >
                                    {
                                        ele.map((ele2, colIndex) => {

                                            return (<td key={`col-${colIndex}`}>{ele2}</td>)
                                        })
                                    }
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        )
    }
}
