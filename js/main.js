//Variable Declarations
let boardState = [[{},{},{},{},{},{},{},{}], // 8 x 8 array of board tiles (y,x) origin top left of board
[{},{},{},{},{},{},{},{}],
[{},{},{},{},{},{},{},{}],
[{},{},{},{},{},{},{},{}],
[{},{},{},{},{},{},{},{}],
[{},{},{},{},{},{},{},{}],
[{},{},{},{},{},{},{},{}],
[{},{},{},{},{},{},{},{}]]; 

let currentPos;
let movePos;

let movesAvailable = [];

let player1PieceHTML = '<div class="player1-checker"></div>';
let player2PieceHTML = '<div class="player2-checker"></div>';

let playerTurn;

// Caching HTML Elements
let boardEls = document.getElementsByTagName('td');

let startEl = document.querySelector('.start');

let playerEls = document.getElementsByClassName('player');

let alertEl = document.querySelector('.alert');

// Event Listeners
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
    unrenderMoves(movesAvailable);
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
        if (m && m.innerHTML == "")m.classList.add('available-moves');
        if(m.move)m.move.classList.add('available-moves');
    }
}

function unrenderMoves(movesAvailable){
    for (m of movesAvailable){
        if(m.move)m.move.classList.remove('available-moves');
        else{m.classList.remove('available-moves');}
    } 
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

function select(e){
    let pieceTile;
    // Selecting a piece
    if (e.target.tagName == 'DIV'){
        pieceTile = e.target.parentElement;
        let pos=parseInt(pieceTile.id);
        currentPos = parsePos(pos);
        let boardTile = boardState[currentPos.i][currentPos.j];
        if(playerTurn == 1 && boardTile.checker == 1){
            movesAvailable = getMoves(pieceTile,playerTurn); //returns the tiles available to move to
            renderMoves(movesAvailable);
        }
        else if(playerTurn == 2 && boardTile.checker == 2){            
            movesAvailable = getMoves(pieceTile,playerTurn); //returns the tiles available to move to
            renderMoves(movesAvailable);
        }
        else{
            alertEl.textContent = 'not your turn';
        }
    }
    // Selecting a move
    else if(e.target.tagName == 'TD'){
        selectMove(e,movesAvailable);
    }   
}

function getMoves(selectedPieceTile, playerTurn){
    let movesList = [];
    let captureList = [];
    let moveLeftEl;
    let moveRightEl;
    let leftRight = getLeftRight(selectedPieceTile, playerTurn);
    let boardLeft = leftRight.left
    let boardRight = leftRight.right
            
        if(boardLeft){
            moveLeftEl = document.getElementById(`${boardLeft.position}`);
            if(boardLeft.checker == 0){
                movesList.push(moveLeftEl);
            }
            else if(boardLeft.checker !== playerTurn){
                movesList = movesList.concat(getCaptures(selectedPieceTile,playerTurn,captureList));
            }
        }
        if(boardRight){
            moveRightEl = document.getElementById(`${boardRight.position}`);
            if(boardRight.checker == 0){
                movesList.push(moveRightEl);
            }
            else if(boardRight.checker !== playerTurn){                
                movesList = movesList.concat(getCaptures(selectedPieceTile,playerTurn,captureList));
            } 
        }
    return movesList;
}

function getLeftRight(selectedPieceTile, playerTurn){
    let pos = parseInt(selectedPieceTile.id);
    let left,right;
    if (playerTurn == 1){
        let moveLeft = pos-11;
        let moveRight = pos-9;
        let leftPos = parsePos(moveLeft);
        let rightPos = parsePos(moveRight);
        left = boardState[leftPos.i][leftPos.j];
        right = boardState[rightPos.i][rightPos.j];
    }
    else if(playerTurn == 2){
        let moveLeft = pos+11;
        let moveRight = pos+9;
        let leftPos = parsePos(moveLeft);
        let rightPos = parsePos(moveRight);
        left = boardState[leftPos.i][leftPos.j];
        right = boardState[rightPos.i][rightPos.j];
    }
    return {left:left,right:right};
}

// Capture directions are described as the compass directions NE (up, right), SE(down,right), SW(down, left), and NW (up, left)
function getCaptures(pieceTile,player,captureList){
    if (parsePos(pieceTile.id).i !=0 && parsePos(pieceTile.id !=7)){
        let tileToCapture;
        let leftCapture;
        let rightCapture;
        let pieceState = getLeftRight(pieceTile,player);
        //keep adding moves until... left and right paths are blocked

        if(pieceState.left && pieceState.left.checker != playerTurn && pieceState.left.checker !=0){      
            tileToCapture = document.getElementById(pieceState.left.position);
            leftCapture = getLeftRight(tileToCapture,playerTurn);
            if(leftCapture.left && leftCapture.left.checker == 0){ //check left path to see if there is a checker
                moveTileEl = document.getElementById(leftCapture.left.position);
                captureList.push({move:moveTileEl,piece:pieceState.left});
                getCaptures(moveTileEl,player,captureList);
            }
        }

        if(pieceState.right && pieceState.right.checker != playerTurn && pieceState.right.checker !=0){        
            tileToCapture = document.getElementById(pieceState.right.position);
            rightCapture = getLeftRight(tileToCapture,playerTurn);
            if(rightCapture.right && rightCapture.right.checker == 0){
                moveTileEl = document.getElementById(rightCapture.right.position);
                captureList.push(moveTileEl);
                captureList.push({move:moveTileEl,piece:pieceState.right});
                getCaptures(moveTileEl,player,captureList)
            }
        }
    }    
            return captureList;
}

function selectMove(e,movesAvailable){

    let moveTile = e.target;

    if (movesAvailable.some(function(m){return m['move'] == moveTile})|| movesAvailable.includes(moveTile)){
        let pos=parseInt(moveTile.id);
        movePos = parsePos(pos);  
        // Take the checker piece element from the previous tile to the chosen tile
        
        boardState[movePos.i][movePos.j].checker = playerTurn;
        boardState[currentPos.i][currentPos.j].checker = 0;
        
        for(m of movesAvailable){
            if(m.piece){
                m.piece.checker = 0;
            }
        }

        unrenderMoves(movesAvailable);    
        renderBoard(boardState);
        switchPlayer();

    }
    else{
        alertEl.textContent = 'invalid move!';
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

function parsePos(pos){
    let i = Math.trunc(pos/10);
    let j = pos%10;
    return {i:i,j:j};
}
