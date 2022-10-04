"use strict";

// Create factory function for players, will return name and game symbol
const Player = (name, symbol) => {
    const sayName = () => console.log("My name is", name, "and my symbol is", symbol);
    const getSymbol = () => symbol;
    return { getSymbol, sayName, name };


}

// Modules 

// Game controller module that will control the flow of the game
const gameController = (() => {

    // Create players and variables to be used in module
    const player2 = Player("Player 2", "O");
    const player1 = Player("Justin", "X");
    let playersTurn = true;

    // Will decide which players turn it is and return that symbol
    const getPlayerPick = () => {

        if (playersTurn) {

            playersTurn = false;
            return player1.getSymbol();

        } else {

            playersTurn = true;
            return player2.getSymbol();

        }
    }

    // Will calculate if there is a winner and return null otherwise
    const decideWinner = () => {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (gameBoard.gameboard[a] && gameBoard.gameboard[a] === gameBoard.gameboard[b]
                && gameBoard.gameboard[b] === gameBoard.gameboard[c]) {
                return gameBoard.gameboard[a];
            }
        }

        return null;
    }

    // Will calculate a tie game if all game squares are filled and no winner has been calculated
    const decideTie = () => {
        if ((!decideWinner()) && (gameBoard.gameboard.every(element => element != ""))) {
            console.log("Tie Game");
        }
    }



    return { getPlayerPick, decideWinner, player1, decideTie };


})()

// Module for gameboard
const gameBoard = (() => {

    // create empty array to be used as game grid
    let gameboard = ["", "", "", "", "", "", "", "", ""];

    // Will add an x or o at specified index to gameboard
    const addSymbolToSquare = (index, symbol) => {
        if (gameboard[index]) {
            return;
        }
        console.log(gameboard);
        return gameboard[index] = symbol;

    }

    // Will return the symbol at the specified index in gameboard
    const getSymbolAtindex = (index) => {
        console.log(index);
        return gameboard[index];
    }

    // Reset the gameboard 
    const reset = () => {
        for (let i = 0; i < gameboard.length; i++) {
            gameboard[i] = "";
        }
    }

    return { gameboard, reset, addSymbolToSquare, getSymbolAtindex }

})()

// Module to control the user interactivity
const displayController = (() => {

    // Create variables to be used in module
    const gridSquare = document.querySelectorAll(".square");
    const resetBttn = document.querySelector(".reset");

    // Function that will allow user to pick a square in gameboard and play game
    const addUserPickToBoard = () => {

        gridSquare.forEach(square => {
            square.addEventListener("click", () => {

                if (square.textContent != "" || endGameNoWinner()) return;

                gameBoard.addSymbolToSquare(square.dataset.index, gameController.getPlayerPick());
                square.textContent = gameBoard.getSymbolAtindex(square.dataset.index);
                endGameNoWinnner();



            })
        })

    }

    // Will return true if a winner or tie has been found and end game
    const endGameNoWinnner = () => {

        if (gameController.decideWinner()) {
            console.log(`${gameController.decideWinner()} is the mothafreakin man!`);
            return true;
        };

        if (gameController.decideTie()) {
            return true;

        }
        return false;
    }

    // Will reset the gameboard and gridSquares 
    const reset = () => {
        gameBoard.reset();
        console.log(gameBoard.gameboard);
        gridSquare.forEach(square => {
            square.textContent = "";
        })

    }

    // Event Listeners
    resetBttn.addEventListener("click", reset);

    return { addUserPickToBoard };

})()


displayController.addUserPickToBoard();







