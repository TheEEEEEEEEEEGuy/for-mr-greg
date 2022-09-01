import { useState } from "react";
import React from 'react'


let ROWS = 5;
let COLUMNS = 6;
let NUM_BOMBS = 10;


let grid = Array.from(Array(ROWS), () => Array.from(Array(COLUMNS), () => null))
let uiGrid = Array.from(Array(ROWS), () => Array.from(Array(COLUMNS), () => "hidden"))


function getNeighbors() {
    for (let r = 0; r < ROWS; r++) {
        for (let block = 0; block < COLUMNS; block++) {
            var bombsFound = 0
            let theBlock = grid[r][block]
            if (theBlock != "💣") {
                if (grid[r][block - 1] === "💣") {
                    bombsFound++
                }
                if (grid[r][block + 1] === "💣") {
                    bombsFound++
                }
                if (r > 0 && grid[r - 1][block] === "💣") {
                    bombsFound++
                }
                if (r.toString() != "5") {
                    let newR = r + 1
                    try {
                        if (grid[newR][block] === "💣") {
                            bombsFound++
                        }
                    } catch (e) {
                        //console.log(e)
                    }
                }
                grid[r][block] = bombsFound
            }
        }
    }
}


let fillWithBombs = (playingField, numberOfBombs) => {
    let numRows = playingField.length;
    let numCols = playingField[0].length;

    let bombsToSet = numberOfBombs;
    do {
        let randX = Math.floor(Math.random() * numRows);
        let randY = Math.floor(Math.random() * numRows);
        //console.log(`${randX}, ${randY} : ${JSON.stringify(grid[randX][randY])}`);
        if (grid[randX][randY] === null) {
            grid[randX][randY] = "💣";
            bombsToSet -= 1;
        }
    } while (bombsToSet > 0);
    getNeighbors()
}





fillWithBombs(grid, NUM_BOMBS);



  



export default function BoardGame() {
    const [playing, setPlaying] = useState(true)
    function blockCLicked(theClickThing, x, y){
        console.log("Clicked")
        if (theClickThing === "💣"){
            alert("You Lost")
            setPlaying(false)
        }else{
            //console.log(theClickThing)
            uiGrid[y][x] = "Shown"
            console.log(uiGrid[y][x])
        }
    }
    if (playing){
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
                                            return (<td key={`col-${colIndex}`} onClick={(e)=>blockCLicked(ele2, x, y)}>{ uiGrid[y][x] == "hidden" ? <div>{" "}</div> : <h3>{grid[y][x]}</h3> }</td>)
                                        })
                                    }
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        )
    }else{
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
