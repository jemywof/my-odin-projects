//this script plays a game of tic-tac-toe between two human players
//The main goal of the scripting exercise is to use as little global
//code as possible by utilizing modules/factories.

//The code is designed with expandability in mind.
//It will later become the foundation for a game-project called 'Pente'.


//Create a GameBoard module
//This:
//hears from GameFlow module, and Player units
//speaks to the GameFlow module
//acts as main UI
const GameBoard = ( () => {
  const GRID_SIZE = 3;
  const WINNING_LENGTH = 3;
  let spacesFilled = 0;

  //displayBoard: displays the play area grid to a specified length
  const displayBoard = function() {
    let board = document.getElementById('gameBoard');
    for (let x = 0; x < GRID_SIZE; x++) {
      for (let y = 0; y < GRID_SIZE; y++) {
        let div = document.createElement('div');
        div.classList.add('grid-square');
        div.setAttribute('id', `${x} ${y}`);
        board.appendChild(div);
      }
    }
  }

  //resetBoard: resets the page for a new game
  const resetBoard = function() {
    location.reload();
  }

  //makeMove: place symbol onto  array, update HTML, end turn
  //the function's -this- is bound through a PlayerFactory function
  const makeMove = function(square) {
    square.textContent = this;
    let id = square.getAttribute('id');
    let idArray = id.split(" ");
    let x = Number(idArray[0]);
    let y = Number(idArray[1]);
    if (isWon(x, y)) {
      sayVictory(GameFlow.activePlayer);
    } else {
      spacesFilled++;
      if (spacesFilled >= GRID_SIZE * GRID_SIZE) sayVictory(null);
      GameFlow.changeTurn();
    }
  }
  const failMove = function(square) {
    console.log(`Unable to place ${square} there!`);
  }

  //findOccupant: return a space's occupying symbol
  const findOccupant = function(x, y) {
    let gridSquare = document.getElementById(`${x} ${y}`);
    try {
      if (!gridSquare.textContent.length) {
        return false;
      }
    } catch {
      return false;
    }
    let text = gridSquare.textContent;
    if (text != GameFlow.activePlayer.symbol) {
      return false;
    }
    return true;
  }
  
  //isWon: checks to see if a winning score has been found
  const isWon = function(x, y) {
    //counts the longest length of three directions
    let points = 0;
    let tempPoints = 0;
    const findHighest = function() {
      if (tempPoints > points) {
        points = tempPoints;
      }
    }
    //horizontal check
    tempPoints = rowCheck(x, y, 1, 0) 
    findHighest();
    //verical check
    tempPoints = rowCheck(x, y, 0, 1) 
    findHighest();
    //slope +1 diagonal check
    tempPoints = rowCheck(x, y, 1, 1) 
    findHighest();
    //slope -1 diagonal check
    tempPoints = rowCheck(x, y, -1, 1) 
    findHighest();
    if (points >= WINNING_LENGTH) {
      return true;
    }
  }

  //rowCheck
  //it returns the longest possible length,
  //measured from the last-placed piece,
  //where directions are measured by diffX / diffY
  const rowCheck = function(x, y, diffX, diffY) {
    let points = 0;
    let tempX = x;
    let tempY = y;
    for (let d = 0; d < WINNING_LENGTH; d++) {
      if (!findOccupant(tempX, tempY)) {
        break;
      }
      tempX = tempX + diffX;
      tempY = tempY + diffY;
      points++;
    }
    tempX = x;
    tempY = y;
    diffX = diffX * -1;
    diffY = diffY * -1;
    points--;
    for (let d = 0; d < WINNING_LENGTH; d++) {
      if (!findOccupant(tempX, tempY)) {
        break;
      }
      tempX = tempX + diffX;
      tempY = tempY + diffY;
      points++;
    }
    return points;
  }
  //sayVictory: displays victory screen, asks GameFlow to end
  const sayVictory = function(winner) {
    console.log('victory!');
    GameFlow.endGame();
  }

  //user interaction listeners!:
    //mouseover will change css after querying findOccupied
    //click will change css to either:
      //makeMove if legal
      //failMove if illegal
  const addListeners = function() {
    let squares = [...document.querySelectorAll('div#gameBoard > div')];
    squares.forEach((square) => {
      square.addEventListener('mouseover', function() {
        if (square.textContent.length) {
          square.classList.toggle('occupied');
        } else {
          square.classList.toggle('unoccupied');
        }
      });
      square.addEventListener('mouseleave', function() {
        if (square.textContent.length) {
          square.classList.toggle('occupied');
        } else {
          square.classList.toggle('unoccupied');
        }
      });
      square.addEventListener('click', function() {
        if (square.textContent.length) {
          failMove(square);
        } else {
          GameFlow.activePlayer.makeMove(square);
        }
      });
    });
  }

  return {displayBoard,
          resetBoard,
          makeMove, 
          findOccupant,
          addListeners
          };
}) ();

  


//Create a GameFlow module
//This:
  //speaks to the Player units and the GameBoard module
  //hears from the GameBoard module
const GameFlow = ( () => {
  let activePlayer = 0;
  const changeTurn = function() {
    if (GameFlow.activePlayer == playerOne) {
      GameFlow.activePlayer = playerTwo;
    } else {
      GameFlow.activePlayer = playerOne;
    }
  }
  //startGame: loads gameboard and assigns first turn
  const startGame = function() {
    playerOne = PlayerFactory('Jeff', 'X');
    playerTwo = PlayerFactory('Billy', 'O');
    GameBoard.displayBoard();
    GameBoard.addListeners();
    GameFlow.changeTurn();
  }
  //endGame: 
  const endGame = function() {
    let board = document.getElementById('gameBoard');
    while (board.firstChild) {
      board.removeChild(board.firstChild)
    }
    startGame();
  }
  return {changeTurn,
          startGame,
          endGame,
          activePlayer}
})();


//Create a Player factory
//These:
//speak to the GameBoard units
//hear from the GameFlow module
const PlayerFactory = (name, symbol) => {
  let score = 0;
  const makeMove = GameBoard.makeMove.bind(symbol);
  return {name, symbol, score, makeMove};
}




//begins the script by loading GameBoard, starting GameFlow,
  //and listening for Player actions
document.addEventListener("DOMContentLoaded", function() {
  GameFlow.startGame();
});

