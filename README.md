# Checkers

### A Simple Game of Checkers by Matthew Krasucki

A browser-based 2 player turn based game, where players move checker pieces diagonally across a checker-tiled board. Players may either move to free adjacent diagonal spaces in the direction across from themselves, or capture the opposing players pieces by "jumping" over them.

>Players may use strategy to *protect* their own pieces or lure the opponent into traps to **capture** multiple pieces in one turn. More information on the game of checkers can be found on [Wikipedia](https://en.wikipedia.org/wiki/Draughts).
___

### [Let's Play!](https://mattius9.github.io/checkers/)

## Instructions:

1. Press the start button to place all checkers on the board
2. Player 1 has the first turn. Select a checker from player 1's side to display the available diagonally adjacent tiles to move to
3. Select the tile the player wishes to move your selected checker piece to, and that's the end of your turn.
4. Player 2 follows steps 2 and 3
5. When there is an opposing player piece in the tile the player wishes to move to, and an empty space beyond, the player may move to that empty tile while capturing the opponent's piece. This removes that piece from the board
6. Play continues with players alternating turns until one player has no checker pieces remaining on the board. The opposing player is then declared the winner
7. At any point, the game can be reset to it's starting position by pressing the Reset button. All checkers will returned to the board and moved to their inital positions
___
## What is powering this game?

* ![JS](/img/javascript.png)JavaScript
* ![H5](/img/html.png)HTML
* ![CSS](/img/css.png)CSS
___

## Future Developments

* Working out some bugs to resolve an issue where upon selecting a checker to move that is on the side of the board, it does not have the ability to make a move
* Implementing win/loss logic by tracking number of checker pieces left on the board
* Checker pieces that move to the end of the board become **King** checkers, and may now move or capture in any direction
* Ability to take back a move, provided the opponent has not made a move selection while it is their turn