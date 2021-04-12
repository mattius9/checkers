//Variable Declarations
let boardState = [[{},{},{},{},{},{},{},{}], // 8 x 8 array of board tiles (y,x) origin top left of board
[{},{},{},{},{},{},{},{}],
[{},{},{},{},{},{},{},{}],
[{},{},{},{},{},{},{},{}],
[{},{},{},{},{},{},{},{}],
[{},{},{},{},{},{},{},{}],
[{},{},{},{},{},{},{},{}],
[{},{},{},{},{},{},{},{}]]; 

//Set unplayable tiles
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


// Event Listeners

for(i of player1CheckersEl){
    i.addEventListener('click', function(){
        console.log('event listener activated');// Add functionality here
    })
}

for(i of player2CheckersEl){
    i.addEventListener('click', function(){
        console.log('event listener activated');// Add functionality here
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

}

