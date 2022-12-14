"use strict";


// Create factory function for players, will return name and game symbol
const Player = (name, symbol) => {
    const sayName = () => console.log("My name is", name, "and my symbol is", symbol);
    const getSymbol = () => symbol;
    return { getSymbol, sayName, name };


};

// Modules 

// Game controller module that will control the flow of the game
const gameController = (() => {

    // Create players and variables to be used in module
    const player1 = Player(prompt("Type your name:"), "X");

    // If player inputs nothing give default name
    if (player1.name == null || player1.name == "") {
        player1.name = "Player";
    }
    const player2 = Player("CPU", "O");


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
            return true;
        }
    }


    // Create ai logic, right now just make ai move at random
    const aiPlayer = () => {
        let randNum = Math.floor(Math.random() * 9);
        if (!(decideWinner())) {
            if (gameBoard.gameboard[randNum] == "") {
                return gameBoard.addSymbolToSquare(randNum, player2.getSymbol());
            } else if (!(gameBoard.gameboard.every(element => element != ""))) {
                return aiPlayer();
            }
        } return;

    }



    return { decideWinner, player1, player2, decideTie, aiPlayer };


})();

// Module for gameboard
const gameBoard = (() => {

    // create empty array to be used as game grid
    let gameboard = ["", "", "", "", "", "", "", "", ""];

    // Will add an x or o at specified index to gameboard
    const addSymbolToSquare = (index, symbol) => {
        if (gameboard[index]) {
            return;
        }

        return gameboard[index] = symbol;

    }

    // Will return the symbol at the specified index in gameboard
    const getSymbolAtindex = (index) => {

        return gameboard[index];
    }

    // Reset the gameboard 
    const reset = () => {
        for (let i = 0; i < gameboard.length; i++) {
            gameboard[i] = "";
        }
    }

    return { gameboard, reset, addSymbolToSquare, getSymbolAtindex }

})();

// Module to control the user interactivity
const displayController = (() => {

    // Create variables to be used in module
    const gridSquare = document.querySelectorAll(".square");
    const resetBttn = document.querySelector(".reset");
    const message = document.querySelector("#message");
    let playersTurn = true;

    // Function that will allow user to pick a square in gameboard and play game
    const addUserPickToBoard = () => {

        gridSquare.forEach(square => {
            square.addEventListener("click", () => {
                if (square.textContent != "" || endGame()) return;

                if (playersTurn) {
                    gameBoard.addSymbolToSquare(square.dataset.index, gameController.player1.getSymbol());
                    playersTurn = false;
                    endGame();
                    updateDisplay();
                }

                if (playersTurn == false) {
                    resetBttn.disabled = true;
                    setTimeout(function () {
                        gameController.aiPlayer();
                        playersTurn = true;
                        endGame();
                        updateDisplay();
                        resetBttn.disabled = false;
                    }, 500)
                }

            })

        })

    }

    // Keep track of game flow and display to user
    const updateMessageDisplay = () => {
        if (!(endGame())) {
            if (playersTurn) {
                message.textContent = `${gameController.player1.name}'s turn`
            } else {
                message.textContent = `${gameController.player2.name}'s turn`
            }
        }
    }

    // Update symbols on board and game messaging
    const updateDisplay = () => {
        gridSquare.forEach(square => {
            square.textContent = gameBoard.getSymbolAtindex(square.dataset.index);
        })
        updateMessageDisplay();
    }

    // Will return true if a winner or tie has been found and end game
    const endGame = () => {

        if (gameController.decideWinner()) {
            if (gameController.decideWinner() == "X") {
                message.textContent = `${gameController.player1.name} Wins!`
            } else {
                message.textContent = `${gameController.player2.name} Wins!`
            }
            console.log(`${gameController.decideWinner()} is the mothafreakin man!`);
            return true;
        };

        if (gameController.decideTie()) {
            message.textContent = "Tie Game!"
            return true;
        }

        return false;
    }

    // Will reset the gameboard and gridSquares 
    resetBttn.addEventListener("click", () => {
        gameBoard.reset();
        console.log(gameBoard.gameboard);
        gridSquare.forEach(square => {
            square.textContent = "";
        })
        message.textContent = `${gameController.player1.name}'s turn`

    })

    updateMessageDisplay();
    addUserPickToBoard();

    return { addUserPickToBoard };

})();










