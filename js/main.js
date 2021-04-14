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

let pieceSelected = false;

let player1PieceHTML = '<div class="player1-checker"></div>';
let player2PieceHTML = '<div class="player2-checker"></div>';

//boardState objects should appear like this:

// boardObject = {
//     isPlayable : (true/false)
//     checker : 0, 1, or 2 (3 or 4 for king)
//     position : 01 - 76
//     
// }


// Set player statically temporarily *** DELETE THIS ***
player = 1;

// Cached DOM Elements
let player1CheckersEl = document.getElementsByClassName('player1-checker');

let player2CheckersEl = document.getElementsByClassName('player2-checker');

 let boardEl = document.getElementsByTagName('td');


// Initialize the game board and place checkers in starting positions
function init(){
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

    // Event Listeners

    for(i of boardEl){
        i.addEventListener('click', selectPiece);
    }  
}

function play(){
    
}

// Render board and checkers
function renderBoard(b){
    for(let i = 0; i < b.length; i++){
        for(let j = 0; j < b[i].length; j++){
            if (i%2 == 0){
                if (j%2 !== 0){
                    renderTile(b[i][j]);
                    
                }                
            }
            else if (i%2 != 0){
                if (j%2 == 0){
                    renderTile(b[i][j]);
                }
            }
        }
    }
    console.log('board rendering....');
}

function renderTile(tile){
    let tileEl = document.getElementById(tile.position);
    if (tile.checker == 1){
        tileEl.innerHTML = player1PieceHTML;
    }
    else if (tile.checker == 2){
        tileEl.innerHTML = player2PieceHTML;
    }
    else if(tile.checker == 0){
        tileEl.innerHTML = '';
    }
}

function selectPiece(e){
        pieceSelected = true;
        let pieceTile;
        if (e.target.tagName == 'DIV'){
            pieceTile = e.target.parentElement;
        }
        // else if(e.target.tagName == 'TD' && e.target.firstChild.tagName == 'DIV'){
        //     pieceTile = e.target;
        // }
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
        console.log(``)
        for(m of movesAvailable){
            if (m)m.addEventListener('click',function(e){
                selectMove(e,movesAvailable);},{once:true});
                
            //console.log(`${m.innerHTML}`);
        }
        



    }
    else if(player == 2 && boardTile.checker == 2){
        // If it's player 2 turn and a player 2 piece is selected
        // available moves are i + 1, j+/- 1
        let movesAvailable = showMoves(pieceTile,player); //returns the tiles available to move to
        for(m of movesAvailable){
            if(m)m.addEventListener('click',selectMove,{once:true});
            console.log(`${m.innerHTML}`);
        }

    }
    else{
        //alert('not your turn');
    }

        
}

function showMoves(selectedPieceTile, player){

    let pos = parseInt(selectedPieceTile.id);
    if (player == 1){
        let moveLeft = pos-11;
        let moveRight = pos-9;
        let moveLeftEl = document.getElementById(`${moveLeft}`);
        let moveRightEl = document.getElementById(`${moveRight}`);
        if(moveLeftEl && moveLeftEl.innerHTML == ""){
            moveLeftEl.classList.add('available-moves');
        }
        if(moveRightEl && moveRightEl.innerHTML == ""){
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

function selectMove(e,movesAvailable){
        
    //console.log(`Previous position is: ${prevPos[prevPos.length-1].i},${prevPos[prevPos.length-1].j}`);
    let moveTile = e.target;
    
 
    let pos=parseInt(moveTile.id);
    
    // console.log(`Tile ID ${pos}`);
    
    let i = Math.trunc(pos/10);
    let j = pos%10;
    movePos = {i:i,j:j};
    // console.log(`movePos i is ${movePos.i}, movePos j is ${movePos.j}`)
    // console.log(`${boardState[i][j].checker}`);
    
    // Take the checker piece element from the previous tile to the chosen tile
    boardState[i][j].checker = player;
    boardState[prevPos[prevPos.length-1].i][prevPos[prevPos.length-1].j].checker = 0;
    
    for(m of movesAvailable){
        if (m)m.classList.remove('available-moves');
    }
    for(m of movesAvailable){
        if (m)m.removeEventListener('click',function(){
            selectMove(e,movesAvailable);},{once:true});        
    }
    renderBoard(boardState);
    
}

init();