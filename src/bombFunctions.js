let ROWS = 5;
let COLUMNS = 6;
let NUM_BOMBS = 10;






export function fillNeighbors(pl) {
    let playingField = pl
    for (let r = 0; r < ROWS; r++) {
        for (let block = 0; block < COLUMNS; block++) {
            //console.log(playingField)
            var bombsFound = 0
            let theBlock = playingField[r][block]
            if (theBlock != "💣") {
                if (playingField[r][block - 1] === "💣") {
                    bombsFound++
                }
                if (playingField[r][block + 1] === "💣") {
                    bombsFound++
                }
                if (r > 0 && playingField[r - 1][block] === "💣") {
                    bombsFound++
                }
                if (r.toString() != "5") {
                    let newR = r + 1
                    try {
                        if (playingField[newR][block] === "💣") {
                            bombsFound++
                        }
                    } catch (e) {
                        //console.log(e)
                    }
                }
                playingField[r][block] = bombsFound
            }
        }
    }
    return(playingField)
}


export let fillWithBombs = (numberOfBombs) => {
    const initialArray = Array.from(Array(ROWS), () => Array.from(Array(COLUMNS), () => null))
    let numRows = initialArray.length;
    let numCols = initialArray[0].length;
    let loopCount = 0
    let bombsToSet = numberOfBombs;
    do {
        let randX = Math.floor(Math.random() * numRows);
        let randY = Math.floor(Math.random() * numRows);
        if (initialArray[randX][randY] === null) {
            initialArray[randX][randY] = "💣";
            bombsToSet -= 1;
        }
        loopCount++
    } while (loopCount < 100 && bombsToSet > 0)
    return initialArray;
}