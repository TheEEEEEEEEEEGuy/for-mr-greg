let ROWS = 9;
let COLUMNS = 9;






export let fillNeighbors = (pl) => {
    let playingField = pl
    for (let r = 0; r < ROWS; r++) {
        for (let block = 0; block < COLUMNS; block++) {
            //console.log(playingField)
            var bombsFound = 0
            let theBlock = playingField[r][block]
            if (theBlock !== "💣") {
                if (playingField[r][block - 1] === "💣") {
                    bombsFound++
                }
                if (playingField[r][block + 1] === "💣") {
                    bombsFound++
                }
                if (r > 0 && playingField[r - 1][block] === "💣") {
                    bombsFound++

                }
                try{
                    if(r.toString() !== "0"){
                        if (playingField[r - 1][block - 1] === "💣") {
                            bombsFound++
                        }
                        if (playingField[r - 1][block + 1] === "💣") {
                            bombsFound++
                        }
                    }
                    if (r.toString() !== "5") {
                        let newR = r + 1
                        if (playingField[newR][block] === "💣") {
                            bombsFound++
                        }
                        if (playingField[newR][block - 1] === "💣") {
                            bombsFound++
                        }
                        if (playingField[newR][block + 1] === "💣") {
                            bombsFound++
                        }
                    }
                }catch(e){

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
    return fillNeighbors(initialArray)
}