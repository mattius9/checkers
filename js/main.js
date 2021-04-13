//Variable Declarations
let boardState = [[{},{},{},{},{},{},{},{}], // 8 x 8 array of board tiles (y,x) origin top left of board
[{},{},{},{},{},{},{},{}],
[{},{},{},{},{},{},{},{}],
[{},{},{},{},{},{},{},{}],
[{},{},{},{},{},{},{},{}],
[{},{},{},{},{},{},{},{}],
[{},{},{},{},{},{},{},{}],
[{},{},{},{},{},{},{},{}]]; 

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

player = 1;

//Board printer:
// for(let i = 0; i < boardState.length; i++){
//     for(let j = 0; j < boardState[i].length; j++){
//         if(boardState[i][j].checker){
//             console.log(`Board at ${i} and ${j} contains a checker for player ${boardState[i][j].checker}`)
//         }
//     }
// }

// Cached DOM Elements
let player1CheckersEl = document.getElementsByClassName('player1-checker');

let player2CheckersEl = document.getElementsByClassName('player2-checker');

let boardEl = document.getElementsByTagName('td');

let player1 = [{}];

let player2 = [{}];
// Event Listeners

for(i of boardEl){
    i.addEventListener('click', function(e){
        let pos=e.target.parentElement.id;
        let boardTile = boardState.find(function(o){
            return o.position == pos;
        });
        if(player == 1 && boardTile.checker == 1){
            // If it's player 1 turn and a player 1 piece is selected
            
        }
        else if(player == 2 && boardTile.checker == 2){
            // If it's player 2 turn and a player 2 piece is selected

        }
        else{
            alert('not your turn');
        }
    })
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

showMoves(e){

}

