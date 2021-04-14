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

let movesAvailable = [];

let player1PieceHTML = '<div class="player1-checker"></div>';
let player2PieceHTML = '<div class="player2-checker"></div>';

//boardState objects should appear like this:

// boardObject = {
//     isPlayable : (true/false)
//     checker : 0, 1, or 2 (3 or 4 for king)
//     position : 01 - 76
//     
// }

let playerTurn;

let boardEls = document.getElementsByTagName('td');

let startEl = document.querySelector('.start');

let playerEls = document.getElementsByClassName('player');

startEl.addEventListener('click',startGame);

for(i of boardEls){
    i.addEventListener('click', select);
}  


// Initialize the game board and place checkers in starting positions
function init(){

    playerTurn = 1;

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
}

function startGame(){
    startEl.textContent = "RESET";
    init();
    renderBoard(boardState);

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

function renderMoves(movesAvailable){
    for(m of movesAvailable){
        if (m)m.classList.remove('available-moves');
    }

}

function select(e){
    let pieceTile;
    // Selecting a piece
    if (e.target.tagName == 'DIV'){
        pieceTile = e.target.parentElement;
        let pos=parseInt(pieceTile.id);
        let i = Math.trunc(pos/10);
        let j = pos%10;
        prevPos.push({i:i,j:j});
        let boardTile = boardState[i][j];
        if(playerTurn == 1 && boardTile.checker == 1){
    
            movesAvailable = showMoves(pieceTile,playerTurn); //returns the tiles available to move to
        
        }
        else if(playerTurn == 2 && boardTile.checker == 2){
            
            movesAvailable = showMoves(pieceTile,playerTurn); //returns the tiles available to move to
        }
        else{
            alert('not your turn');
        }
    }
    // Selecting a move
    else if(e.target.tagName == 'TD'){

        selectMove(e,movesAvailable);
    }
        
}

function showMoves(selectedPieceTile, playerTurn){

    let pos = parseInt(selectedPieceTile.id);
    if (playerTurn == 1){
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
    else if(playerTurn == 2){
        let moveLeft = pos+11;
        let moveRight = pos+9;
        
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
    
}

function selectMove(e,movesAvailable){    
    let moveTile = e.target;
    if (movesAvailable.includes(moveTile)){
        let pos=parseInt(moveTile.id);
    
        let i = Math.trunc(pos/10);
        let j = pos%10;
        movePos = {i:i,j:j};
        
        // Take the checker piece element from the previous tile to the chosen tile
        
        boardState[i][j].checker = playerTurn;
        boardState[prevPos[prevPos.length-1].i][prevPos[prevPos.length-1].j].checker = 0;
        
        renderMoves(movesAvailable);    
        renderBoard(boardState);
        switchPlayer();   

    }
    else{
        alert('invalid move!');
    }
   
}

function switchPlayer(){
    if (playerTurn == 1){
        playerTurn =2;
    }
    else{
        playerTurn = 1;
    }
    renderTurn(playerTurn);
}

function renderTurn(player){
    for (p of playerEls){
        if (p.id == player){
            p.classList.add('current-player');
        }
        else{
            p.classList.remove('current-player');
        }
    }
}
