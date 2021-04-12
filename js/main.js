//Variable Declarations
let board = [];
let player1Checkers = []; 
let player2Checkers = [];

// Cached DOM Elements
player1Checkers = document.getElementsByClassName('player1-checker');
console.log(player1Checkers);

player2Checkers = document.getElementsByClassName('player2-checker');
console.log(player2Checkers);

board = document.getElementsByClassName('board');
console.log(board);

// let playableSquares = document.querySelectorAll('tr:nth-of-type(2n) > td:nth-of-type(2n+1)','tr:nth-of-type(2n+1) > td:nth-of-type(2n)');
// console.log(playableSquares);

// Event Listeners

// for (i of player1Checkers){
//     i.addEventListener('click', function(){
//         console.log(this);
//         console.log('event listener added');
//     })
// }

document.getElementsByClassName('player1-checker')[0].addEventListener('click', function(){
    console.log(this);
    console.log('event listener added');
});


// Initialize the game board and place checkers in starting positions
function init(){
    
}

function render(){

}


// function showPosition(elem){
//     console.log(`function is running `);
//     elem.textContent = `${elem.offsetTop},${elem.offsetWidth}`;
//     console.log(`${elem.offsetTop},${elem.offsetWidth}`)
//     console.log("function ran");
// }

// const board = document.querySelectorAll('td');

// let mainEl = document.querySelector('main');
// console.log(mainEl.textContent);

// board.forEach(showPosition);

// console.log(board);

// let checkerEl = document.querySelector('div');

// let cellEl = document.querySelector('#first-cell');

// cellEl.appendChild(checkerEl);