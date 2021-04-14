//Variable Declarations
let boardState = [[{},{},{},{},{},{},{},{}], // 8 x 8 array of board tiles (y,x) origin top left of board
[{},{},{},{},{},{},{},{}],
[{},{},{},{},{},{},{},{}],
[{},{},{},{},{},{},{},{}],
[{},{},{},{},{},{},{},{}],
[{},{},{},{},{},{},{},{}],
[{},{},{},{},{},{},{},{}],
[{},{},{},{},{},{},{},{}]]; 

let prevPos = [];

let movePos;

//boardState objects should appear like this:

// boardObject = {
//     isPlayable : (true/false)
//     checker : 0, 1, or 2
//     position : 01 - 76
// }

//Set unplayable tiles (for drag and drop movement - not yet implemented)
for(let i = 0; i < boardState.length; i++){
    for(let j = 0; j < boardState[i].length; j++){
        if (i%2 == 0){
            if (j%2 == 0){
                boardState[i][j].isPlayable = false;
            }
        }
        else if (i%2 != 0){
            if (j%2 !=0){
                boardState[i][j].isPlayable = false;
            }
        }
    }
}

//Setting position values
for(let i = 0; i < boardState.length; i++){
    for(let j = 0; j < boardState[i].length; j++){
        if (i%2 == 0){
            if (j%2 == 0){
                boardState[i][j].isPlayable = false;
            }
            else{
                boardState[i][j].position = `${i}${j}`;
            }
        }
        else if (i%2 != 0){
            if (j%2 !=0){
                boardState[i][j].isPlayable = false;
            }
            else{
                boardState[i][j].position = `${i}${j}`;
            }
        }
    }
}
console.dir(boardState);
// Set player 2 checkers 
for(let i = 0; i < 3; i++){
    for(let j = 0; j < boardState[i].length; j++){
        if (i%2 !== 0){
            if (j%2 == 0){
                boardState[i][j].checker = '2';
            }
        }
        else if (i%2 == 0){
            if (j%2 !== 0){
                boardState[i][j].checker = '2';
            }
        }
    }
}

// Set empty playable checkers
for(let i = 3; i <5; i++){
    for(let j = 0; j <boardState[i].length; j++){
        if (i%2 !== 0){
            if (j%2 == 0){
                boardState[i][j].checker = '0';
            }
        }
        else if (i%2 == 0){
            if (j%2 !== 0){
                boardState[i][j].checker = '0';
            }
        }
    }
}

// Set player 1 checkers
for(let i = 5; i < boardState.length; i++){
    for(let j = 0; j < boardState[i].length; j++){
        if (i%2 !== 0){
            if (j%2 == 0){
                boardState[i][j].checker = '1';
            }
        }
        else if (i%2 == 0){
            if (j%2 !== 0){
                boardState[i][j].checker = '1';
            }
        }
    }
}
// Set player statically temporarily *** DELETE THIS ***
player = 1;

// Cached DOM Elements
let player1CheckersEl = document.getElementsByClassName('player1-checker');

let player2CheckersEl = document.getElementsByClassName('player2-checker');

// let boardEl = document.getElementsByTagName('td');

// Event Listeners

for(i of player1CheckersEl){
    i.addEventListener('click', selectCheckerHandler);
}    

for(i of player2CheckersEl){
    i.addEventListener('click', selectCheckerHandler);
}    
    

function showMoves(checkerTile, player){

    let pos = parseInt(checkerTile.id);
    if (player == 1){
        let moveLeft = pos-11;
        let moveRight = pos-9;
        let moveLeftEl = document.getElementById(`${moveLeft}`);
        let moveRightEl = document.getElementById(`${moveRight}`);
        if(moveLeftEl){
            moveLeftEl.classList.add('available-moves');
        }
        if(moveRightEl){
            moveRightEl.classList.add('available-moves');
        }
        return [moveLeftEl,moveRightEl];
    }
    else if(player ==2){
        let moveLeft = pos+11;
        let moveRight = pos+9;
        let moveLeftEl = document.getElementById(`${moveLeft}`);
        let moveRightEl = document.getElementById(`${moveRight}`);
        if(moveLeftEl){
            moveLeftEl.classList.add('available-moves');
        }
        if(moveRightEl){
            moveRightEl.classList.add('available-moves');
        }
        return [moveLeftEl,moveRightEl]; 
    }
    
}

// Initialize the game board and place checkers in starting positions
function init(){
    
}

function play(){
    
}

// Render board and checkers
function render(){
    //Send boardState to renderBoard
    //use renderCheckers(player) in RenderBoard

}

function playerTurn(player){

    //selectPiece

    //selectMove

    //player = nextPlayer
    
}

function selectPiece(){
 //showMoves
}

function selectCheckerHandler(e){
        let pieceTile = e.target.parentElement;
        let pos=parseInt(pieceTile.id);
        
        let i = Math.trunc(pos/10);
        let j = pos%10;
        prevPos.push({i:i,j:j});
        // console.log(`Previous position is ${prevPos[0]}, ${prevPos[1]}`);
        let boardTile = boardState[i][j];
        if(player == 1 && boardTile.checker == 1){
        // If it's player 1 turn and a player 1 piece is selected
        // available moves are i - 1, j +/- 1
        let movesAvailable = showMoves(pieceTile,player); //returns the tiles available to move to
        for(m of movesAvailable){
            if (m)m.addEventListener('click',selectMoveHandler);
        }
        



    }
    else if(player == 2 && boardTile.checker == 2){
        // If it's player 2 turn and a player 2 piece is selected
        // available moves are i + 1, j+/- 1
        let movesAvailable = showMoves(pieceTile,player); //returns the tiles available to move to
        for(m of movesAvailable){
            if(m)m.addEventListener('click',selectMoveHandler);
        }

    }
    else{
        //alert('not your turn');
    }

        
}

function selectMoveHandler(e){
    
   
    
    //console.log(`Previous position is: ${prevPos[prevPos.length-1].i},${prevPos[prevPos.length-1].j}`);
    let moveTile = e.target;
    let prevTileEl = document.getElementById(`${prevPos[prevPos.length-1].i}${prevPos[prevPos.length-1].j}`);
    let moveTileEl = document.getElementById(moveTile.id);
    // Take the checker piece element from the previous tile to the chosen tile
    moveTileEl.innerHTML = prevTileEl.innerHTML;
    prevTileEl.innerHTML = "";

    let pos=parseInt(moveTile.id);
    
    // console.log(`Tile ID ${pos}`);
    
    let i = Math.trunc(pos/10);
    let j = pos%10;
    movePos = {i:i,j:j};
    // console.log(`movePos i is ${movePos.i}, movePos j is ${movePos.j}`)
    // console.log(`${boardState[i][j].checker}`);
    boardState[i][j].checker = player;
    
    
    return;
}


