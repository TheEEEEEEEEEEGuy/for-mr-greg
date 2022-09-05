let ROWS = 5;
let COLUMNS = 6;
let NUM_BOMBS = 10;






function getNeighbors(playingField) {
    for (let r = 0; r < ROWS; r++) {
        for (let block = 0; block < COLUMNS; block++) {
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
}


export let fillWithBombs = (playingField, numberOfBombs) => {
    let numRows = playingField.length;
    let numCols = playingField[0].length;

    let bombsToSet = numberOfBombs;
    do {
        let randX = Math.floor(Math.random() * numRows);
        let randY = Math.floor(Math.random() * numRows);
        if (playingField[randX][randY] === null) {
            playingField[randX][randY] = "💣";
            bombsToSet -= 1;
        }
    } while (bombsToSet > 0);
    //getNeighbors(playingField)
    return playingField;
}
