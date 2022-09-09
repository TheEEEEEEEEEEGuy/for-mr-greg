import { useState } from "react";
import React from 'react'
import { fillWithBombs, NUM_ROWS, NUM_COLUMNS, NUM_BOMBS, BOMB } from "./bombFunctions"



export default function BoardGame() {

    const [Originalgrid, setGrid] = useState();
    const [uiGrid, setUiGrid] = useState();
    const [loosed, setLoosed] = useState(false)
    const [playing, setPlaying] = useState(false)
    const [score, setScore] = useState(0)

    function checkBlock(x, y){
        let theBlock = Originalgrid[y][x]
        if (theBlock !== BOMB){
            blockClicked(x,y)
        }else{
            setLoosed(true)
        }
    }

    function blockClicked(x, y) {
        setUiGrid((currVal) => {
            let newUi = [...currVal];
            newUi[y][x] = "Shown";
            return newUi;
        });
        setScore((currVal) => {
            let newScore = currVal + 1
            return newScore;
        });
    }
    function startFunc() {
        console.log("starting...")
        let newGrid = fillWithBombs(NUM_BOMBS);
        setGrid(newGrid);
        setUiGrid(
            Array.from(Array(NUM_ROWS), () =>
                Array.from(Array(NUM_COLUMNS), () => 'hidden')
            )
        );
        setPlaying(true)
        //console.log("the grid: ")
        //console.table(newGrid)
    }

    function restartFunc() {
        setPlaying(false)
        setLoosed(false)
        setScore(0)
        //window.location.reload(false);
        //console.log("restarting...")
        startFunc()
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
                                                    return (<td key={`col-${colIndex}`} onClick={(e) => checkBlock(x, y)}>{uiGrid[y][x] === "hidden" ? <div>{" "}</div> : <h3>{Originalgrid[y][x]}</h3>}</td>)
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
                    <h4>You Lost. <br></br> Your score: {score}</h4>
                    <button onClick={(e) => restartFunc()} className={"btn-restart"}>Restart</button>
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