export const NUM_ROWS = 5;
export const NUM_COLUMNS = 6;
export const NUM_BOMBS = 10;

export const fillNeighbors = (playingField) => {
    let copyField = [...playingField];

    for (let r = 0; r < NUM_ROWS; r++) {
        for (let block = 0; block < NUM_COLUMNS; block++) {
            var bombsFound = 0
            let theBlock = copyField[r][block]
            if (theBlock !== "💣") {
                if (copyField[r][block - 1] === "💣") {
                    bombsFound++
                }
                if (copyField[r][block + 1] === "💣") {
                    bombsFound++
                }
                if (r > 0 && copyField[r - 1][block] === "💣") {
                    bombsFound++
                }
                if (r.toString() !== "5") {
                    let newR = r + 1
                    try {
                        if (copyField[newR][block] === "💣") {
                            bombsFound++
                        }
                    } catch (e) {
                        //console.log(e)
                    }
                }
                copyField[r][block] = bombsFound
            }
        }
    }
    return copyField;
}


export const fillWithBombs = (playingField, numberOfBombs) => {
    let copyField = [...playingField];

    let numRows = copyField.length;
    let numCols = copyField[0].length;
    let loopCount = 0;

    let bombsToSet = numberOfBombs;
    do {
        loopCount++;
        let randX = Math.floor(Math.random() * numRows);
        let randY = Math.floor(Math.random() * numCols);
        if (copyField[randX][randY] === null) {
            copyField[randX][randY] = "💣";
            bombsToSet -= 1;
        }
        console.log(`loopCount, randX, randY, bombsToSet, copyField`, [loopCount, randX, randY, bombsToSet], copyField);
    } while (loopCount < 100 && bombsToSet > 0);
    //getNeighbors(playingField)
    return copyField;
}
