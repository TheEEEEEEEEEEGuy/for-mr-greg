let ROWS = 9;
let COLUMNS = 9;
const bomb = "💣"



function countNeighborBombs(x, y, ar) {
    let pl = [...ar]
    var bombsFound = 0
    try{
        if ((y!==0) && (x!==0) && (pl[y - 1][x - 1] === bomb)) {
            bombsFound++
        }
        if ((y!==0) && pl[y - 1][x] === bomb) {
            bombsFound++
        }
        if ((y!==0) && (x!==9) && pl[y - 1][x + 1] === bomb) {
            bombsFound++
        }
        if ((x!==0) && pl[y][x - 1] === bomb) {
            bombsFound++
        }
        if ((x!==9) && pl[y][x + 1] === bomb) {
            bombsFound++
        }
        if ((y!==9) && (x!==0) &&  pl[y + 1][x - 1] === bomb) {
            bombsFound++
        }
        if ((y!==9) && pl[y + 1][x] === bomb) {
            bombsFound++
        }
        if ((y!==9) && (x!==9) &&  pl[y + 1][x + 1] === bomb) {
            bombsFound++
        }
    }catch(e){
        
    }
    return (bombsFound)
}


export let fillNeighbors = (pl) => {
    let playingField = [...pl]
    for (let y = 0; y < ROWS; y++) {
        for (let x = 0; x < COLUMNS; x++) {
            if (playingField[x][y] !== bomb) {
                playingField[x][y] = countNeighborBombs(x, y, playingField);
            }
        }
    }
    return (playingField)
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
            initialArray[randX][randY] = bomb;
            bombsToSet -= 1;
        }
        loopCount++
    } while (loopCount < 100 && bombsToSet > 0)
    return fillNeighbors(initialArray)
}